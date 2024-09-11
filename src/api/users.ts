import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser } from "../interface";
import { axiosBaseQuery } from ".";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://4e25aed7bbe24666.mokky.dev",
  }),
  endpoints: (builder) => ({
    getUsersOnly: builder.query({
      query: () => ({
        url: `/users?role=user`,
        method: "get",
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, data }: { id: string | number; data: IUser }) => ({
        url: `/users/${id}`,
        method: "patch",
        data: data,
      }),
    }),
    addUser: builder.mutation({
      query: (newUser: IUser) => ({
        url: `/register`,
        method: "post",
        data: newUser,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetUsersOnlyQuery, useEditUserMutation, useAddUserMutation } =
  usersApi;
