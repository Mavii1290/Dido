import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../details/ProductCard";
import { Product, Subcategory, Category } from "../../../types";
import Link from "next/link";


interface Props {
  products: Product[];
}

const ShoppingGrid: React.FC<Props> = ({ products }) => {
  const router = useRouter();
  const [itemsToShow, setItemsToShow] = useState<number>(products.length);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset pagination when products change
useEffect(() => {
  setItemsToShow(products.length);
  setCurrentPage(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [products]);

  const startIndex = (currentPage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const displayedProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsToShow);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const count = value === "all" ? products.length : parseInt(value);
    setItemsToShow(count);
    setCurrentPage(1);
  };

const handleProductClick = (product: Product) => {
  const id = String(product.id);
  // Explicit dynamic route form:
  router.push({ pathname: "/products/[id]", query: { id } });
};
  return (
    <section className="py-6">
      <div className="shop-grid max-w-7xl mx-auto px-4">
        {/* Sort Control */}
        <div className="d-flex flex-col md:flex-row justify-content-between items-center mb-6 gap-4">
          <h2 className="mb-0 shop-font-header">Shop Products</h2>
          <select
            value={itemsToShow === products.length ? "all" : itemsToShow}
            onChange={handleItemsChange}
            className="form-select w-auto"
          >
            <option value="12">Show 12</option>
            <option value="24">Show 24</option>
            <option value="48">Show 48</option>
            <option value="all">Show All</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="row g-3">
          {displayedProducts.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
             <Link
        href={{ pathname: "/product/[id]", query: { id: String(product.id) } }}
        className="block"
      >
        <ProductCard product={product} onClick={() => {}} />
      </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {itemsToShow !== products.length && (
          <div className="shop-pagination pt-3">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoppingGrid;
