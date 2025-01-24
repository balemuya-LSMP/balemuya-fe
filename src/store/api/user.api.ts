import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://balemuya-project.vercel.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    listProfessionals: builder.query({
      query: (status) => {
        const params = status ? `?status=${status}` : "";
        return `/admin/professionals/${params}`;
      },
    }),
    listCustomers: builder.query({
      query: (status) => {
        const params = status ? `?status=${status}` : "";
        return `/admin/customers/${params}`;
      },
    }),
    listAdmins: builder.query({
      query: (status) => {
        const params = status ? `?status=${status}` : "";
        return `/admin/admins/${params}`;
      },
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/delete`,
        method: "DELETE",
      }),
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/users/profile/${id}/block/`,
        method: "POST",
      }),
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
} = userApi;
