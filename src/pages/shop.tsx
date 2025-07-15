import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import shop_data from "@/data/shop_data.json";
import RootLayout from "@/components/common/layout/RootLayout";
import ShoppingGrid from "@/components/shop/grid/ShoppingGrid";
import ShopCategory from "@/components/shop/category/shopCategory";
import { Product, Subcategory, Category } from "@/types";
import {
  flattenAllProducts,
  filterProductsBySubcategory,
} from "@/lib/utils/productHelpers";

const ShopPage = () => {
  const router = useRouter();
  const { sub } = router.query;

  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => setShowDrawer((prev) => !prev);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("default");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Load products on initial render or when subcategory changes
useEffect(() => {
  const allProducts: Product[] = flattenAllProducts(shop_data);

  let filtered: Product[];

  if (typeof sub === "string" && sub.length) {
    filtered = filterProductsBySubcategory(shop_data, sub);
    setSelectedSubcategory(sub);
  } else {
    filtered = allProducts;
    setSelectedSubcategory(null);
  }

  setFilteredProducts(filtered);
  setVisibleCount(filtered.length); // ✅ Pass a number here
  setLoading(false);
}, [sub]);

  // Infinite scroll + ESC key listener
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 1.0 }
    );

    const ref = loadMoreRef.current;
    if (ref) observer.observe(ref);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDrawer(false);
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      if (ref) observer.unobserve(ref);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Handle category selection
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

  // Clear subcategory filter
  const handleClearFilter = () => {
    router.push("/shop", undefined, { shallow: true });
  };

  // Sort products
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
      <RootLayout header="header1" footer="footer1">
        <main>
          {/* === MOBILE FILTER BAR WITH DROPDOWN === */}
          <div className="mobile-filter-bar d-md-none">
            <div style={{ position: "relative" }}>
             <button className="mobile-btn btn-sm" onClick={toggleDrawer}>
      Category
    </button>

              {showDrawer && (
                <div className="shop-dropdown-panel">
                  <div className="text-end mb-2">
                    <button
                      className="drop-down-x"
                      onClick={toggleDrawer}
                    >
                      X
                    </button>
                  </div>
                  <ShopCategory
                    data={shop_data}
                    onSelect={(sub) => {
                      handleSubcategorySelect(sub);
                      setShowDrawer(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="container">
            <div className="row">
              {/* ==== DESKTOP SIDEBAR ==== */}
              <div className="col-md-4 d-none d-md-block">
                <div className="shop-sidebar">
                  <ShopCategory
                    data={shop_data}
                    onSelect={handleSubcategorySelect}
                  />
                </div>
              </div>

              {/* ==== PRODUCT GRID ==== */}
              <div className="col-md-8">
                {!loading && visibleProducts.length > 0 && (
                  <>
                    <ShoppingGrid products={visibleProducts} />
                    <div ref={loadMoreRef} className="text-center py-4" />
                  </>
                )}

                {loading && <p className="text-gray-400">Loading products...</p>}

                {!loading && visibleProducts.length === 0 && (
                  <section className="py-4">
                    <div className="shop-grid">
                      <div className="text-center py-5">
                        <p className="text-gray-500 no-product mb-3">
                          No products found.
                        </p>
                        <button
                          onClick={handleClearFilter}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          Clear Filter
                        </button>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </main>
      </RootLayout>
    </>
  );
};

export default ShopPage;
