/* eslint-disable @typescript-eslint/no-unused-vars */
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
    updateProfessional: builder.mutation<UserResponse, { updated: Record<string, any> }>({
      query: ({ updated }) => ({
        url: `/professional/profile/update/`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    createAddress: builder.mutation<UserResponse, { addresses: Record<string, any> }>({
      query: ({ addresses }) => ({
        url: `/profile/address/create/`,
        method: "POST",
        body: addresses,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateAddress: builder.mutation<UserResponse, {id: string, addresses: Record<string, any> }>({
      query: ({id, addresses }) => ({
        url: `/profile/address/${id}/`,
        method: "PUT",
        body: addresses,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    createSkills: builder.mutation<UserResponse, { skills: Record<string, any> }>({
      query: ({ skills }) => ({
        url: `/professional/profile/skills/`,
        method: "POST",
        body: skills,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deleteSkills: builder.mutation<UserResponse, {skills: Record<string, any> }>({
      query: ({skills }) => ({
        url: `/professional/profile/skills/`,
        method: "DELETE",
        body: skills,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    addCategory: builder.mutation<UserResponse, { category: Record<string, any> }>({
      query: ({ category }) => ({
        url: `/profile/categories/`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    removeCategory: builder.mutation<UserResponse, { category: Record<string, any> }>({
      query: ({ category }: { category: Record<string, any> }) => ({
        url: `/profile/categories/`,
        method: "DELETE",
        body: category,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    addCertification: builder.mutation<UserResponse, { certification: Record<string, any> }>({
      query: ({ certification }) => ({
        url: `/professional/profile/certificates/add/`,
        method: "POST",
        body: certification,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    removeCertification: builder.mutation<UserResponse, {id:string}>({
      query: ({id}) => ({
        url: `/professional/profile/certificates/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateCertification: builder.mutation<UserResponse, {id:string, certification: Record<string, any> }>({
      query: ({id, certification }) => ({
        url: `/professional/profile/certificates/${id}/update/`,
        method: "PUT",
        body: certification,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    addPortifolio: builder.mutation<UserResponse, { portifolio: Record<string, any> }>({
      query: ({ portifolio }) => ({
        url: `/professional/profile/portfolios/add/`,
        method: "POST",
        body: portifolio,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updatePortifolio: builder.mutation<UserResponse, {id:string, portifolio: Record<string, any> }>({
      query: ({id, portifolio }) => ({
        url: `/professional/profile/portfolios/${id}/update/`,
        method: "PUT",
        body: portifolio,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deletePortifolio: builder.mutation<UserResponse, {id:string}>({
      query: ({id }) => ({
        url: `/professional/profile/portfolios/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserProfile"],
    }),
    addEducations: builder.mutation<UserResponse, {educations: Record<string, any> }>({
      query: ({educations }) => ({
        url: `/professional/profile/educations/add/`,
        method: "POST",
        body: educations,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateEducations: builder.mutation<UserResponse, {id:string, educations: Record<string, any> }>({
      query: ({id, educations }) => ({
        url: `/professional/profile/educations/${id}/update/`,
        method: "PUT",
        body: educations,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deleteEducations: builder.mutation<UserResponse, {id:string}>({
      query: ({id}) => ({
        url: `/professional/profile/educations/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const { 
  useUserProfileQuery, 
  useUpdateProfileMutation, 
  useUpdateProfessionalMutation,
  useCreateAddressMutation, 
  useUpdateAddressMutation, 
  useCreateSkillsMutation, 
  useDeleteSkillsMutation, 
  useAddCategoryMutation, 
  useRemoveCategoryMutation, 
  useAddCertificationMutation, 
  useRemoveCertificationMutation, 
  useUpdateCertificationMutation, 
  useAddPortifolioMutation, 
  useUpdatePortifolioMutation, 
  useDeletePortifolioMutation, 
  useAddEducationsMutation, 
  useUpdateEducationsMutation, 
  useDeleteEducationsMutation
 } = userProfileApi;
