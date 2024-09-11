import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct, IProductFilters } from "../interface";
import { axiosBaseQuery } from ".";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery({
<<<<<<< HEAD
    baseUrl: "https://4e25aed7bbe24666.mokky.dev", // Sizning API bazaviy URLingiz
=======
    baseUrl: "https://4e25aed7bbe24666.mokky.dev/products", // Sizning API bazaviy URLingiz
>>>>>>> cd7cc13c6a9f3b8a0445c5ebfbd1c67f814af291
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
<<<<<<< HEAD
        url: "/products",
        method: "get",
      }),
    }),
    getProductById: builder.query({
      query: (id: string | number) => ({
        url: `/products/${id}`,
=======
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
>>>>>>> cd7cc13c6a9f3b8a0445c5ebfbd1c67f814af291
        method: "get",
      }),
    }),
    createProduct: builder.mutation({
      query: (newProduct: IProduct) => ({
<<<<<<< HEAD
        url: "/products",
=======
        url: "",
>>>>>>> cd7cc13c6a9f3b8a0445c5ebfbd1c67f814af291
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
<<<<<<< HEAD
        url: `/products/${id}`,
=======
        url: `/${id}`,
>>>>>>> cd7cc13c6a9f3b8a0445c5ebfbd1c67f814af291
        method: "patch",
        data: newProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string | number) => ({
<<<<<<< HEAD
        url: `/products/${id}`,
=======
        url: `/${id}`,
>>>>>>> cd7cc13c6a9f3b8a0445c5ebfbd1c67f814af291
        method: "delete",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
<<<<<<< HEAD
=======
  useGetProductsFilterQuery,
>>>>>>> cd7cc13c6a9f3b8a0445c5ebfbd1c67f814af291
  useGetProductByIdQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
} = productsApi;
