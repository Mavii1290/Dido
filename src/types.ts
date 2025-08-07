export interface Product {
  id: string;
  item_num: string;
  img: string;
  badge_color?: string;
  size?: string;
  brand: string;
  product: string;
  description: string;
  per_case: string;
  price: number;
  cost: number;
  btn_color?: string;
  preorder: string;
  sub: string | string[];
}



export interface Subcategory {
  name: string;
  slug: string;
  products: Product[];
}

export interface Category 
 {
      catagory: string;
      slug: string;
      subcategories: Subcategory[];
      products: Product[];
    };

export interface NavItem {
  nav_name: string;
  name: string;
  link: string;
}