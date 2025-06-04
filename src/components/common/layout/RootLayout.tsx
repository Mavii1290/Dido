import { useEffect, useRef, useState, ReactNode } from "react";
import allNavData from "../../../data/navData.json";
import Preloader from "@/components/preloader/Preloader";
import CommonAnimation from "../CommonAnimation";
import ScrollSmootherComponents from "../ScrollSmootherComponents";
import CursorAnimation from "../CursorAnimation";
import ScrollTop from "../ScrollTop";
import Header1 from "@/components/header/Header1";
import Footer1 from "@/components/footer/Footer1";

interface RootLayoutProps {
  children: ReactNode;
  header?: string;
  footer?: string;
  defaultMode?: string;
}

interface HeaderContentProps {
  header?: string;
  navData: any;
}

const HeaderContent = ({ header, navData }: HeaderContentProps) => {
  if (header === "header1") {
    return <Header1 navData={navData} />;
  }
  return null;
};

const FooterContent = ({ footer }: { footer?: string }) => {
  if (footer === "footer1") {
    return <Footer1 />;
  }
  return null;
};

export default function RootLayout({
  children,
  header = "",
  footer = "",
  defaultMode = "",
}: RootLayoutProps) {
  const [mode, setMode] = useState(defaultMode);
  const [enableSmoother, setEnableSmoother] = useState(false);

  const cursor1 = useRef<HTMLDivElement>(null);
  const cursor2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enable ScrollSmoother only on desktop
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 768) {
        setEnableSmoother(true);
      }

      const body = document.querySelector("body");
      if (mode === "dark") {
        body?.classList.add("dark");
      } else {
        body?.classList.remove("dark");
      }
    }
  }, [mode]);

  return (
    <>
      <CommonAnimation>
        <div className="has-smooth" id="has_smooth"></div>
        <CursorAnimation cursor1={cursor1} cursor2={cursor2} />
        <Preloader />
        <ScrollTop />

        {/* ✅ Header OUTSIDE scroll wrapper */}
        <HeaderContent header={header} navData={allNavData} />

        {/* ✅ Desktop-only ScrollSmoother */}
        {enableSmoother ? (
          <>
            <ScrollSmootherComponents />
            <div id="smooth-wrapper">
              <div id="smooth-content">
                {children}
                <FooterContent footer={footer} />
              </div>
            </div>
          </>
        ) : (
          <>
            {children}
            <FooterContent footer={footer} />
          </>
        )}
      </CommonAnimation>
    </>
  );
}
