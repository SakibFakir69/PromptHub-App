import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const baseApi = createApi({
    reducerPath:"baseApi",
  baseQuery:fetchBaseQuery({baseUrl:process.env.EXPO_PUBLIC_BACKEND_URL || "", credentials:
    "include",

  } ),
  endpoints:()=>({}),
  
  tagTypes:['Auth','Prompt']
})