import { baseApi } from "../../baseApi";

export const promptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPrompt: builder.mutation({
      query: (data) => ({
        url: "/prompt/create-prompt",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Prompt"],
    }),
    promptImageUpload: builder.mutation({
      query: (data) => ({
        url: "/prompt/prompt-image",
        method: "POST",
        body: data,
      }),
    }),
    upVote: builder.mutation({
      query: (id) => ({
        url: "/prompt/upVote",
        method: "POST",
        body: { postId: id },
      }),
      invalidatesTags: (id) => [
        { type: "Prompt", id },
        { type: "Prompt", id: "LIST" },
      ],
    }),
    downVote: builder.mutation({
      query: (id) => ({
        url: "/prompt/downVote",
        method: "POST",
        body: { postId: id },
      }),
      invalidatesTags: ["Prompt"],
    }),

    getMyPrompt: builder.query({
      query: () => ({
        url: "/prompt/get-prompt",
        method: "GET",
      }),
      providesTags: ["Prompt"],
    }),
    savedPrompt: builder.mutation({
      query: (data) => ({
        url: "/prompt/saved-prompt",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Prompt"],
    }),

    getSavedPrompt: builder.query({
      query: () => ({
        url: "/prompt/saved-prompt",
        method: "GET",
      }),
      providesTags: ["Prompt"],
    }),

    deletePrompt: builder.mutation({
      query: ({ id }) => ({
        url: `/delete-prompt/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prompt"],
    }),
    updatePrompt: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-prompt/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePromptMutation,
  usePromptImageUploadMutation,
  useUpVoteMutation,
  useDownVoteMutation,
  useGetMyPromptQuery,
  useSavedPromptMutation,
  useGetSavedPromptQuery,
  useDeletePromptMutation,
  useUpdatePromptMutation
} = promptApi;
