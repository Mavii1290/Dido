import RootLayout from "@/components/common/layout/RootLayout";
import Header1 from "@/components/header/Header1";
import Footer1 from "@/components/footer/Footer1";
import ShopGridArea from "@/components/shop/shopGridArea";
import Head from "next/head";

const ShopGrid = () => {
	return (
		<>
			<Head>
				<title>About</title>
				<meta name="description" content="About Description" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main>
				<RootLayout>
					<Header1 links="pages" title="Shop Grid" />
					<ShopGridArea />
					<Footer1 />
				</RootLayout>
			</main>
		</>
	);
};

export default ShopGrid;
