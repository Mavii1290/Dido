import React from "react";
import { Product, Subcategory, Category } from "../../types";


type Props = {
  title?: string;
  products: Product[];
  excludeId?: string | string[];
  limit?: number;
};

const ProductGrid: React.FC<Props> = ({ title, products, excludeId, limit = 4 }) => {
  const filtered = excludeId
    ? products.filter(p => String(p.id) !== String(excludeId))
    : products;

  const displayProducts = filtered.slice(0, limit);

  if (displayProducts.length === 0) return null;

  return (
    <div className="mt-16">
      {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <div key={product.id} className="text-center">
            <img
              src={product.img}
              alt={product.title}
              className="h-40 w-auto mx-auto object-contain mb-2"
            />
            <h3 className="text-sm font-medium">{product.title}</h3>
            <p className="text-sm text-red-500">${product.new_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
