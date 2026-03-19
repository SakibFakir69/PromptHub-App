import { baseApi } from "../../baseApi";
export const userAPi = baseApi.injectEndpoints({


    endpoints:(builder)=>({

        registerUser:builder.mutation({
            query:(data)=>({
                url:"/user/create-user",
                method:"POST",
                body:data
            }),

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

       

       

    })
})
export const {useRegisterUserMutation, useDeleteUserMutation,useUpdateUserMutation} = userAPi;