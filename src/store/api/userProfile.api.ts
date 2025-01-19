import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserResponse } from "../types";

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
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => "/profile/",
    }),
  updateProfile: builder.mutation<UserResponse, User>({
    query: (user) => {
      return {
        url: "/profile/update/",
        method: "PATCH",
        body: user,
      };
    }
  })
  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation} = userProfileApi;
