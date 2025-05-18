import React, { useState } from "react";
import { useRouter } from "next/router";
import shop_data from "../../../data/shop_data.json";
import ProductCard, { Product } from "../details/ProductCard";
import ProductDetails from "./details/ProductDetails";

const flattenProducts = (): Product[] => {
  const products: Product[] = [];
  shop_data.forEach((category) => {
    category.subcategories.forEach((subcat) => {
      products.push(...subcat.products);
    });
  });
  return products;
};

const ShoppingGrid = () => {
  const router = useRouter();
  const allProducts = flattenProducts();
  const [itemsToShow, setItemsToShow] = useState<number>(12);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setItemsToShow(value === "all" ? allProducts.length : parseInt(value));
  };

  const displayedProducts = allProducts.slice(0, itemsToShow);

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
            value={itemsToShow > allProducts.length ? "all" : itemsToShow}
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

        {/* Pagination Placeholder */}
        <div className="shop-pagination pt-3">
          <div className="container">
            <div className="card">
              <div className="card-body py-3">
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-two justify-content-center">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <i className="bi bi-chevron-left"></i>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">...</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">9</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <i className="bi bi-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingGrid;
