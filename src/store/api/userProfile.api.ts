/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PaymentResponse,
  PaymentStatusResponse,
  SubscriptionPayload,
  UserResponse,
} from "../types";

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://balemuya-project.onrender.com/api/users",
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
    updateProfile: builder.mutation<
      UserResponse,
      { updated: Record<string, any> }
    >({
      query: ({ updated }) => ({
        url: `/profile/update/`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    addAddresses: builder.mutation<
      UserResponse,
      { address: Record<string, any> }
    >({
      query: ({ address }) => ({
        url: `/profile/address/`,
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateAddresses: builder.mutation<
      UserResponse,
      {  address: Record<string, any> }
    >({
      query: ({ address }) => ({
        url: `/profile/address/`,
        method: "PUT",
        body: address,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    removeAddresses: builder.mutation<any, void>({
      query: () => ({
        url: `/profile/address/`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserProfile"],
    }),

    addCertificates: builder.mutation<
      UserResponse,
      { certificates: Record<string, any> }
    >({
      query: ({ certificates }) => ({
        url: `/professional/profile/certificates/add/`,
        method: "POST",
        body: certificates,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateCertificates: builder.mutation<
      UserResponse,
      { id: string; certificates: Record<string, any> }
    >({
      query: ({ id, certificates }) => ({
        url: `/professional/profile/certificates/${id}/update/`,
        method: "PUT",
        body: certificates,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deleteCertificates: builder.mutation<UserResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/professional/profile/certificates/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserProfile"],
    }),
    addEducations: builder.mutation<
      UserResponse,
      { educations: Record<string, any> }
    >({
      query: ({ educations }) => ({
        url: `/professional/profile/educations/add/`,
        method: "POST",
        body: educations,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateEducations: builder.mutation<
      UserResponse,
      { id: string; educations: Record<string, any> }
    >({
      query: ({ id, educations }) => ({
        url: `/professional/profile/educations/${id}/update/`,
        method: "PUT",
        body: educations,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deleteEducations: builder.mutation<UserResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/professional/profile/educations/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserProfile"],
    }),
    addPortifolios: builder.mutation<
      UserResponse,
      { portifolios: Record<string, any> }
    >({
      query: ({ portifolios }) => ({
        url: `/professional/profile/portfolios/add/`,
        method: "POST",
        body: portifolios,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updatePortifolios: builder.mutation<
      UserResponse,
      { id: string; portifolios: Record<string, any> }
    >({
      query: ({ id, portifolios }) => ({
        url: `/professional/profile/portfolios/${id}/update/`,
        method: "PUT",
        body: portifolios,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deletePortifolios: builder.mutation<UserResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/professional/profile/portfolios/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserProfile"],
    }),
    addSkills: builder.mutation<UserResponse, { skills: Record<string, any> }>({
      query: ({ skills }) => ({
        url: `professional/profile/skills/`,
        method: "POST",
        body: skills,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deleteSkills: builder.mutation<
      UserResponse,
      { skills: Record<string, any> }
    >({
      query: ({ skills }) => ({
        url: `professional/profile/${skills}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserProfile"],
    }),    
    addCategories: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `/professional/profile/categories/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    removeCategories: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `/professional/profile/categories/`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["UserProfile"],
    }),
   
    updateProfessionalProfile: builder.mutation<
      UserResponse,
      { updated: Record<string, any> }
    >({
      query: ({ updated }) => ({
        url: `/professional/profile/update/`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    requestVerfication: builder.mutation<UserResponse, void>({
      query: () => ({
        url: `/professional/verification-requests/`,
        method: "POST",
      }),
      invalidatesTags: ["UserProfile"],
    }),
    subscribeService: builder.mutation<PaymentResponse, SubscriptionPayload>({
      query: (subscription) => ({
        url: `/professional/subscription/payment/initiate/`,
        method: "POST",
        body: subscription,
      }),
    }),
    checkSubscription: builder.query<PaymentStatusResponse, string>({
      query: (transactionId) => ({
        url: `/professional/subscription/payment/check/${transactionId}/`,
        method: "GET",
      }),
    }),
    giveFeedback: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `/feedback/add/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserProfileQuery,
  useUpdateProfileMutation,
  useAddAddressesMutation,
  useAddCertificatesMutation,
  useAddEducationsMutation,
  useAddPortifoliosMutation,
  useAddSkillsMutation,
  useDeleteCertificatesMutation,
  useDeleteEducationsMutation,
  useDeletePortifoliosMutation,
  useDeleteSkillsMutation,
  useRemoveAddressesMutation,
  useUpdateAddressesMutation,
  useUpdateCertificatesMutation,
  useUpdateEducationsMutation,
  useLazyUserProfileQuery,
  useUpdatePortifoliosMutation,
  useUpdateProfessionalProfileMutation,
  useRequestVerficationMutation,
  useSubscribeServiceMutation,
  useCheckSubscriptionQuery,
  useAddCategoriesMutation,
  useRemoveCategoriesMutation,
  useGiveFeedbackMutation,
} = userProfileApi;
