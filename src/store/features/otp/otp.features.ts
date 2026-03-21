import { baseApi } from "../../baseApi";


export const otpApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({

      
        verifyOtp:builder.mutation({
            query:(data)=>({
                url:"/auth/verify-otp",
                method:"POST",
                body:data
            })
        })
        ,
        sendOtp:builder.mutation({
            query:(data)=>({
                url:'/otp/send-otp',
                method:"POST",
                body:data
            })
        })


    })
})

export const { useVerifyOtpMutation , useSendOtpMutation} = otpApi;