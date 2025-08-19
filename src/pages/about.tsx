import Brand from "@/components/brand/Brand2";
import RootLayout from "@/components/common/layout/RootLayout";
import CTA from "@/components/cta/CTA";
import AboutStory from "@/components/about/AboutStory";
import { FC } from "react";

const About: FC = () => {
  return (
    <div>
      <main>
        <RootLayout header="header1" footer="footer1">
          <AboutStory />
          <Brand />
          <CTA />
        </RootLayout>
      </main>
    </div>
  );
};

export default About;
