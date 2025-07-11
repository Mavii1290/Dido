import { useRouter } from "next/router";
import shop_data from "../../../data/shop_data.json";
import React from "react";
import { Product, Subcategory, Category } from "../../../types";
import Image from "next/image"; 



const flattenProducts = (): Product[] => {
  const products: Product[] = [];
  shop_data.forEach((category) => {
    category.subcategories.forEach((subcat) => {
      products.push(...subcat.products);
    });
  });
  return products;
};

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const allProducts = flattenProducts();
  const product = allProducts.find((item) => item.id === id);

  if (!product) {
    return <div className="container py-4">Product not found.</div>;
  }

  return (
    <div className="container py-4">
      <div className="card p-4">
        <Image
          src={product.img}
          alt={product.title}
          className="img-fluid mb-3"
          style={{ maxHeight: "300px", objectFit: "contain" }}
          width={150}
          height={150}
        />
        <h3>{product.brand}</h3>
        <h3>{product.title}</h3>
        {/* <p>
          <del>${product.old_price}</del> <strong>${product.new_price}</strong>
        </p> */}
        <p>{product.description || "No description available."}</p>
        {/* <button className={`btn btn-${product.btn_color || "primary"}`}>
          {product.btn_text || "Add to Cart"}
        </button> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
