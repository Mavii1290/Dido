import { Category, Product } from "@/types";

export const filterProductsBySubcategory = (
  data: Category[],
  subSlug: string
): Product[] => {
  const normalizedSlug = subSlug.toLowerCase();
  const matchedProducts: Product[] = [];

  data.forEach((category) => {
    category.subcategories.forEach((sub) => {
      if (sub.slug && sub.slug.toLowerCase() === normalizedSlug) {
        matchedProducts.push(...(sub.products || []));
      }
    });
  });

  return matchedProducts;
};


export const flattenAllProducts = (data: Category[]): Product[] => {
  return data.flatMap((category) =>
    category.subcategories.flatMap((sub) => sub.products || [])
  );
};