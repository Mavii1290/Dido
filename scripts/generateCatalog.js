const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// Paths
const dataPath = path.join(__dirname, "../src/data/shop_data.json");
const outputPath = path.join(__dirname, "../public/catalog/Dido_Product_Catalog.pdf");
const logoPath = path.join(__dirname, "../public/assets/imgs/dido/pdf_logo.png");
const publicDir = path.join(__dirname, "../public");

// Load data
const shopData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const doc = new PDFDocument({ margin: 40, size: "A4" });
doc.pipe(fs.createWriteStream(outputPath));

// Constants
const IMAGE_WIDTH = 80;
const CELL_WIDTH = 170;
const CELL_HEIGHT = 200;
const pageWidth = doc.page.width;
const margin = doc.page.margins.left;
const usableWidth = pageWidth - margin * 2;
const COLUMNS = 3;

// Draw logo and contact info
const drawHeader = () => {
    const logoWidth = 80;
    const logoX = (doc.page.width - logoWidth) / 2;
    const logoY = 30;

  try {
    doc.image(logoPath, logoX, logoY, { width: logoWidth });
    doc.moveDown(3); // Adjust as needed
  } catch (e) {
    console.warn("⚠️ Logo image not found:", e.message);
  }
};

// First page header
drawHeader();
doc.fontSize(18).text("Dido Product Catalog", { align: "center" });



shopData.forEach((category) => {
  const validSubcategories = category.subcategories.filter(
    (sub) => sub.products && sub.products.length > 0
  );
  if (validSubcategories.length === 0) return;

  doc.moveDown(0.25);

  doc
    .fontSize(16)
    .fillColor("black")
    .text(category.category, margin, doc.y, {
      width: usableWidth,
      align: "center",
      underline: true,
    });

  doc.moveDown(0.25);

  validSubcategories.forEach((sub) => {
    doc
      .fontSize(14)
      .fillColor("blue")
      .text(sub.name, margin, doc.y + 15, {
        width: usableWidth,
        align: "center",
      });

    doc.moveDown(0.25);

    let col = 0;
    let rowY = doc.y; // Starting Y for the current row of product cells

    sub.products.forEach((product) => {
      const x = margin + col * CELL_WIDTH; // X position for the current cell

      // Calculate Y positions relative to rowY for each element within the cell
      const imageY = rowY + 10; // Small padding from the top of the cell
      const brandY = imageY + IMAGE_WIDTH + 5; // Below image
      const titleY = brandY + 15; // Below brand
      const badgeTextY = titleY + 30; // Below title (adjust for potential multi-line title)
      const quantityY = badgeTextY + 15; // Below badge text
      const productNumY = quantityY + 15; // NEW: Product number now comes after quantity_per_case

      // Ensure enough space for the content by checking remaining cell height
      // This is a safety check; ideally, CELL_HEIGHT should be pre-calculated to fit everything
      const requiredHeight = productNumY - rowY + 15; // Estimate needed height for all content + some padding
      if (requiredHeight > CELL_HEIGHT) {
        console.warn(`Content for product ${product.product_num} might overflow cell height.`);
        // You might need to increase CELL_HEIGHT or reduce font sizes/content
      }

      // Draw image if exists
      try {
        const imgPath = path.join(publicDir, product.img);
        if (fs.existsSync(imgPath)) {
          doc.image(imgPath, x + (CELL_WIDTH - IMAGE_WIDTH) / 2, imageY, {
            width: IMAGE_WIDTH,
          });
        }
      } catch (e) {
        console.warn("⚠️ Image missing:", product.img);
      }

      // Draw brand
      doc
        .fontSize(10)
        .fillColor("black")
        .text(product.brand || "", x, brandY, {
          width: CELL_WIDTH,
          align: "center",
        });

      // Draw title
      const titleOptions = {
        width: CELL_WIDTH * 0.9,
        align: "center",
      };
      const titleX = x + (CELL_WIDTH - CELL_WIDTH * 0.9) / 2;

      doc.fontSize(10).text(product.title || "", titleX, titleY, titleOptions);

      // Draw badge text
      doc
        .fontSize(9)
        .fillColor("gray")
        .text(product.badge_text || "", x, badgeTextY, {
          align: "center",
          width: CELL_WIDTH,
        });

      // Draw quantity per case (now before product number)
      doc.text(product.quantity_per_case || "", x, quantityY, {
        align: "center",
        width: CELL_WIDTH,
      });

      // Draw product number (now after quantity_per_case)
      doc.fontSize(10).fillColor("black").text(product.product_num || "", x, productNumY, {
        width: CELL_WIDTH,
        align: "center",
      });

      col++;
      // Check if we need a new row or new page
      if (col >= COLUMNS) {
        col = 0;
        rowY += CELL_HEIGHT; // Move to the next row by adding CELL_HEIGHT

        // Check for new page BEFORE drawing the next product cell
        // Add a buffer (e.g., 60 for bottom margin)
        if (rowY + CELL_HEIGHT > doc.page.height - 60) {
          doc.addPage();
          drawHeader();
          rowY = doc.y + 20; // Reset rowY for the new page
        }
      }
    });

    // After all products in a subcategory, ensure next category/subcategory starts below the last row of products
    // This is important if the last row is not full, to prevent overlap.
    if (col !== 0) {
      // If the last row was not full, move doc.y to the bottom of that row
      doc.y = rowY + CELL_HEIGHT;
    } else {
      // If the last row was full, doc.y is already at the correct starting point for next content
      doc.y = rowY;
    }
    doc.moveDown(0.5); // Add some space before the next subcategory/category
  });
});

doc.end();
console.log("✅ PDF catalog generated with grid layout and styling.");