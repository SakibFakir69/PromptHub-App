import { router } from "expo-router"
import ChangePassword from "../app/(auth)/change-password"



const goRegister = ()=>{
    router.replace('/register')

}
const goLogin = ()=>{
    router.replace('/login')
}
const forgotPassword = ()=>{
    router.replace('/forgot-password');
}
const backRoute = ()=>{
    router.back();

}
const goSetting = ()=>{
    router.push('/profile/setting')
}
const goEditProfile = ()=>{
    router.push('/profile/edit-profile');
}

const goChangePassword = ()=>{
    router.push('/change-password');
}

export const navigationRouter = {
    goRegister,goLogin,forgotPassword , backRoute , goSetting,goEditProfile,goChangePassword
}