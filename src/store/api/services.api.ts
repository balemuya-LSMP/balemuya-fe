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
  tagTypes: [
    "ServicePosts",
    "Applications",
    "Bookings",
    "Categories",
    "Notifications",
  ],
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
      { service_id: string; message: any }
    >({
      query: ({ service_id, message }) => ({
        url: `services/service-posts/applications/create/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ service_id, message }),
      }),
      invalidatesTags: ["Applications"],
    }),
    getApplicationforServicePost: builder.query<any, string>({
      query: (id) => `services/service-posts/customer/${id}/applications/`,
      providesTags: ["Applications"],
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
    getNotifications: builder.query<any, void>({
      query: () => "notifications/ ",
      providesTags: ["Notifications"],
    }),
    readNotification: builder.mutation<any, string>({
      query: (id) => ({
        url: `notifications/${id}/read/`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
    readNotifications: builder.mutation<any, void>({
      query: () => ({
        url: `notifications/all/read/`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
    acceptApplication: builder.mutation<any, string>({
      query: (id) => ({
        url: `services/service-posts/applications/${id}/accept/`,
        method: "POST",
      }),
      invalidatesTags: ["Applications"],
    }),
    professionalAcceptRequest: builder.mutation<any, string>({
      query: (id) => ({
        url: `/users/professional/service-requests/${id}/accept/`,
        method: "PUT",
      }),
      invalidatesTags: ["ServicePosts"],
    }),
    professionalRejectRequest: builder.mutation<any, string>({
      query: (id) => ({
        url: `/users/professional/service-requests/${id}/reject/`,
        method: "PUT",
      }),
      invalidatesTags: ["ServicePosts"],
    }),
    getServices: builder.query<any, string | undefined>({
      query: (query) =>
        query
          ? `users/professional/services/?status=${query}`
          : `users/professional/services/`,
    }),
    reviewService: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `services/bookings/review/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    giveComplaint: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `services/bookings/complain/create/`,
        method: "POST",
        body: data,
      }),
    }),
    getCustomerServices: builder.query<any, string | undefined>({
      query: (query) =>
        query
          ? `users/customer/services/?status=${query}`
          : `users/customer/services/`,
      providesTags: ["ServicePosts"],
    }),
    cancelBooking: builder.mutation<any, string>({
      query: (id) => ({
        url: `services/service-bookings/${id}/cancel/`,
        method: "POST",
      }),
    }),
    completeBooking: builder.mutation<any, string>({
      query: (id) => ({
        url: `services/service-bookings/${id}/complete/`,
        method: "POST",
      }),
    }),
    requestProfessionalService: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `users/customer/service-request/`,
        method: "POST",
        body: data,
      }),
    }),
    getRequestedServices: builder.query<any, string | undefined>({
      query: (query) =>
        query && query !== ""
          ? `/users/professional/service-requests/?status=${query}`
          : `/users/professional/service-requests/`,
      providesTags: ["ServicePosts"],
    }),
    searchServices: builder.query<any, string>({
      query: (query) => `/users/professional/service/search/?q=${query}`,
      providesTags: ["ServicePosts"],
    }),
    serviceFilter: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `users/professional/service/filter/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServicePosts"],
    }),
    searchProfessionals: builder.query<any, string>({
      query: (query) => `users/customer/search-professional/?q=${query}`,
    }),
    reportService: builder.mutation<any, {id:string, reason: string }>({
      query: ({ id, reason }) => ({
        url: `services/service-posts/${id}/report/`,
        method: "POST",
        body: {reason},
      }),
      invalidatesTags: ["ServicePosts"],
    }),
     getMyRequestServices: builder.query<any, string | undefined>({
      query: (query) =>
        query && query !== ""
          ? `/users/customer/service-request/?status=${query}`
          : `users/customer/service-request/`,
      providesTags: ["ServicePosts"],
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
  useGetNotificationsQuery,
  useReadNotificationMutation,
  useReadNotificationsMutation,
  useGetApplicationforServicePostQuery,
  useAcceptApplicationMutation,
  useGetServicesQuery,
  useReviewServiceMutation,
  useGiveComplaintMutation,
  useGetCustomerServicesQuery,
  useCancelBookingMutation,
  useCompleteBookingMutation,
  useRequestProfessionalServiceMutation,
  useGetRequestedServicesQuery,
  useSearchServicesQuery,
  useServiceFilterMutation,
  useSearchProfessionalsQuery,
  useProfessionalAcceptRequestMutation,
  useProfessionalRejectRequestMutation,
  useReportServiceMutation,
  useGetMyRequestServicesQuery,
} = serviceApi;
