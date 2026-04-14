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
    savedPrompt:builder.mutation({
      query:(data)=>({
        url:"/prompt/saved-prompt",
        method:"POST",
        body:data

      }),
      invalidatesTags:["Prompt"]
    })

  }),
});

export const {
  useCreatePromptMutation,
  usePromptImageUploadMutation,
  useUpVoteMutation,
  useDownVoteMutation,
  useGetMyPromptQuery,
  useSavedPromptMutation
} = promptApi;
