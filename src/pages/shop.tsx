import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import shop_data from "@/data/shop_data.json";
import RootLayout from "@/components/common/layout/RootLayout";
import ShoppingGrid from "@/components/shop/ShoppingGrid";
import ShopCategory from "@/components/shop/ShopCategory";
import { Product, Subcategory } from "@/types"; // Adjust if your types file is elsewhere

const ShopGrid = () => {
  const router = useRouter();
  const { sub } = router.query;

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Sync URL param to local state
  useEffect(() => {
    if (typeof sub === "string") {
      setSelectedSubcategory(sub);
    } else {
      setSelectedSubcategory(null);
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

  // Flatten all products from all categories/subcategories
  const allProducts: Product[] = shop_data.flatMap((category) =>
    category.subcategories.flatMap((subcat) => subcat.products || [])
  );

  const filteredProducts = selectedSubcategory
    ? allProducts.filter((item) => item.sub === selectedSubcategory)
    : allProducts;

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

export default ShopGrid;
