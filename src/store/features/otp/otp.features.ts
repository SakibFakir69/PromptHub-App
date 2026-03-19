import { baseApi } from "../../baseApi";


export const otpApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({
        forgotPassword:builder.mutation({

    
            query:(data)=>({
                url:'/auth/forgot-password',
                method:"POST",
                body:data
            })
        }),
        resetPassword:builder.mutation({
            query:(data)=> ({
                url:'/auth/reset-password',
                method:"POST",
                body:data
            })
        }),
        verifyOtp:builder.mutation({
            query:(data)=>({
                url:"/auth/verify-otp",
                method:"POST",
                body:data
            })
        })


    })
})

export const {useForgotPasswordMutation, useResetPasswordMutation, useVerifyOtpMutation} = otpApi;