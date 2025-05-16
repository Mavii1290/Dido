import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import Service1 from "@/components/service/Service1";
import ServiceBrand from "@/components/brand/ServiceBrand";
import DigitalAgencyCTA from "@/components/cta/CTA";

const Service = () => {
	return (
		<>
			<Head>
				<title>Service</title>
				<meta name="description" content="Service Description" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main>
				<RootLayout header="header1" footer="footer1">
					<Service1 />
					<ServiceBrand />
					<DigitalAgencyCTA />
				</RootLayout>
			</main>
		</>
	);
};

export default Service;
