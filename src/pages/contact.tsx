import RootLayout from "@/components/common/layout/RootLayout";
import Contact1 from "@/components/contact/Contact1";
import { NextPage } from "next";

const Contact: NextPage = () => {
  return (
    <div>
      <main>
        <RootLayout header="header1" footer="footer1">
          <Contact1 />
        </RootLayout>
      </main>
    </div>
  );
};

export default Contact;
