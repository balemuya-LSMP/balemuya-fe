// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/auth.api";
import { userProfileApi } from "./api/userProfile.api";
import { userApi } from "./api/user.api";
import { serviceApi } from "./api/services.api";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(apiSlice.middleware)
        .concat(userProfileApi.middleware)
        .concat(userApi.middleware)
        .concat(serviceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
