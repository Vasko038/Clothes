import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser } from "../interface";
import { axiosBaseQuery } from ".";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://4e25aed7bbe24666.mokky.dev/users",
  }),
  endpoints: (builder) => ({
    getUsersOnly: builder.query({
      query: () => ({
        url: `?role=user`,
        method: "get",
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, data }: { id: string | number; data: IUser }) => ({
        url: `/${id}`,
        method: "patch",
        data: data,
      }),
    }),
  }),
});

export const { useGetUsersOnlyQuery, useEditUserMutation } = usersApi;
