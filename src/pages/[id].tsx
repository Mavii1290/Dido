import { useRouter } from "next/router";
import shopData from "@/data/shop_data.json";
import { Product } from "@/types";
import RootLayout from "@/components/common/layout/RootLayout";

const findProductById = (id: number): Product | undefined => {
  for (const category of shopData) {
    for (const sub of category.subcategories) {
      const product = sub.products.find((p) => p.id === id);
      if (product) return product;
    }
  }
  return undefined;
};

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const productId = parseInt(id as string, 10);
  const product = findProductById(productId);

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <RootLayout header="header1" footer="footer1">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.img} alt={product.title} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>{product.title}</h2>
            <p>{product.description || "No description available."}</p>
            <p>
              <del>${product.old_price}</del>{" "}
              <strong>${product.new_price}</strong>
            </p>
            <button className={`btn btn-${product.btn_color || "primary"}`}>
              {product.btn_text || "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ProductPage;
