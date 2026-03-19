import { baseApi } from "../../baseApi";
export const authAPi = baseApi.injectEndpoints({


    endpoints:(builder)=>({

        register:builder.mutation({
            query:(data)=>({
                url:"/user/register",
                method:"POST",
                body:data
            }),

        }),

        login:builder.mutation({
            query:(data)=>({
                url:'/auth/login',
                method:"POST",
                body:data
            })

        }),
        getMe:builder.query({
            query:()=> ({
                url:"/auth/me",
                method:"GET",
                
            })
        }),
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
export const {useLoginMutation, useRegisterMutation, useGetMeQuery, useForgotPasswordMutation,useResetPasswordMutation} = authAPi