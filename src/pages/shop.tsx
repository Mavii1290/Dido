
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import shop_data from "@/data/shop_data.json";
import RootLayout from "@/components/common/layout/RootLayout";
import ShoppingGrid from "@/components/shop/grid/ShoppingGrid";
import ShopCategory from "@/components/shop/category/shopCategory";
import { Product, Subcategory } from "@/types";
import {flattenAllProducts, filterProductsBySubcategory, getSubcategoryName,} from "@/lib/utils/productHelpers";


const ShopPage = () => {
  const router = useRouter();
  const { sub } = router.query;

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const allProducts: Product[] = flattenAllProducts(shop_data);

  // Sync URL param to local state and update products
  useEffect(() => {
    if (typeof sub === "string") {
      setSelectedSubcategory(sub);
      const filtered = filterProductsBySubcategory(allProducts, sub);
      setFilteredProducts(filtered);
    } else {
      setSelectedSubcategory(null);
      setFilteredProducts(allProducts);
    }
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
            </div>
            <div className="w-full md:w-3/4">
              <ShoppingGrid products={filteredProducts} />
            </div>
          </div>
        </RootLayout>
      </main>
    </>
  );
};

export default ShopPage;
