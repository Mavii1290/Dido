import Head from "next/head";
import Brand from "@/components/brand/Brand2";
import RootLayout from "@/components/common/layout/RootLayout";
import CTA from "@/components/cta/CTA";
import AboutStory from "@/components/about/AboutStory";
import { FC } from "react";

const About: FC = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout header="header1" footer="footer1">
          <AboutStory />
          <Brand />
          <CTA />
        </RootLayout>
      </main>
    </>
  );
};

export default About;
