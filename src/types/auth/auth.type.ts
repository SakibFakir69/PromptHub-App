import { email, number } from './../../../node_modules/zod/src/v4/core/regexes';


export interface IRegisterInput {
    fullName: string,
    email:string,
    password:string,
    confirmPassword:string,
    
}

export interface ILoginInput{
    email:string,
    password:string
}
export interface IForgotPassword {
    email:string
}
export interface IResetPassword {
    newPassword: string,
    confirmPassword: string
}
export interface IVerfiyOTP {
    otp: string 
}