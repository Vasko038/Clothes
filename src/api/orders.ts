import { createApi } from "@reduxjs/toolkit/query/react";
import { IOrder } from "../interface";
import { axiosBaseQuery } from ".";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "https://4e25aed7bbe24666.mokky.dev/orders",
	}),
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: () => ({
				url: "",
				method: "get",
			}),
		}),
		getOrderById: builder.query({
			query: (id: string | number) => ({
				url: `/${id}`,
				method: "get",
			}),
		}),
		getOrdersByUserId: builder.query({
			query: (id: string | number) => ({
				url: `?userId=${id}`,
				method: "get",
			}),
		}),
		getOrdersSearch: builder.query({
			query: (params: string) => ({
				url: `?${params}`,
				method: "get",
			})
		}),
		createOrder: builder.mutation({
			query: (newProduct: IOrder) => ({
				url: "",
				method: "post",
				data: newProduct,
			}),
		}),
		editOrder: builder.mutation({
			query: ({
				        id,
				        newProduct,
			        }: {
				id: string | number;
				newProduct: IOrder;
			}) => ({
				url: `/${id}`,
				method: "patch",
				data: newProduct,
			}),
		}),
		deleteOrder: builder.mutation({
			query: (id: string | number) => ({
				url: `/${id}`,
				method: "delete",
			}),
		}),
	}),
});

export const {
	useGetOrdersQuery,
	useGetOrdersByUserIdQuery,
	useGetOrdersSearchQuery,
	useGetOrderByIdQuery,
	useEditOrderMutation,
	useDeleteOrderMutation,
	useCreateOrderMutation,
} = ordersApi;