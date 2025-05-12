import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin, vendorLogin } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refresh",
        method: "GET",
        credentials: "include",
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const results = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: results.data.accessToken,
              user: results.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    loadShop: builder.query({
      query: () => ({
        url: "load-shop",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const results = await queryFulfilled;
          dispatch(
            vendorLogin({
              accessToken: results.data.accessToken,
              shop: results.data.seller,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery, useLoadShopQuery } =
  apiSlice;
