/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProfessionalRequest } from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://balemuya-project.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Professionals", "Customers", "Admins"],
  endpoints: (builder) => ({
    listProfessionals: builder.query({
      query: (status) => {
        const params = status ? `?status=${status}` : "";
        return `/admin/professionals/${params}`;
      },
      providesTags: ["Professionals"],
    }),
    listCustomers: builder.query({
      query: (status) => {
        const params = status ? `?status=${status}` : "";
        return `/admin/customers/${params}`;
      },
      providesTags: ["Customers"],
    }),
    listAdmins: builder.query({
      query: (status) => {
        const params = status ? `?status=${status}` : "";
        return `/admin/admins/${params}`;
      },
      providesTags: ["Admins"],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}/`,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Professionals", "Customers", "Admins"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/block/`,
        method: "PUT",
      }),
      invalidatesTags: ["Professionals", "Customers", "Admins"],
    }),
    listRequests: builder.query({
      query: () => "/admin/professional/verification/requests/",
    }),
    verifyUser: builder.mutation<
      ProfessionalRequest,
      { id: string; adminReviews: Record<string, any> }
    >({
      query: ({ id, adminReviews }) => ({
        url: `/admin/professionals/${id}/verify/`,
        method: "PUT",
        body: adminReviews,
      }),
      invalidatesTags: ["Professionals"],
    }),
    getNearByProfessionals: builder.query({
      query: () => `/users/customer/nearby-professionals/`,
    }),
    getNearByProfessionalsByCategory: builder.query({
      query: (category) => `/users/customer/nearby-professional/?category=${category}`,
    }),
    getProfessionalById: builder.query({
      query: (id) => `/users/professional/${id}/profile/`,
    }),
    getCustomerById: builder.query({
      query: (id) => `/users/customer/${id}/profile/`,
    }),
  }),
});

export const {
  useListProfessionalsQuery,
  useListCustomersQuery,
  useListAdminsQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
  useVerifyUserMutation,
  useListRequestsQuery,
  useGetNearByProfessionalsQuery,
  useGetNearByProfessionalsByCategoryQuery,
  useGetProfessionalByIdQuery,
  useGetCustomerByIdQuery,
} = userApi;
