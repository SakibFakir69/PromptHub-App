import { baseApi } from "../../baseApi";
export const userAPi = baseApi.injectEndpoints({


    endpoints:(builder)=>({

        register:builder.mutation({
            query:(data)=>({
                url:"/user/create-user",
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
        deleteUser:builder.mutation({
            query:()=>({
                url:'/user/delete-user',
                method:"DELETE"
            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:'/user/update-user',
                method:"PUT",
               body:data
            })
        }),

        //// 
        getMe:builder.query({
            query:()=> ({
                url:"/auth/me",
                method:"GET",
                
            })
        }),

       

    })
})
export const {useLoginMutation, useRegisterMutation, useGetMeQuery} = userAPi;