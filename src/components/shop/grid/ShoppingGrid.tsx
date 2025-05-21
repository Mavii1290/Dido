import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../details/ProductCard";
import { Product } from "../details/ProductCard";

interface Props {
  products: Product[];
}

const ShoppingGrid: React.FC<Props> = ({ products }) => {
  const router = useRouter();
  const [itemsToShow, setItemsToShow] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset pagination when products change
  useEffect(() => {
    setItemsToShow(12);
    setCurrentPage(1);
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
    router.push(`/product/${product.id}`);
  };

  return (
    <section className="py-4">
      <div className="container shop-grid">
        {/* Sort Control */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 grid-header">Shop Products</h2>
          <select
            value={itemsToShow > products.length ? "all" : itemsToShow}
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
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={product} onClick={() => handleProductClick(product)} />
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
