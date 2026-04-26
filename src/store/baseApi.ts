import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import { getAccessToken } from "../utils/auth/auth.utils";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BACKEND_URL || "",
    // manage refresh token

    prepareHeaders: async (headers) => {
      const token = getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      console.log(token , ' token')

      return headers;
    },
  }),

  endpoints: () => ({}),

  tagTypes: ["Auth", "Prompt"],
});
