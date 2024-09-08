import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../api/products";
import { authApi } from "../api/auth";

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(productsApi.middleware)
			.concat(authApi.middleware), // API middleware qo'shish
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
