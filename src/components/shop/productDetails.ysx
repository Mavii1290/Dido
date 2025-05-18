// components/shop/ProductDetails.js
import React from "react";

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="product-details-overlay" onClick={onClose}>
      <div className="product-details-card" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close float-end" onClick={onClose}></button>
        <img
          src={product.img}
          alt={product.title}
          className="img-fluid mb-3"
          style={{ maxHeight: "250px", objectFit: "contain" }}
        />
        <h5>{product.title}</h5>
        <p>
          <del>${product.old_price}</del>{" "}
          <strong>${product.new_price}</strong>
        </p>
        <p>{product.description || "No description available."}</p>
        <button className={`btn btn-${product.btn_color || "primary"}`}>
          {product.btn_text || "Add to Cart"}
        </button>
      </div>

      <style jsx>{`
        .product-details-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .product-details-card {
          background: #fff;
          padding: 2rem;
          border-radius: 0.5rem;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
