import { useEffect } from "react";
import Head from "next/head";

const CatalogPage = () => {
  useEffect(() => {
    window.location.href = "/catalog/Dido_Product_Catalog.pdf";
  }, []);

  return (
    <>
      <Head>
        <title>Catalog</title>
        <meta name="robots" content="noindex" />
      </Head>
      <p>Redirecting to catalog...</p>
    </>
  );
};

export default CatalogPage;
