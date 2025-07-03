// import React from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import RootLayout from "@/components/common/layout/RootLayout";
// import ProductGrid from "@/components/common/ProductGrid";
// import shop_data from "../../data/shop_data.json";
// import { Product, Subcategory, Category } from "../../types";
// import Image from "next/image";




// // Flatten products from categories
// const flattenProducts = (): Product[] => {
//   const products: Product[] = [];
//   shop_data.forEach((category) => {
//     category.subcategories.forEach((subcat) => {
//       products.push(...subcat.products);
//     });
//   });
//   return products;
// };

// const ProductPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const products = flattenProducts();
//   const product = products.find((p) => String(p.id) === id);

//   if (!product) {
//     return (
//       <div className="max-w-6xl mx-auto py-10 px-4">
//         <h2 className="text-2xl font-bold mb-2">Product not found.</h2>
//         <p className="text-gray-600">Sorry, the product you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{product.title}</title>
//         <meta name="description" content={product.description} />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <RootLayout header="header1" footer="footer1">
//         <main className="max-w-6xl mx-auto py-10 px-4">
//           {/* Product Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 product-id">
//             {/* Product Image */}
//             <div className="">
//               <Image
//               priority
//                 src={product.img}
//                 alt={product.title}
//                 width={500}
//                     height={500}
//                     // style={{height: "500px", alignItems: "center"}}
//                 className="object-contain id-image"
//               />
//             </div>

//             {/* Product Info */}
//             <div className="text-center md:text-left">
//               <h1 className="text-3xl font-semibold">{product.brand}</h1>
//               <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
//               {/* <p className="text-lg text-red-500 font-medium mb-4">${product.new_price}</p> */}
//               <p className="text-gray-700 mb-6">{product.description}</p>
//               <p className="mb-6">{product.badge_text}</p>

//               {/* <div className="mb-4">
//                 <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
//                   Quantity
//                 </label>
//                 <input
//                   type="number"
//                   id="quantity"
//                   defaultValue={1}
//                   min={1}
//                   className="w-20 border rounded-md px-2 py-1 text-center"
//                 />
//               </div> */}

//               <p className="text-sm text-green-600 mb-4 font-medium">In Stock</p>
//  </div>
//               {/* <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
//                 Add to Cart
//               </button> */}
//             </div>


//           {/* Related Products */}
//           <div className="product-grid-body ">
//           <ProductGrid
//             title="Related Products"
//             products={products}
//             excludeId={id}
//             limit={4}
//           />
//           </div>
//         </main>
//       </RootLayout>
//     </>
//   );
// };

// export default ProductPage;

import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import ProductGrid from "@/components/common/ProductGrid";
import shop_data from "../../data/shop_data.json";
import { Product, Subcategory, Category } from "../../types";
import Image from "next/image";


// Flatten products from categories
const flattenProducts = (): Product[] => {
  const products: Product[] = [];
  shop_data.forEach((category) => {
    category.subcategories.forEach((subcat) => {
      products.push(...subcat.products);
    });
  });
  return products;
};

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const products = flattenProducts();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-2">Product not found.</h2>
        <p className="text-gray-600">Sorry, the product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootLayout header="header1" footer="footer1">
        <main className="max-w-6xl mx-auto py-10 px-4 product-id">
        <div className="justify-center items-center">
              <Image
              priority
                src={product.img}
                alt={product.title}
                width={500}
                    height={500}
                className="object-contain id-image "
              />
</div>
            {/* Product Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{product.brand}</h1>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <p className="mb-6">{product.badge_text}</p>

              <p className="text-sm text-green-600 mb-4 font-medium">In Stock</p>
 </div>


          {/* Related Products */}
          <div className="product-grid-body ">
          <ProductGrid
            title="Related Products"
            products={products}
            excludeId={id}
            limit={4}
          />
          </div>
        </main>
      </RootLayout>
    </>
  );
};

export default ProductPage;
