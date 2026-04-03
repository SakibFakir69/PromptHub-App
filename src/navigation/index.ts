import { router } from "expo-router"



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

export const navigationRouter = {
    goRegister,goLogin,forgotPassword , backRoute
}