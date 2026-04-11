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
const goSetting = ()=>{
    router.push('/profile/setting')
}
const goEditProfile = ()=>{
    router.push('/profile/edit-profile');
}

export const navigationRouter = {
    goRegister,goLogin,forgotPassword , backRoute , goSetting,goEditProfile
}