import { baseApi } from "../../baseApi";





export const feedApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({


        getFeed:builder.query({

           query:(cursor)=>({
            url:"/feed",
            method:"GET",
            params: cursor ? cursor : undefined
           }),
           providesTags:['Prompt']

        }),

        GetPromptById:builder.query({
            query:(id)=>({
                
                url:`/prompt/prompt-details/${id}`,
                method:"GET",
               
               
            })
        })


    })

})

export const {useGetFeedQuery,useGetPromptByIdQuery } = feedApi;