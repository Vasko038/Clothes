type IColor = "black" | "white" | "red" | "yellow";
type ISize = "S" | "M" | "L" | "X" | "XL";

export interface IProduct {
  id: number | string;
  title: string;
  price: number;
  categoryId: number | string;
  slug: string;
  sku: string;
  description: string;
  images: {
    color: IColor;
    image: string;
  }[];
  colors: {
    id: number | string;
    color: IColor;
    size: ISize;
    quantity: number;
  }[];
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

export interface ICategory {
  id: number | string;
  name: string;
}

export interface IProductFilters {
  categories: Array<string>;
  color: string;
  size: string;
  price: [number, number];
}
