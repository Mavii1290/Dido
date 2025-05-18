import { Category, Product } from "@/types";

export const flattenAllProducts = (data: Category[]): Product[] => {
  return data.flatMap((category) =>
    category.subcategories.flatMap((sub) => sub.products)
  );
};

export const filterProductsBySubcategory = (
  products: Product[],
  subSlug: string
): Product[] => {
  return products.filter((product) => product.sub === subSlug);
};

export const getSubcategoryName = (
  data: Category[],
  subSlug: string
): string | null => {
  for (const category of data) {
    const sub = category.subcategories.find((s) => s.slug === subSlug);
    if (sub) return sub.name;
  }
  return null;
};
