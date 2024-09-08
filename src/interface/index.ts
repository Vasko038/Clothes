type IColor = "black" | "white" | "red" | "yellow";
type ISize = "S" | "M" | "L" | "X" | "XL" | "XXL";

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
	colors: IColor[];
	sizes: ISize[];
	description: string;
}

export interface IOrder {
	id: number | string;
	userId: number | string,
	date: string,
	status: "Processing" | "Completed",
	items: {
		productId: number | string,
		count: number,
		price: number,
		color: IColor,
		size: ISize
		}[]
}

export interface IUser {
	id?: number | string,
	fullname?: string,
	email?: string,
	street?: string,
	city?: string,
	state?: string,
	zip?: string,
	country?: string,
	role?: "user" | "admin",
}
