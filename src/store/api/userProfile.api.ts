/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserResponse } from "../types";

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://balemuya-project.vercel.app/api/users",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["UserProfile"], 
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => "/profile/",
      providesTags: ["UserProfile"], 
    }),

    updateProfile: builder.mutation<UserResponse, { updated: Record<string, any> }>({
      query: ({ updated }) => ({
        url: `/profile/update/`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation } = userProfileApi;
