import React from "react";
import { Product, Subcategory, Category } from "../../../types";
import Image from "next/image"; 




interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="card h-100 text-center card-outline"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Image
        src={product.img}
        alt={product.title}
        className="card-img-top"
        width={200}
        height={150}
        style={{ height: "150px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h6 className="card-title product-title">{product.brand}</h6>
        <h6 className="card-title product-title">{product.title}</h6>
        {product.badge_text && (
          <span className={`badge-text mb-2`}>
            {product.badge_text}
          </span>
        )}
        
        {/* <p className="card-text text-muted mb-1">
          <del>${product.old_price}</del> <strong>${product.new_price}</strong>
        </p>
        <button className={`btn btn-${product.btn_color || "primary"} btn-sm`}>
          {product.btn_text}
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
