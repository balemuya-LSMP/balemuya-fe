/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
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
  tagTypes: ["Post", "Comment", "Like"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<any, void>({
      query: () => `/blog/posts/`,
      providesTags: ["Post"],
    }),

    getPostById: builder.query<any, string>({
      query: (post_id) => `/blog/posts/${post_id}/`,
      providesTags:  ["Post"],
    }),
    getComments: builder.query<any, string>({
      query: (postId) => `/blog/posts/${postId}/comments/`,
      providesTags: ["Comment"],
    }),

    addComment: builder.mutation<any, { postId: string; data: any }>({
      query: ({ postId, data }) => ({
        url: `/blog/posts/${postId}/comments/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    updateComment: builder.mutation<any, { postId: string; data: any }>({
      query: ({ postId, data }) => ({
        url: `/blog/posts/${postId}/comments/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<any, { postId: string; data: any }>({
      query: ({ postId, data }) => ({
        url: `/blog/posts/${postId}/comments/`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),

    likePost: builder.mutation<any, string>({
      query: (postId) => ({
        url: `/blog/posts/${postId}/likes/`,
        method: "POST",
      }),
      invalidatesTags: ["Like"],
    }),
    getLikes: builder.query<any, string>({
      query: (postId) => `/blog/posts/${postId}/likes/`,
      providesTags: ["Like"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikePostMutation,
  useGetLikesQuery,
} = blogApi;
