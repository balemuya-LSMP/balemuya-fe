import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://balemuya-project.vercel.app/api/users/",
  }),
  endpoints: (builder) => ({
    listProfessionals: builder.query({
      query: (status) => {
        const params = status ? `?status=${status}` : "";
        return `professionals/${params}`;
      },
    }),
    listCustomers: builder.query({
      query: (status) => {
        const params = status ? `?status=${status}` : "";
        return `customers/${params}`;
      },
    }),
    listAdmins: builder.query({
      query: (status) => {
        const params = status ? `?status=${status}` : "";
        return `admins/${params}`;
      },
    }),
  }),
});

export const {
  useListProfessionalsQuery,
  useListCustomersQuery,
  useListAdminsQuery,
} = userApi;
