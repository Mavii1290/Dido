import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import shop_data from "@/data/shop_data.json";
import RootLayout from "@/components/common/layout/RootLayout";
import ShoppingGrid from "@/components/shop/grid/ShoppingGrid";
import ShopCategory from "@/components/shop/category/shopCategory";
import { Product, Subcategory } from "@/types";
import {
  flattenAllProducts,
  filterProductsBySubcategory,
  getSubcategoryName,
} from "@/lib/utils/productHelpers";


const ShopPage = () => {
  const router = useRouter();
  const { sub } = router.query;

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync URL param to local state and update products
  useEffect(() => {
    setLoading(true);
    const allProducts: Product[] = flattenAllProducts(shop_data);

    if (typeof sub === "string") {
      setSelectedSubcategory(sub);
      const filtered = filterProductsBySubcategory(shop_data, sub);
      setFilteredProducts(filtered);
    } else {
      setSelectedSubcategory(null);
      setFilteredProducts(allProducts);
    }
    setLoading(false);
    console.log("Filtering for subcategory:", sub);
    console.log("Filtered Products:", filteredProducts);
  }, [sub]);

  const handleSubcategorySelect = (subcategory: Subcategory) => {
    router.push(
      {
        pathname: "/shop",
        query: { sub: subcategory.slug },
      },
      undefined,
      { shallow: true }
      
    );
  };

  const [gridKey, setGridKey] = useState(0);

const handleClearFilter = () => {
  router.push("/shop", undefined, { shallow: true });
  setGridKey(prev => prev + 1); // force grid to reset
};

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Shop all products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout header="header1" footer="footer1">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <ShopCategory data={shop_data} onSelect={handleSubcategorySelect} />
              {selectedSubcategory && (
  <div className="mt-4">
    <button
      onClick={handleClearFilter}
      className="btn btn-outline-secondary btn-sm mt-2"
    >
      Clear Filter
    </button>
  </div>
)}
            </div>
            <div className="w-full md:w-3/4">
              {loading ? (
                <p className="text-gray-400">Loading products...</p>
              ) : filteredProducts.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
              ) : (
<ShoppingGrid key={gridKey} products={filteredProducts} />              )}
            </div>
          </div>
        </RootLayout>
      </main>
    </>
  );
};

export default ShopPage;
