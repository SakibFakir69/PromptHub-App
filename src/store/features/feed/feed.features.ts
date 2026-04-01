import { baseApi } from "../../baseApi";





export const feedApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({


        getFeed:builder.query({

           query:(cursor)=>({
            url:"/feed",
            method:"GET",
            params: cursor ? cursor : undefined
           })

        })


    })

})

export const {useGetFeedQuery } = feedApi;