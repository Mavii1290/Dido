import React from 'react';
import products from './products.json';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#FFF7ED] rounded-lg p-4 flex flex-col items-center text-center">
      <img src={product.image} alt={product.name} className="h-48 object-contain mb-4" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">{product.price}</p>
    </div>
  );
};

const ShoppingGrid = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingGrid;