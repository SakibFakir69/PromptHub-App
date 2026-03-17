import { router } from "expo-router"



const goRegister = ()=>{
    router.replace('/register')

}

export const navigationRouter = {
    goRegister,
}