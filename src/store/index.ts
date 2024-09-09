import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../api/products";
import { authApi } from "../api/auth";
import { ordersApi } from "../api/orders.ts";
import { wishlistApi } from "../api/wishlist.ts";
import { usersApi } from "../api/users.ts";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authApi.middleware)
      .concat(ordersApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
