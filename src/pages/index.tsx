import React from "react";
import RootLayout from "@/components/common/layout/RootLayout";
import IndexHero from "@/components/hero/IndexHero";
import Brand from "@/components/brand/Brand";
import About from "@/components/about/AboutHero";
import CTA from "@/components/cta/CTA";
import { NextPage } from "next";

const Dido: NextPage = () => {
  return (
    <div>

      <main>
        <RootLayout header="header1" footer="footer1">
          <IndexHero />
          <Brand />
          <About />
          <CTA />
        </RootLayout>
      </main>
    </div>
  );
};

export default Dido;
