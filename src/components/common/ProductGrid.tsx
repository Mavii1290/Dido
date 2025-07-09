import React from "react";
import { Product, Subcategory, Category } from "../../types";
import Image from "next/image";


type Props = {
  brand?: string;
  title?: string;
  products: Product[];
  excludeId?: string | string[];
  limit?: number;
};

const ProductGrid: React.FC<Props> = ({ brand, title, products, excludeId, limit = 4 }) => {
  const filtered = excludeId
    ? products.filter(p => String(p.id) !== String(excludeId))
    : products;

  const displayProducts = filtered.slice(0, limit);

  if (displayProducts.length === 0) return null;

  return (
    <div className="container">
      {title && <h2 className="text-2xl font-semibold ">{title}</h2>}
      <div className="product-grid">
        {displayProducts.map((product) => (
          <div key={product.id}>
            <Image
              src={product.img}
              alt={product.title}
              className="mx-auto mb-2"
              width={200}
              height={150}
              style={{ height: "250px", objectFit: "contain" }}
            />
             <h3 className="text-sm font-medium">{product.brand}</h3>
            <h3 className="text-sm font-medium">{product.title}</h3>
          </div>
        ))}
      </div>
      </div>
  );
};

export default ProductGrid;
