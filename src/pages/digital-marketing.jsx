import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import DigitalMarketingHero from "@/components/hero/DigitalMarketingHero";
import DigitalMarketingBrand from "@/components/brand/DigitalMarketingBrand";
import DigitalMarketingAbout from "@/components/about/DigitalMarketingAbout";
import DigitalAgencyCTA from "@/components/cta/DigitalAgencyCTA";


export default function DigitalMarketing() {
  return (
    <div>
      <Head>
        <title>Dido Distributions</title>
        <meta name="description" content="Ny Distributor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout header="header1" footer="footer1">
          <DigitalMarketingHero />
          <DigitalMarketingBrand />
          <DigitalMarketingAbout />
          <DigitalAgencyCTA />
        </RootLayout>
      </main>
    </div>
  );
}
