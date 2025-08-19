import RootLayout from "@/components/common/layout/RootLayout";
import Faq1 from "@/components/faq/Faq1";
import FaqCTA from "@/components/cta/FaqCTA";

const Faq = () => {
  return (
    <div>
      <main>
        <RootLayout header="header1" footer="footer1">
          <Faq1 />
          <FaqCTA />
        </RootLayout>
      </main>
    </div>
  );
};

export default Faq;
