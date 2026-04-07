import { baseApi } from "../../baseApi";





export const promptApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({

        createPrompt:builder.mutation({
            query:(data)=>({
                url:'/prompt/create-prompt',
                method:"POST",
                body:data,

            })
        })
        ,
        promptImageUpload:builder.mutation({
            query:(data)=>({
                url:"/prompt/prompt-image",
                method:"POST",
                body:data
            })

        }),
        upVote:builder.mutation({
            query:(id)=>({
                url:'/prompt/upVote',
                method:"POST",
                body:{ postId: id },
            })
        }),
          downVote:builder.mutation({
            query:(id)=>({
                url:'/prompt/downVote',
                method:"POST",
                body:{ postId: id },
            })
        })


    })

})

export const {useCreatePromptMutation,usePromptImageUploadMutation , useUpVoteMutation, useDownVoteMutation} = promptApi;