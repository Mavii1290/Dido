import React, { useState } from "react";
import shop_data from "../../data/shop_data";

const ShoppingGrid = () => {
  const [itemsToShow, setItemsToShow] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleItemsChange = (e) => {
    const value = e.target.value;
    setItemsToShow(value === "all" ? shop_data.length : parseInt(value));
  };

  const displayedProducts = shop_data.slice(0, itemsToShow);

  return (
    <section className="py-4">
      <div className="container shop-grid">
        {/* Sort Control */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Shop Products</h4>
          <select
            value={itemsToShow}
            onChange={handleItemsChange}
            className="form-select w-auto"
          >
            <option value="12">Show 12</option>
            <option value="24">Show 24</option>
            <option value="48">Show 48</option>
            <option value="all">Show All</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {displayedProducts.map((product, i) => (
            <div
              key={i}
              className="col-6 col-md-4 col-lg-3"
              onClick={() => setSelectedProduct(product)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 text-center">
                <img
                  src={product.img}
                  alt={product.title}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  {product.badge_text && (
                    <span
                      className={`badge bg-${product.badge_color || "secondary"} mb-2`}
                    >
                      {product.badge_text}
                    </span>
                  )}
                  <h6 className="card-title">{product.title}</h6>
                  <p className="card-text text-muted mb-1">
                    <del>${product.old_price}</del>{" "}
                    <strong>${product.new_price}</strong>
                  </p>
                  <button
                    className={`btn btn-${product.btn_color || "primary"} btn-sm`}
                  >
                    {product.btn_text}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShoppingGrid;
