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
const MAX_CELLS_PER_PAGE = 9; // Maximum cells per page (3 rows * 3 columns)

// Global counter for cells rendered on the current page
let cellsRenderedOnPage = 0;

// Draw logo and contact info
const drawHeader = () => {
    const logoWidth = 80;
    const logoX = (doc.page.width - logoWidth) / 2;
    const logoY = 30;

    try {
        doc.image(logoPath, logoX, logoY, { width: logoWidth });
        doc.moveDown(4); // Adjust as needed
    } catch (e) {
        console.warn("⚠️ Logo image not found:", e.message);
    }
};

// Function to add a new page and reset counters
const addNewPage = () => {
    doc.addPage();
    drawHeader();
    cellsRenderedOnPage = 0; // Reset cells counter for the new page
    doc.y = doc.page.margins.top + 50; // Start content below header, leaving space for the header
};

// Function to check and add a new page specifically for product cells
const checkAndAddNewPageForProduct = (rowY) => {
    // If 9 cells are already rendered (page is full), or the next cell won't fit
    // on the current page's remaining physical space, add a new page.
    if (cellsRenderedOnPage === MAX_CELLS_PER_PAGE || (rowY + CELL_HEIGHT > doc.page.height - 60 && cellsRenderedOnPage > 0)) {
        addNewPage();
        return doc.y; // Return new Y for the new page
    }
    return rowY; // Return original rowY if no new page
};


// First page setup: Header, Catalog Title
drawHeader();
doc.fontSize(18).text("Dido Product Catalog", { align: "center" });
doc.moveDown(0.5); // Add some space after the catalog title

// Initialize cellsRenderedOnPage for the first page's content area
cellsRenderedOnPage = 0;

shopData.forEach((category, categoryIndex) => {
    const validSubcategories = category.subcategories.filter(
        (sub) => sub.products && sub.products.length > 0
    );
    if (validSubcategories.length === 0) return;

    validSubcategories.forEach((sub, subIndex) => {
        // Estimate space needed for a subcategory header.
        const headerHeightEstimate = 30; // Approx. height for font size 14 + moveDown(0.25)
        // Determine the space needed for the subcategory header PLUS at least one full row of products.
        const spaceNeededForSubcategoryBlock = headerHeightEstimate + CELL_HEIGHT;

        // *** MODIFIED LOGIC FOR SUBCATEGORY PAGE BREAK ***
        // Rule 1: If 9 product cells are already rendered on the current page, force a new page.
        // This ensures a subcategory never starts immediately after 3 full rows.
        // Rule 2: If the subcategory header + at least one full row of products
        // cannot fit on the current page, move the subcategory to a new page.
        // This prevents orphaned subcategory headers at the very bottom.
        if (cellsRenderedOnPage === MAX_CELLS_PER_PAGE ||
            (doc.y + spaceNeededForSubcategoryBlock > doc.page.height - doc.page.margins.bottom)) {
            addNewPage();
        }
        // *** END MODIFIED LOGIC ***

        // Render subcategory name
        doc
            .fontSize(14)
            .fillColor("blue")
            .text(sub.name, margin, doc.y, {
                width: usableWidth,
                align: "center",
            });
        doc.moveDown(0.25); // Add a small space after the subcategory title

        let col = 0;
        let rowY = doc.y; // Starting Y for product cells for this subcategory

        sub.products.forEach((product) => {
            // Check for new page before drawing the current product cell.
            // This also updates doc.y if a new page is added by checkAndAddNewPageForProduct.
            rowY = checkAndAddNewPageForProduct(rowY);

            // Reset column if a new page was added (cellsRenderedOnPage would be 0 then).
            if (cellsRenderedOnPage === 0 && col !== 0) {
                col = 0;
            }

            const x = margin + col * CELL_WIDTH; // X position for the current cell

            // Calculate Y positions relative to rowY for each element within the cell
            const imageY = rowY + 10; // Small padding from the top of the cell
            const brandY = imageY + IMAGE_WIDTH + 5; // Below image
            const titleY = brandY + 15; // Below brand
            const badgeTextY = titleY + 30; // Below title (adjust for potential multi-line title)
            const quantityY = badgeTextY + 15; // Below badge text
            const productNumY = quantityY + 15; // Product number now comes after quantity_per_case

            // Ensure enough space for the content by checking remaining cell height
            const requiredHeight = productNumY - rowY + 15; // Estimate needed height for all content + some padding
            if (requiredHeight > CELL_HEIGHT) {
                console.warn(`Content for product ${product.product_num} might overflow cell height.`);
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

            cellsRenderedOnPage++; // Increment the cell counter for the current page

            col++;
            // Check if we need a new row (after 3 columns)
            if (col >= COLUMNS) {
                col = 0;
                rowY += CELL_HEIGHT; // Move to the next row by adding CELL_HEIGHT
            }
        });

        // After all products in a subcategory, ensure next content starts below the last row of products.
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