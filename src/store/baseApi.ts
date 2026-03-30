import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BACKEND_URL || "",

    prepareHeaders: async (headers) => {
      const token = await SecureStore.getItemAsync("accessToken");

      

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);


      }

      return headers;
    },
  }),

  endpoints: () => ({}),

  tagTypes: ['Auth', 'Prompt'],
});