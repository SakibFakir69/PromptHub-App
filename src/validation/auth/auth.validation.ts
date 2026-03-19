

import { z }  from 'zod';



export const registerUserInputValidation = z.object({

    fullName:z.string().min(2, {message: "Name must be at least 2 characters"}),
    email:z.email().includes("@", {message:"Must be include @"}),
    password: z.string().min(4, {message:"Password must be 4 character"}).max(30, {message:
        "Password must be under 30 character"
    }),
    confirmPassword:z.string().min(4, {message:"Password must be 4 character"})


})

export const loginUserValidation = z.object({
    email:z.email().includes("@" , {message:"Must be include @"}),
      password: z.string().min(4, {message:"Password must be 4 character"}).max(30, {message:
        "Password must be under 30 character"
    }),
})

export const forgotPasswordValidation = z.object({
      email:z.email().includes("@" , {message:"Must be include @"}),

})
export const resetPasswordValidation = z.object({
    newPassword: z.string().min(4,{message:"Password must be 4 character"}).max(30, {message:
        "Password must be under 30 character"
    }),
    confirmPassword: z.string().min(4, {message:"Password must be 4 character"}).max(30, {message:
        "Password must be under 30 character"
    }),
})

export const verifyOtpValidation = z.object({
    otp:z.string().min(4, {message:"Must be 4 digit"}) || z.number().max(4, {message:"Must be 4 digit"})
})