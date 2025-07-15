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
  const x = 30;
  try {
    doc.image(logoPath, doc.page.width / 2 - 40, 30, { width: 80 });
  } catch (e) {
    console.warn("⚠️ Logo image not found:", e.message);
  }
};

// First page header
drawHeader();
doc.moveDown(2.5);
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
      .text(sub.name, margin, doc.y, {
        width: usableWidth,
        align: "center",
      });

    doc.moveDown(0.25);

    let col = 0;
    let rowY = doc.y;

    sub.products.forEach((product) => {
      const x = margin + col * CELL_WIDTH;

      // Draw image if exists
      try {
        const imgPath = path.join(publicDir, product.img);
        if (fs.existsSync(imgPath)) {
          doc.image(imgPath, x + (CELL_WIDTH - IMAGE_WIDTH) / 2, rowY, {
            width: IMAGE_WIDTH,
          });
        }
      } catch (e) {
        console.warn("⚠️ Image missing:", product.img);
      }

      const titleWidth = IMAGE_WIDTH * 0.8;
      const titleX = x + (CELL_WIDTH - titleWidth) / 2;
      const imageBottomY = rowY + IMAGE_WIDTH + 5;

      doc
        .fontSize(10)
        .fillColor("black")
        .text(product.product_num || "", x, doc.y, { width: CELL_WIDTH, align: "center" })
        .text(product.brand || "", x, imageBottomY, { width: CELL_WIDTH, align: "center" })
        .text(product.title || "", titleX, doc.y, {
          width: titleWidth,
          align: "center",
        })
        .fontSize(9)
        .fillColor("gray")
        .text(product.badge_text || "", x, doc.y, { align: "center", width: CELL_WIDTH })
        .text(product.quantity_per_case || "", x, doc.y, {
          align: "center",
          width: CELL_WIDTH,
        });

      col++;
      if (col >= COLUMNS) {
        col = 0;
        rowY += CELL_HEIGHT;

        if (rowY + CELL_HEIGHT > doc.page.height - 60) {
          doc.addPage();
          drawHeader();
          rowY = doc.y + 20;
        }
      }
    });

    doc.moveDown(.25);
  });
});

doc.end();
console.log("✅ PDF catalog generated with grid layout and styling.");
