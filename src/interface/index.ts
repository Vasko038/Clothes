type IColor = "black" | "white" | "red" | "yellow";
type ISize = "S" | "M" | "L" | "X" | "XL";

export interface IProduct {
  id: number | string;
  title: string;
  stock: boolean;
  price: number;
  quantity: number;
  categoryId: number | string;
  img: string;
  slug: string;
  sku: string;
  colors: { color: IColor }[];
  sizes: { size: ISize }[];
  description: string;
}

export interface IOrder {
  id: number | string;
  userId: number | string;
  date: string;
  status: "Processing" | "Completed";
  items: {
    productId: number | string;
    count: number;
    price: number;
    color: IColor;
    size: ISize;
  }[];
}

export interface IUser {
  id?: number | string;
  password?: string;
  fullname?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  role?: "user" | "admin";
}

export interface IWishlist {
  id?: number | string;
  userId: number | string;
  productId: number | string;
}

export interface ICategoty {
  id: number | string;
  name: string;
}

export interface IProductFilters {
  categories: Array<string>;
  color: string;
  size: string;
  price: [number, number];
}

export interface product {
  id: number | string;
  title: string;
  description: string;
  price: number;
  categoryId: number | string;
  slug: string;
  sku: string;
  variants: {
    id: number | string;
    color: IColor;
    size: ISize;
    count: number;
    image: string;
  }[];
}
