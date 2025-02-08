/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WorkPost, WorkPostResponse } from "../types";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://balemuya-project.onrender.com/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ServicePosts", "Applications", "Bookings"],
  endpoints: (builder) => ({
    getServicePosts: builder.query<any, any>({
      query: () => "services/service-posts/",
      providesTags: ["ServicePosts"],
    }),
    createServicePost: builder.mutation<WorkPostResponse, WorkPost>({
      query: (newPost) => ({
        url: "services/service-posts/",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["ServicePosts"],
    }),

    getServicePostById: builder.query<any, string>({
      query: (id) => `services/service-posts/${id}/`,
      providesTags: ["ServicePosts"],
    }),
    updateServicePost: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `services/service-posts/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ServicePosts"],
    }),
    deleteServicePost: builder.mutation<any, string>({
      query: (id) => ({
        url: `services/service-posts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServicePosts"],
    }),

    getServicePostApplications: builder.query<any, string>({
      query: (servicePostId) =>
        `services/service-posts/${servicePostId}/applications/`,
      providesTags: ["Applications"],
    }),
    createApplication: builder.mutation<
      any,
      { servicePostId: string; data: any }
    >({
      query: ({ servicePostId, data }) => ({
        url: `services/service-posts/${servicePostId}/applications/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),

    getApplicationById: builder.query<any, string>({
      query: (id) => `services/applications/${id}/`,
      providesTags: ["Applications"],
    }),
    updateApplication: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `services/applications/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),
    deleteApplication: builder.mutation<any, string>({
      query: (id) => ({
        url: `services/applications/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applications"],
    }),

    getBookings: builder.query<any, void>({
      query: () => "services/bookings/",
      providesTags: ["Bookings"],
    }),
    createBooking: builder.mutation<any, any>({
      query: (newBooking) => ({
        url: "services/bookings/",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Bookings"],
    }),

    getBookingById: builder.query<any, string>({
      query: (id) => `services/bookings/${id}/`,
      providesTags: ["Bookings"],
    }),
    updateBooking: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `services/bookings/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    deleteBooking: builder.mutation<any, string>({
      query: (id) => ({
        url: `services/bookings/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
    getCategories: builder.query<any, void>({
      query: () => "services/categories/",
    }),
  }),
});

export const {
  useGetServicePostsQuery,
  useCreateServicePostMutation,
  useGetServicePostByIdQuery,
  useUpdateServicePostMutation,
  useDeleteServicePostMutation,
  useGetServicePostApplicationsQuery,
  useCreateApplicationMutation,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
  useGetBookingsQuery,
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetCategoriesQuery,
} = serviceApi;
