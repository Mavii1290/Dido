import { Category, Product } from "@/types";

export const filterProductsBySubcategory = (
  data: Category[],
  subSlug: string
): Product[] => {
  const normalizedSlug = subSlug.toLowerCase();

  const matchedProducts: Product[] = [];

  data.forEach((category) => {
    category.subcategories.forEach((sub) => {
      (sub.products || []).forEach((product) => {
        const productSub = product.sub;

        if (Array.isArray(productSub)) {
          if (productSub.map(s => s.toLowerCase()).includes(normalizedSlug)) {
            matchedProducts.push(product);
          }
        } else if (
          typeof productSub === "string" &&
          productSub.toLowerCase() === normalizedSlug
        ) {
          matchedProducts.push(product);
        }
      });
    });
  });

  return matchedProducts;
};


export const flattenAllProducts = (data: Category[]): Product[] => {
  return data.flatMap((category) =>
    category.subcategories.flatMap((sub) => sub.products || [])
  );
};