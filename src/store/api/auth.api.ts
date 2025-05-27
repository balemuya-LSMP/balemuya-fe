/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserResponse, User, loginState, loginResponse } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://balemuya-project.onrender.com/api/users",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserResponse, User>({
      query: (user) => {
        const { confirmPassword, ...userWithoutConfirmPassword } = user;
        return {
          url: "/auth/register/",
          method: "POST",
          body: userWithoutConfirmPassword,
        };
      },
    }),
    loginUser: builder.mutation<loginResponse, loginState>({
      query: (user) => {
        return {
          url: "/auth/login/",
          method: "POST",
          body: user,
        };
      },
    }),
    googleLogin: builder.mutation<loginResponse, { code: string, redirect_uri:string }>({
      query: ({ code,redirect_uri }) => ({
        url: `/auth/continue-with-google/`,
        method: "POST",
        body: { code, redirect_uri },
      }),
    }),
    googleSignup: builder.mutation<
      loginResponse,
      { code: string; redirect_uri: string; entity_type: string; user_type: string }
    >({
      query: ({ code,redirect_uri, entity_type, user_type }) => ({
        url: `/auth/continue-with-google/`,
        method: "POST",
        body: {
          code,
          redirect_uri,
          entity_type,
          user_type,
        },
      }),
    }),
    logoutUser: builder.mutation<null, string>({
      query: (token) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: "/auth/logout/",
        method: "POST",
      }),
    }),
    getFeedback: builder.query<any, void>({
      query: () => ({
        url: "/feedbacks/ ",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGoogleLoginMutation,
  useLogoutUserMutation,
  useGoogleSignupMutation,
  useGetFeedbackQuery
} = apiSlice;
