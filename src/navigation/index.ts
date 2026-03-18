import { router } from "expo-router"



const goRegister = ()=>{
    router.replace('/register')

}
const goLogin = ()=>{
    router.replace('/login')
}

export const navigationRouter = {
    goRegister,goLogin
}