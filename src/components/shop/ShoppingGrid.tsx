import React, { useState } from "react";
import shop_data from "../../data/shop_data.json";
import ProductCard, { Product } from "./ProductCard";

const flattenProducts = (): Product[] => {
  const products: Product[] = [];
  shop_data.forEach((category) => {
    category.subcategories.forEach((subcat) => {
      products.push(...subcat.products);
    });
  });
  return products;
};

const ShoppingGrid: React.FC = () => {
  const [itemsToShow, setItemsToShow] = useState<number | "all">(12);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const allProducts = flattenProducts();
  const displayedProducts =
    itemsToShow === "all" ? allProducts : allProducts.slice(0, itemsToShow);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setItemsToShow(value === "all" ? "all" : parseInt(value));
  };

  return (
    <section className="py-4">
      <div className="container shop-grid">
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

        <div className="row g-4">
          {displayedProducts.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShoppingGrid;
