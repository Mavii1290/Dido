import { useEffect, useState, useRef } from "react";
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
} from "@/lib/utils/productHelpers";

const ShopPage = () => {
  const router = useRouter();
  const { sub } = router.query;

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("default");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const allProducts: Product[] = flattenAllProducts(shop_data);

    if (typeof sub === "string") {
      const filtered = filterProductsBySubcategory(shop_data, sub);
      setSelectedSubcategory(sub);
      setFilteredProducts(filtered);
    } else {
      setSelectedSubcategory(null);
      setFilteredProducts(allProducts);
    }

    setVisibleCount(12);
    setLoading(false);
  }, [sub]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      {
        threshold: 1.0,
      }
    );

    const ref = loadMoreRef.current;
    if (ref) observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [filteredProducts]);

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

  const handleClearFilter = () => {
    router.push("/shop", undefined, { shallow: true });
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.new_price - b.new_price;
    if (sortOption === "price-desc") return b.new_price - a.new_price;
    if (sortOption === "title-asc") return a.title.localeCompare(b.title);
    if (sortOption === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

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
              <div className="mb-4 text-end">
                <label className="me-2">Sort by:</label>
                <select
                  className="form-select w-auto d-inline-block"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="title-asc">Title: A-Z</option>
                  <option value="title-desc">Title: Z-A</option>
                </select>
              </div>
              {loading ? (
                <p className="text-gray-400">Loading products...</p>
              ) : visibleProducts.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
              ) : (
                <>
                  <ShoppingGrid products={visibleProducts} />
                  <div ref={loadMoreRef} className="text-center py-4" />
                </>
              )}
            </div>
          </div>
        </RootLayout>
      </main>
    </>
  );
};

export default ShopPage;
