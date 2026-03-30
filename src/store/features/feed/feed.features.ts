import { baseApi } from "../../baseApi";





export const feedApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({


        getFeed:builder.query({
           query:()=>({
            url:"",
            method:""
           })
        })


    })

})

export const {useGetFeedQuery } = feedApi;