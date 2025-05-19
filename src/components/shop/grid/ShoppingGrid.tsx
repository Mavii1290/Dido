import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../details/ProductCard";
import { Product } from "../details/ProductCard";

interface Props {
  products: Product[];
}

const ShoppingGrid: React.FC<Props> = ({ products }) => {
  const router = useRouter();
  const [itemsToShow, setItemsToShow] = useState<number>(12);

  // Reset itemsToShow when filtered products change
  useEffect(() => {
    setItemsToShow(12);
  }, []);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setItemsToShow(value === "12" ? products.length : parseInt(value));
  };

  const displayedProducts = products.slice(0, itemsToShow);

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
            value={itemsToShow > products.length ? "all" : itemsToShow}
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
      </div>
    </section>
  );
};

export default ShoppingGrid;
