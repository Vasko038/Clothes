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
