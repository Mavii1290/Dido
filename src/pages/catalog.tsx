import { useEffect } from "react";

const CatalogPage = () => {
  useEffect(() => {
    window.location.href = "/catalog/Dido_Product_Catalog.pdf";
  }, []);

  return (
    <div>
      <p>Redirecting to catalog...</p>
    </div>
  );
};

export default CatalogPage;
