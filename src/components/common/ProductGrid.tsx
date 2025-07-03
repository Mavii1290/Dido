// import React from "react";
// import { Product, Subcategory, Category } from "../../types";
// import Image from "next/image";


// type Props = {
//   title?: string;
//   products: Product[];
//   excludeId?: string | string[];
//   limit?: number;
// };

// const ProductGrid: React.FC<Props> = ({ title, products, excludeId, limit = 4 }) => {
//   const filtered = excludeId
//     ? products.filter(p => String(p.id) !== String(excludeId))
//     : products;

//   const displayProducts = filtered.slice(0, limit);

//   if (displayProducts.length === 0) return null;

//   return (
//     <div className="product-grid-body">
//       {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
//       <div className="product-grid  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//         {displayProducts.map((product) => (
//           <div key={product.id} className="text-center flex flex-row !flex-nowrap">
//             <Image
//               src={product.img}
//               alt={product.title}
//               className="h-40 w-auto mx-auto object-contain mb-2"
//               width={200}
//               height={150}
//             />
//             <h3 className="text-sm font-medium">{product.title}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;

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
