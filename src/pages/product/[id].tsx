// src/pages/product/[id].tsx  (or pages/product/[id].tsx if you don't use src/)
import React from "react";
import { useRouter } from "next/router";
import RootLayout from "@/components/common/layout/RootLayout";
import ProductGrid from "@/components/common/ProductGrid";
import shop_data from "../../data/shop_data.json";
import { Product, Subcategory, Category } from "../../types";
import Image from "next/image";

// ---- Helpers ----
const flattenProducts = (): Product[] => {
  // Flattens: Category[] -> Subcategory[] -> Product[]
  return (shop_data as unknown as Category[]).flatMap((category: Category) =>
    (category.subcategories ?? []).flatMap((subcat: Subcategory) =>
      subcat.products ?? []
    )
  );
};

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // id can be string | string[] | undefined
  const pid = Array.isArray(id) ? id[0] : id;

  const products = React.useMemo(() => flattenProducts(), []);
  const product = products.find((p) => String(p.id) === String(pid));

  if (!pid) {
    // Router not ready yet (during first render)
    return null;
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-2">Product not found.</h2>
        <p className="text-gray-600">
          Sorry, the product you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      <RootLayout header="header1" footer="footer1">
        <main className="max-w-6xl mx-auto py-10 px-4 product-id">
          {/* Image */}
          <div className="product-grid">
            <Image
              priority
              src={product.img}
              alt={product.product}
              width={500}
              height={500}
              className="object-contain id-image"
            />
          </div>

          {/* Product Info */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{product.brand}</h1>
            <h1 className="text-3xl font-bold mb-4">{product.product}</h1>
            <p className="text-gray-700 mb-6 id-description text-center">
              {product.description}
            </p>
            {product.size && <p className="mb-6">{product.size}</p>}
            {product.per_case && <p className="mb-6">{product.per_case} Per Case</p>}
            <p className="text-sm text-green-600 mb-4 font-medium">In Stock</p>
          </div>

          {/* Related Products */}
          <div className="product-grid-body">
            <ProductGrid
              title="Related Products"
              products={products}
              excludeId={String(pid)}
              limit={4}
            />
          </div>
        </main>
      </RootLayout>
    </div>
  );
};

export default ProductPage;
