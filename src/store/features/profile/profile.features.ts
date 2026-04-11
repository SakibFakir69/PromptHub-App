import { baseApi } from "../../baseApi";



export const profileApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({
        updateProfile:builder.mutation({
            query:(data)=>({
                url:'/user/update-user',
                method:"PUT",
                body:data
            })
        })
    })


})

export const {useUpdateProfileMutation} = profileApi

