import { createApi } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../interface";
import { axiosBaseQuery } from ".";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://4e25aed7bbe24666.mokky.dev/categories", // Sizning API bazaviy URLingiz
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "",
        method: "get",
      }),
    }),
    getCategoryById: builder.query({
      query: (id: string | number) => ({
        url: `/${id}`,
        method: "get",
      }),
    }),
    createCategory: builder.mutation({
      query: (newCategory: ICategory) => ({
        url: "",
        method: "post",
        data: newCategory,
      }),
    }),
    editCategory: builder.mutation({
      query: ({
        id,
        newCategory,
      }: {
        id: string | number;
        newCategory: ICategory;
      }) => ({
        url: `/${id}`,
        method: "patch",
        data: newCategory,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: string | number) => ({
        url: `/${id}`,
        method: "delete",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
