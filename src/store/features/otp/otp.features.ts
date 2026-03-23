import { baseApi } from "../../baseApi";

export const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    isVerifyUser: builder.mutation({
      query: () => ({
        url: "/otp/user-verify",
        method: "POST",
      }),
    }),
    resendOtp: builder.mutation({
      query: () => ({
        url: "/otp/resend-otp",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useVerifyOtpMutation,
  useSendOtpMutation,
  useIsVerifyUserMutation,
useResendOtpMutation
} = otpApi;
