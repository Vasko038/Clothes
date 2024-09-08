import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../api";

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer, // API reduktorini qo'shish
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware), // API middleware qo'shish
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
