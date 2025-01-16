/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserResponse, User, loginState, loginResponse } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://balemuya-project.vercel.app/api/users' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserResponse, User>({
      query: (user) => {
        const { confirmPassword, ...userWithoutConfirmPassword } = user;
        return {
          url: '/auth/register/',
          method: 'POST',
          body: userWithoutConfirmPassword,
        };
      },
    }),
    loginUser: builder.mutation<loginResponse, loginState>({
      query: (user) => {
        return {
          url: '/auth/login/',
          method: 'POST',
          body: user,
        };
      },
    }),
    googleLogin: builder.mutation<loginResponse, { code: string; state: string }>({
      query: ({ code, state }) => ({
        url: '/auth/google-signin/',
        method: 'POST',
        body: { code, state },
      }),
    }),
    userProfile: builder.query<UserResponse, void>({
      query: () => '/profile/',
      
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGoogleLoginMutation} = apiSlice;
