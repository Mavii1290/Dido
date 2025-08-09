const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// Paths
const dataPath = path.join(__dirname, "../src/data/shop_data.json");
const outputPath = path.join(
	__dirname,
	"../public/catalog/Dido_Product_Catalog.pdf",
);
const logoPath = path.join(
	__dirname,
	"../public/assets/imgs/dido/pdf_logo.png",
);
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
const MAX_CELLS_PER_PAGE = 9; // Maximum cells per page (3 rows * 3 columns)

// Global counter for cells rendered on the current page (for main product grid)
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

// Function to add a new page and reset counters (for main product grid)
const addNewPage = () => {
	doc.addPage();
	drawHeader();
	cellsRenderedOnPage = 0; // Reset cells counter for the new page
	doc.y = doc.page.margins.top + 50; // Start content below header, leaving space for the header
};

// Function to check and add a new page specifically for product cells (for main product grid)
const checkAndAddNewPageForProduct = (rowY) => {
	if (
		cellsRenderedOnPage === MAX_CELLS_PER_PAGE ||
		(rowY + CELL_HEIGHT > doc.page.height - 60 && cellsRenderedOnPage > 0)
	) {
		addNewPage();
		return doc.y; // Return new Y for the new page
	}
	return rowY; // Return original rowY if no new page
};

// --- START: Main PDF Catalog Generation (Your existing code) ---

// First page setup: Header, Catalog Title
drawHeader();
doc
	.fontSize(12)
	.text(
		"Thanks for your patience! We're temporarily out of stock on a few items while we await our next shipment from overseas. We appreciate your understanding and are working to restock as quickly as possible.",
		{ align: "center" },
	);
doc.moveDown(0.5); // Add some space after the catalog title

// Initialize cellsRenderedOnPage for the first page's content area
cellsRenderedOnPage = 0;

shopData.forEach((category, categoryIndex) => {
	const validSubcategories = category.subcategories.filter(
		(sub) => sub.products && sub.products.length > 0,
	);
	if (validSubcategories.length === 0) return;

	validSubcategories.forEach((sub, subIndex) => {
		const headerHeightEstimate = 30;
		const spaceNeededForSubcategoryBlock = headerHeightEstimate + CELL_HEIGHT;

		if (
			cellsRenderedOnPage === MAX_CELLS_PER_PAGE ||
			doc.y + spaceNeededForSubcategoryBlock >
				doc.page.height - doc.page.margins.bottom
		) {
			addNewPage();
		}

		doc.fontSize(14).fillColor("blue").text(sub.name, margin, doc.y, {
			width: usableWidth,
			align: "center",
		});
		doc.moveDown(0.25);

		let col = 0;
		let rowY = doc.y;

		sub.products.forEach((product) => {
			rowY = checkAndAddNewPageForProduct(rowY);

			if (cellsRenderedOnPage === 0 && col !== 0) {
				col = 0;
			}

			const x = margin + col * CELL_WIDTH; // X position for the current cell

			const cellPadding = 10; // Consistent padding for all content inside cell
			const contentX = x + cellPadding;
			const contentWidth = CELL_WIDTH - 2 * cellPadding;

			const imageY = rowY + cellPadding; // Image starts with cell padding

			// --- REORDERED Y POSITIONS FOR TEXT CONTENT ---
			let currentTextY = imageY + IMAGE_WIDTH + 5; // Start Y for first text element after image

			// 1. Size
			const sizeY = currentTextY;
			currentTextY += 15;

			// 2. Per Case
			const perCaseY = currentTextY;
			currentTextY += 15;

			// 3. Brand
			const brandY = currentTextY + 5;
			currentTextY = brandY + 15;

			// 4. Product (Title)
			const titleY = currentTextY;
			currentTextY += 15;

			// 5. Price (positioned relative to the bottom of the cell)
			const priceY = rowY + CELL_HEIGHT - cellPadding - 30;

			// 6. Item # (at the very bottom of the cell)
			const productNumY = rowY + CELL_HEIGHT - cellPadding - 10;

			// --- END REORDERED Y POSITIONS ---

			try {
				const imgPath = path.join(publicDir, product.img);
				if (fs.existsSync(imgPath)) {
					doc.image(
						imgPath,
						contentX + (contentWidth - IMAGE_WIDTH) / 2,
						imageY,
						{
							width: IMAGE_WIDTH,
						},
					);
				}
			} catch (e) {
				console.warn("⚠️ Image missing:", product.img);
			}

			// --- Draw contents in new order ---

			// Draw Size
			doc
				.fontSize(9)
				.fillColor("gray")
				.text(product.size || "N/A", contentX, sizeY, {
					align: "center",
					width: contentWidth,
				});

			// Draw Per Case
			doc
				.fontSize(9)
				.fillColor("black")
				.text(product.per_case || "N/A", contentX, perCaseY, {
					width: contentWidth,
					align: "center",
				});

			// Draw Brand
			doc
				.fontSize(10)
				.fillColor("black")
				.text(product.brand || "", contentX, brandY, {
					width: contentWidth,
					align: "center",
				});

			// Draw Product (Title)
			doc.fontSize(10).text(product.product || "", contentX, titleY, {
				width: contentWidth,
				align: "center",
			});

			// Draw Price
			// doc.fontSize(10).fillColor("black").text(`$${(product.price || 0).toFixed(2)}`, contentX, priceY, {
			//     width: contentWidth,
			//     align: "center",
			// });

			// Draw Item #
			doc
				.fontSize(10)
				.fillColor("black")
				.text(product.item_num || "", contentX, productNumY, {
					width: contentWidth,
					align: "center",
				});
			// --- End reordered content drawing ---

			cellsRenderedOnPage++;

			col++;
			if (col >= COLUMNS) {
				col = 0;
				rowY += CELL_HEIGHT;
			}
		});

		if (col !== 0) {
			doc.y = rowY + CELL_HEIGHT;
		} else {
			doc.y = rowY;
		}
		doc.moveDown(0.5);
	});
});

// --- END: Main PDF Catalog Generation ---

// --- START: Excel-like Table Generation for PDF ---
// --- START: Excel-like Table Generation for PDF ---

// Flatten all products into a single array
const allProducts = [];
shopData.forEach((category) => {
	category.subcategories.forEach((sub) => {
		if (sub.products && sub.products.length > 0) {
			sub.products.forEach((product) => {
				allProducts.push(product);
			});
		}
	});
});

// Add a new page for the summary table (if current page has content)
// Or if it's the very first content being added, ensure a new page is used for the table.
if (
	doc.y > doc.page.margins.top + 50 ||
	cellsRenderedOnPage > 0 ||
	doc.page.content.length === 0
) {
	doc.addPage();
	drawHeader();
} else {
	// If the last content was very short and a new page wasn't added, just ensure header is there
	drawHeader();
}
doc.y = doc.page.margins.top + 50; // Reset Y for new content

// Draw the main title for the summary table
doc.fontSize(18).text("Product List", { align: "center" });
// No doc.moveDown() here, so headers appear immediately below the title

// Define table properties (these are already correct)
const tableHeaders = [
	{ label: "QUANTITY", width: 60 },
	{ label: "ITEM #", key: "item_num", width: 55 },
	{ label: "BRAND", key: "brand", width: 100 },
	{ label: "PRODUCT", key: "product", width: 170 },
	{ label: "SIZE", key: "size", width: 70 },
	{ label: "PER CASE", key: "per_case", width: 70 },
	// { label: "PRICE", key: "price", width: 60 }
];

const headerHeight = 25;
const rowHeight = 20;
let currentY = doc.y; // Start currentY at doc.y for table content
// let currentX = margin; // This will be calculated dynamically inside the loops

// --- Function to draw table headers (reusable for new pages) ---
const drawSummaryTableHeaders = (startY) => {
	doc.save(); // Save current state

	let columnX = margin; // Start X for the first column

	// Draw background rectangle first
	doc.fillColor("#F2F2F2");
	doc.rect(columnX, startY, usableWidth + 15, headerHeight).fill();

	doc.fillColor("black"); // Set text color for headers
	doc.fontSize(10); // Set font size for headers

	tableHeaders.forEach((header) => {
		// Calculate text X position for centering within the column
		doc.text(header.label, columnX, startY + 10, {
			// This line draws the text
			width: header.width,
			align: "center",
		});
		columnX += header.width; // Move to the start of the next column
	});

	doc.restore(); // Restore previous drawing state
};
// --- End drawSummaryTableHeaders function ---

// Draw initial table headers
drawSummaryTableHeaders(currentY); // Call the function to draw headers
currentY += headerHeight; // Move Y past the header

// --- NEW: Store the starting Y of the table for the final right vertical line ---
let tableStartDrawingY = currentY - headerHeight; // This is the Y where the header started
// --- END NEW ---

// Draw table rows
allProducts.forEach((product, index) => {
	// Check if a new page is needed for the current row
	if (currentY + rowHeight > doc.page.height - doc.page.margins.bottom) {
		doc.addPage();
		drawHeader(); // Redraw main PDF header on new page
		doc.y = doc.page.margins.top + 50; // Reset Y below main header

		// Redraw table title on new page (with "Continued")
		doc
			.fontSize(18)
			.text("Product Summary Table (Continued)", { align: "center" });

		// Redraw table headers on the new page
		currentY = doc.y; // Reset currentY to start of table content on new page
		drawSummaryTableHeaders(currentY); // Call the function to draw headers at the new Y
		currentY += headerHeight; // Move Y past the header

		// --- NEW: Reset tableStartDrawingY for a new page ---
		tableStartDrawingY = currentY - headerHeight;
		// --- END NEW ---
	}

	let columnX = margin; // Reset X for each row, starting at the left margin

	// Draw row background (alternate colors for readability)
	const rowColor = index % 2 === 0 ? "#FFFFFF" : "#F9F9F9";
	doc
		.rect(columnX, currentY, usableWidth + 15, rowHeight)
		.fill(rowColor)
		.stroke("#DDDDDD");

	tableHeaders.forEach((header) => {
		let value = product[header.key];

		// Format price specifically
		if (header.key === "price") {
			value = `$${(value || 0).toFixed(2)}`;
		} else if (value === undefined || value === null || value === "") {
			value = ""; // Handle missing data
		}

		// Draw text for the data cell
		doc
			.fontSize(8)
			.fillColor("black")
			.text(String(value), columnX, currentY + 5, {
				width: header.width,
				align: "center", // Center text in cells
				ellipsis: true, // Truncate text with ellipsis if it overflows
			});
		columnX += header.width; // Move to the start of the next column
	});

	// Draw bottom line for the current row
	doc
		.strokeColor("#DDDDDD")
		.moveTo(margin, currentY + rowHeight)
		.lineTo(margin + usableWidth + 15, currentY + rowHeight)
		.stroke();

	currentY += rowHeight;
});

// --- END: New Excel-like Table Generation for PDF ---

doc.end();
console.log("✅ PDF catalog generated with grid layout and summary table.");
