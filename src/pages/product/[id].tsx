import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import ProductGrid from "@/components/common/ProductGrid";
import shop_data from "../../data/shop_data.json";
import { Product, Subcategory, Category } from "../../types";
import Image from "next/image";


// Flatten products from categories
const flattenProducts = (): Product[] => {
  const products: Product[] = [];
  shop_data.forEach((category) => {
    category.subcategories?.forEach((subcat) => {
      if (Array.isArray(subcat.products)) {
        products.push(...products);
      }
    });
  }
);
  return products;
};

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const products = flattenProducts();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-2">Product not found.</h2>
        <p className="text-gray-600">Sorry, the product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.product}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootLayout header="header1" footer="footer1">
        <main className="max-w-6xl mx-auto py-10 px-4 product-id">
        <div className="product-grid">
              <Image
              priority
                src={product.img}
                alt={product.product}
                width={500}
                    height={500}
                className="object-contain id-image "
              />
</div>
            {/* Product Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{product.brand}</h1>
              <h1 className="text-3xl font-bold mb-4">{product.product}</h1>
              <p className="text-gray-700 mb-6 id-description text-center">{product.description}</p>
              <p className="mb-6">{product.size}</p>
              <p className="mb-6">{product.per_case} Per Case</p>
              <p className="text-sm text-green-600 mb-4 font-medium">In Stock</p>
 </div>


          {/* Related Products */}
          <div className="product-grid-body ">
          <ProductGrid
            title="Related Products"
            products={products}
            excludeId={id}
            limit={4}
          />
          </div>
        </main>
      </RootLayout>
    </>
  );
};

export default ProductPage;
