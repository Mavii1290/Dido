import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Product } from "../components/details/ProductCard";
import RootLayout from "@/components/common/layout/RootLayout";
import shop_data from "../../data/shop_data.json";


// same flattening logic from ShoppingGrid
const flattenProducts = (): Product[] => {
  const products: Product[] = [];
  shop_data.forEach((category) => {
    category.subcategories.forEach((subcat) => {
      products.push(...subcat.products);
    });
  });
  return products;
};

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const products = flattenProducts();
const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="container py-5">
        <h2>Product not found.</h2>
        <p>Sorry, the product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
    <Head>
        <title>Item</title>
        <meta name="description" content="Item" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout header="header1" footer="footer1">
    <div className="container py-5 item-container">
      <h2>{product.title}</h2>
      <img
        src={product.img}
        alt={product.title}
        className="img-fluid mb-3"
        style={{ maxHeight: "300px", objectFit: "contain" }}
      />
      <p>
        <del>${product.old_price}</del> <strong>${product.new_price}</strong>
      </p>
      <p>{product.description}</p>
    </div>
    </RootLayout>
    </main>
    </>
  );
};

export default ProductPage;
