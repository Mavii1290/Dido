const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// Paths
const dataPath = path.join(__dirname, "../src/data/shop_data.json");
const outputPath = path.join(__dirname, "../public/catalog/Dido_Product_Catalog.pdf");
const publicAssetsRoot = path.join(__dirname, "../public"); // Root of public for resolving product images

// Load product data
const shopData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Create PDF document
const doc = new PDFDocument({ margin: 40, size: "A4" });
fs.mkdirSync(path.dirname(outputPath), { recursive: true }); // Ensure output dir exists
doc.pipe(fs.createWriteStream(outputPath));

// Title
doc.fontSize(22).text("Dido Product Catalog", { align: "center" });
doc.moveDown();

// For each category
shopData.forEach((category) => {
  doc.fontSize(18).fillColor("black").text(category.category, { underline: true });
  doc.moveDown(0.5);

  category.subcategories.forEach((sub) => {
    if (!sub.products || sub.products.length === 0) return;

    doc.fontSize(14).fillColor("blue").text(`Subcategory: ${sub.name}`);
    doc.moveDown(0.25);

    sub.products.forEach((product) => {
      doc.fontSize(12).fillColor("black");

      const imagePath = path.join(publicAssetsRoot, product.img.replace(/^\//, "")); // remove leading slash
      if (fs.existsSync(imagePath)) {
        try {
          doc.image(imagePath, { fit: [100, 100] }).moveDown(0.25);
        } catch (err) {
          console.warn(`⚠️ Could not render image for product ${product.id}: ${err.message}`);
        }
      } else {
        console.warn(`⚠️ Missing image: ${imagePath}`);
      }

      doc
        .fillColor("black")
        .text(`• ${product.product_num} - ${product.brand} - ${product.title}, ${product.badge_text}`, { continued: true })
        .fillColor("gray")
        .text(` Per case (${product.quantity_per_case || "N/A"})`);

      doc.moveDown(0.5);
    });

    doc.moveDown();
  });

  doc.addPage(); // Start new page for next category
});

doc.end();

console.log("✅ Catalog PDF generated successfully at:", outputPath);
