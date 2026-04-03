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
            query:({data})=>({
                url:"prompt/prompt-image",
                method:"POST",
                body:data
            })

        })


    })

})

export const {useCreatePromptMutation,usePromptImageUploadMutation} = promptApi;