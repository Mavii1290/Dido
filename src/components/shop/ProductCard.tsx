import React from "react";

export interface Product {
  id: number;
  img: string;
  badge_color?: string;
  badge_text?: string;
  title: string;
  description: string;
  new_price: number;
  old_price: number;
  btn_color?: string;
  btn_text: string;
  sub: string;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="card h-100 text-center"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={product.img}
        alt={product.title}
        className="card-img-top"
        style={{ height: "150px", objectFit: "contain" }}
      />
      <div className="card-body">
        {product.badge_text && (
          <span className={`badge bg-${product.badge_color || "secondary"} mb-2`}>
            {product.badge_text}
          </span>
        )}
        <h6 className="card-title">{product.title}</h6>
        <p className="card-text text-muted mb-1">
          <del>${product.old_price}</del> <strong>${product.new_price}</strong>
        </p>
        <button className={`btn btn-${product.btn_color || "primary"} btn-sm`}>
          {product.btn_text}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
