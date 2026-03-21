import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
    
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login-user",
        method: "POST",
        body: data,
      }),
    }),
    changePasswordUser:builder.mutation({
        query:(data)=>({
            url:'/auth/change-password',
            method:"POST",
            body:data

        })
    }),

    resetPassword:builder.mutation({
        query:(data)=>({
            url:'/auth/reset-password',
            method:"POST",
            body:data
        })
    }),
    refreshToken:builder.mutation({
        query:(data)=>({
            url:'/auth/refresh',
            method:"POST",
            body:data
        })
    }),
    logoutUser:builder.mutation({
        query:()=>({
            url:"/auth/logout",
            method:"POST"
        })
    }),
    googleLoginUser:builder.mutation({
        query:()=>({
            url:'/auth/google',
            method:"GET",

        })
    }),
    googleLoginUserCallBack:builder.mutation({
        query:()=>({
            url:'/auth/google/callback',
            method:"GET",

        })
    })


  }),
});

export const {useChangePasswordUserMutation,useGetMeQuery,useGoogleLoginUserCallBackMutation,useGoogleLoginUserMutation,useLogoutUserMutation , useRefreshTokenMutation , useResetPasswordMutation,useLoginUserMutation,} = authApi;
