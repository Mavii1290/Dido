import React, { useState } from "react";
import CategoryMenu from "./CategoryMenu";
import shopData from "../../../data/shop_data.json";
import { Subcategory, Product } from "../../../types";

const ShopCategory: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleSubcategorySelect = (sub: Subcategory) => {
    setSelectedProducts(sub.products);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <CategoryMenu data={shopData} onSelect={handleSubcategorySelect} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {selectedProducts.map((product) => (
          <div key={product.id} className="border p-2 rounded shadow">
            <img src={product.img} alt={product.title} />
            <h3 className="font-bold">{product.title}</h3>
            <p>{product.description}</p>
            <p className="text-green-600">${product.new_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
