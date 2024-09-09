import { createApi } from "@reduxjs/toolkit/query/react";
import { IWishlist} from "../interface";
import { axiosBaseQuery } from ".";

export const wishlistApi = createApi({
	reducerPath: "wishlistApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "https://4e25aed7bbe24666.mokky.dev/wishlist",
	}),
	endpoints: (builder) => ({
		getWishlistByUserId: builder.query({
			query: (id: string | number) => ({
				url: `?userId=${id}`,
				method: "get",
			}),
		}),
		createWishlist: builder.mutation({
			query: (newProduct: IWishlist) => ({
				url: "",
				method: "post",
				data: newProduct,
			}),
		}),
		deleteWishlist: builder.mutation({
			query: (id: string | number) => ({
				url: `/${id}`,
				method: "delete",
			}),
		}),
	}),
});

export const {
	useGetWishlistByUserIdQuery,
	useCreateWishlistMutation,
	useDeleteWishlistMutation
} = wishlistApi;