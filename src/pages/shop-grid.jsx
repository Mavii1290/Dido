import RootLayout from "@/components/common/layout/RootLayout";
import ShopGridArea from "@/components/shop/shopGridArea";
import Head from "next/head";
import ShopCategory from "@/components/shop/shopCategory";

const ShopGrid = () => {
	return (
		<>
			<Head>
				<title>Products</title>
				<meta name="description" content="About Description" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main>
				<RootLayout header="header1" footer="footer1">
					<ShopGridArea />
					<ShopCategory/>
				</RootLayout>
			</main>
		</>
	);
};

export default ShopGrid;
