export interface Product {
  id: string;
  product_num: string;
  img: string;
  badge_color?: string;
  badge_text?: string;
  brand: string;
  title: string;
  description: string;
  quantity_per_case: string;
  new_price: number;
  old_price: number;
  btn_color?: string;
  btn_text: string;
  sub: string | string[];
}

export interface Subcategory {
  name: string;
  slug: string;
  products: Product[];
}

export interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}
