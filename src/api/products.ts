import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../interface";
import { axiosBaseQuery } from ".";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "https://4e25aed7bbe24666.mokky.dev", // Sizning API bazaviy URLingiz
	}),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: "/products",
				method: "get",
			}),
		}),
		getProductById: builder.query({
			query: (id: string | number) => ({
				url: `/products/${id}`,
				method: "get",
			}),
		}),
		createProduct: builder.mutation({
			query: (newProduct: IProduct) => ({
				url: "/products",
				method: "post",
				data: newProduct,
			}),
		}),
		editProduct: builder.mutation({
			query: ({
				id,
				newProduct,
			}: {
				id: string | number;
				newProduct: IProduct;
			}) => ({
				url: `/products/${id}`,
				method: "patch",
				data: newProduct,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (id: string | number) => ({
				url: `/products/${id}`,
				method: "delete",
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useEditProductMutation,
	useDeleteProductMutation,
	useCreateProductMutation,
} = productsApi;
