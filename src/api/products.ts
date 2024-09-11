import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct, IProductFilters } from "../interface";
import { axiosBaseQuery } from ".";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://4e25aed7bbe24666.mokky.dev/products", // Sizning API bazaviy URLingiz
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "",
        method: "get",
      }),
    }),
    getProductsFilter: builder.query({
      query: ({ params, page }: { params: IProductFilters; page: number }) => {
        const queryParts: string[] = [];

        if (params.categories && params.categories.length > 0) {
          queryParts.push(
            params.categories.map((c) => `categoryId[]=${c}`).join("&"),
          );
        }

        if (params.price && params.price.length === 2) {
          queryParts.push(
            `price[from]=${params.price[0]}&price[to]=${params.price[1]}`,
          );
        }

        return {
          url: `?${queryParts.join("&")}&page=${page}&limit=9`,
          method: "get",
        };
      },
    }),

    getProductById: builder.query({
      query: (id: string | number) => ({
        url: `/${id}`,
        method: "get",
      }),
    }),
    createProduct: builder.mutation({
      query: (newProduct: IProduct) => ({
        url: "",
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
        url: `/${id}`,
        method: "patch",
        data: newProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string | number) => ({
        url: `/${id}`,
        method: "delete",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsFilterQuery,
  useGetProductByIdQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
} = productsApi;
