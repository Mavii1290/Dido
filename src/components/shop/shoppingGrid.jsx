import React, { useState } from "react";
import shop_data from "../../data/shop_data";

const sampleProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    img: "/images/product1.jpg",
    new_price: "49.99",
    old_price: "69.99",
    badge_text: "Sale",
    badge_color: "success",
    btn_text: "Add to Cart",
    btn_color: "primary",
  },
  {
    id: 2,
    title: "Smart Watch",
    img: "/images/product2.jpg",
    new_price: "99.99",
    old_price: "129.99",
    badge_text: "Hot",
    badge_color: "danger",
    btn_text: "Add to Cart",
    btn_color: "primary",
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    img: "/images/product3.jpg",
    new_price: "29.99",
    old_price: "39.99",
    badge_text: "New",
    badge_color: "info",
    btn_text: "Add to Cart",
    btn_color: "primary",
  },
];

const ShopGridArea = () => {
  const [sortOption, setSortOption] = useState("Newest");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <section className="shop-grid py-4">
      <div className="container">
        {/* Sort dropdown */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Products</h4>
          <select value={sortOption} onChange={handleSortChange} className="form-select w-auto">
            <option>Newest</option>
            <option>Oldest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {sampleProducts.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <div className="card h-100 text-center">
                <img src={product.img} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <span className={`badge bg-${product.badge_color} mb-2`}>
                    {product.badge_text}
                  </span>
                  <h6 className="card-title">{product.title}</h6>
                  <p className="card-text text-muted mb-1">
                    <del>${product.old_price}</del> <strong>${product.new_price}</strong>
                  </p>
                  <button className={`btn btn-${product.btn_color} btn-sm`}>
                    {product.btn_text}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper text-center mt-4">
          <nav>
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ShopGridArea;
