// src/pages/contact.tsx

import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import Contact1 from "@/components/contact/Contact1";
import { NextPage } from "next";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout header="header1" footer="footer1">
          <Contact1 />
        </RootLayout>
      </main>
    </>
  );
};

export default Contact;
