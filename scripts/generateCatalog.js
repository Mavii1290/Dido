const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const sharp = require("sharp");

// Wrap everything in an async function
(async () => {
  // Paths
  const dataPath = path.join(__dirname, "../src/data/shop_data.json");
  const outputPath = path.join(__dirname, "../public/catalog/Dido_Product_Catalog.pdf");
  const logoPath = path.join(__dirname, "../public/assets/imgs/dido/pdf_logo.png");
  const publicDir = path.join(__dirname, "../public");

  // Load data
  const shopData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const doc = new PDFDocument({ margin: 40, size: "A4" });
  doc.pipe(fs.createWriteStream(outputPath));

  // Constants for main product grid
  const IMAGE_WIDTH = 80;
  const CELL_WIDTH = 170;
  const CELL_HEIGHT = 200;
  const pageWidth = doc.page.width;
  const margin = doc.page.margins.left;
  const usableWidth = pageWidth - margin * 2;
  const COLUMNS = 3;
  const MAX_CELLS_PER_PAGE = 9; // 3x3 grid

  let cellsRenderedOnPage = 0;

  // --- Helper: Compress images ---
  async function getOptimizedImageBuffer(imgPath) {
    if (!fs.existsSync(imgPath)) return null;
    return await sharp(imgPath)
      .resize(200) // Resize width
      .jpeg({ quality: 70 }) // Compress
      .toBuffer();
  }

  // --- Draw header with logo ---
  async function drawHeader() {
    const logoWidth = 80;
    const logoX = (doc.page.width - logoWidth) / 2;
    const logoY = 30;

    try {
      const logoBuffer = await getOptimizedImageBuffer(logoPath);
      if (logoBuffer) doc.image(logoBuffer, logoX, logoY, { width: logoWidth });
      doc.moveDown(4);
    } catch (e) {
      console.warn("⚠️ Logo not found:", e.message);
    }
  }

  // --- Add new page ---
  async function addNewPage() {
    doc.addPage();
    await drawHeader();
    cellsRenderedOnPage = 0;
    doc.y = doc.page.margins.top + 50;
  }

  // --- Check and add new page for product ---
  async function checkAndAddNewPageForProduct(rowY) {
    if (cellsRenderedOnPage === MAX_CELLS_PER_PAGE || (rowY + CELL_HEIGHT > doc.page.height - 60 && cellsRenderedOnPage > 0)) {
      await addNewPage();
      return doc.y;
    }
    return rowY;
  }

  // --- Start PDF generation ---
  await drawHeader();
  doc.fontSize(12).text(
    "Thanks for your patience! We're temporarily out of stock on a few items while we await our next shipment from overseas. We appreciate your understanding and are working to restock as quickly as possible.",
    { align: "center" }
  );
  doc.moveDown(0.5);
  cellsRenderedOnPage = 0;

  // --- Main grid ---
  for (const category of shopData) {
    const validSubcategories = category.subcategories.filter(sub => sub.products && sub.products.length > 0);
    if (validSubcategories.length === 0) continue;

    for (const sub of validSubcategories) {
      const headerHeightEstimate = 30;
      const spaceNeededForSubcategoryBlock = headerHeightEstimate + CELL_HEIGHT;

      if (cellsRenderedOnPage === MAX_CELLS_PER_PAGE || doc.y + spaceNeededForSubcategoryBlock > doc.page.height - doc.page.margins.bottom) {
        await addNewPage();
      }

      doc.fontSize(14).fillColor("blue").text(sub.name, margin, doc.y, { width: usableWidth, align: "center" });
      doc.moveDown(0.25);

      let col = 0;
      let rowY = doc.y;

      for (const product of sub.products) {
        rowY = await checkAndAddNewPageForProduct(rowY);

        if (cellsRenderedOnPage === 0 && col !== 0) col = 0;

        const x = margin + col * CELL_WIDTH;
        const cellPadding = 10;
        const contentX = x + cellPadding;
        const contentWidth = CELL_WIDTH - 2 * cellPadding;
        const imageY = rowY + cellPadding;
        let currentTextY = imageY + IMAGE_WIDTH + 5;

        const sizeY = currentTextY; currentTextY += 15;
        const perCaseY = currentTextY; currentTextY += 15;
        const brandY = currentTextY + 5; currentTextY = brandY + 15;
        const titleY = currentTextY; currentTextY += 15;
        const productNumY = rowY + CELL_HEIGHT - cellPadding - 10;

        // Product image
        try {
          const imgPath = path.join(publicDir, product.img);
          const buffer = await getOptimizedImageBuffer(imgPath);
          if (buffer) doc.image(buffer, contentX + (contentWidth - IMAGE_WIDTH)/2, imageY, { width: IMAGE_WIDTH });
        } catch (e) {
          console.warn("⚠️ Image missing:", product.img);
        }

        // Draw text
        doc.fontSize(9).fillColor("gray").text(product.size || "N/A", contentX, sizeY, { width: contentWidth, align: "center" });
        doc.fontSize(9).fillColor("black").text(product.per_case || "N/A", contentX, perCaseY, { width: contentWidth, align: "center" });
        doc.fontSize(10).fillColor("black").text(product.brand || "", contentX, brandY, { width: contentWidth, align: "center" });
        doc.fontSize(10).text(product.product || "", contentX, titleY, { width: contentWidth, align: "center" });
        doc.fontSize(10).fillColor("black").text(product.item_num || "", contentX, productNumY, { width: contentWidth, align: "center" });

        cellsRenderedOnPage++;
        col++;
        if (col >= COLUMNS) { col = 0; rowY += CELL_HEIGHT; }
      }

      doc.y = col !== 0 ? rowY + CELL_HEIGHT : rowY;
      doc.moveDown(0.5);
    }
  }

  // --- Optional summary table (can remove to reduce size further) ---
  const allProducts = [];
  shopData.forEach(cat => cat.subcategories.forEach(sub => sub.products?.forEach(p => allProducts.push(p))));

  if (doc.y > doc.page.margins.top + 50 || cellsRenderedOnPage > 0 || doc.page.content.length === 0) {
    doc.addPage();
    await drawHeader();
  } else {
    await drawHeader();
  }
  doc.y = doc.page.margins.top + 50;

  doc.fontSize(18).text("Product List", { align: "center" });
  const tableHeaders = [
    { label: "QUANTITY", width: 60 },
    { label: "ITEM #", key: "item_num", width: 55 },
    { label: "BRAND", key: "brand", width: 100 },
    { label: "PRODUCT", key: "product", width: 170 },
    { label: "SIZE", key: "size", width: 70 },
    { label: "PER CASE", key: "per_case", width: 70 },
  ];
  const headerHeight = 25;
  const rowHeight = 20;
  let currentY = doc.y;

  const drawSummaryTableHeaders = (startY) => {
    doc.save();
    let columnX = margin;
    doc.fillColor("#F2F2F2").rect(columnX, startY, usableWidth + 15, headerHeight).fill();
    doc.fillColor("black").fontSize(10);
    tableHeaders.forEach(header => {
      doc.text(header.label, columnX, startY + 10, { width: header.width, align: "center" });
      columnX += header.width;
    });
    doc.restore();
  };

  drawSummaryTableHeaders(currentY);
  currentY += headerHeight;

  for (const [index, product] of allProducts.entries()) {
    if (currentY + rowHeight > doc.page.height - doc.page.margins.bottom) {
      doc.addPage();
      await drawHeader();
      doc.y = doc.page.margins.top + 50;
      doc.fontSize(18).text("Product Summary Table (Continued)", { align: "center" });
      currentY = doc.y;
      drawSummaryTableHeaders(currentY);
      currentY += headerHeight;
    }

    let columnX = margin;
    const rowColor = index % 2 === 0 ? "#FFFFFF" : "#F9F9F9";
    doc.rect(columnX, currentY, usableWidth + 15, rowHeight).fill(rowColor).stroke("#DDDDDD");

    for (const header of tableHeaders) {
      let value = product[header.key] || "";
      doc.fontSize(8).fillColor("black").text(String(value), columnX, currentY + 5, { width: header.width, align: "center", ellipsis: true });
      columnX += header.width;
    }
    doc.strokeColor("#DDDDDD").moveTo(margin, currentY + rowHeight).lineTo(margin + usableWidth + 15, currentY + rowHeight).stroke();
    currentY += rowHeight;
  }

  doc.end();
  console.log("✅ PDF catalog generated with compressed images and summary table.");
})();
