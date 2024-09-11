import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from ".";

interface AuthResponse {
  token: string;
  data: {
    role: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://4e25aed7bbe24666.mokky.dev",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (data) => ({
        url: "/auth",
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
