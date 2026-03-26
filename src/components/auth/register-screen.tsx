import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { Feather, AntDesign } from "@expo/vector-icons";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IRegisterInput } from "@/src/types/auth/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserInputValidation } from "@/src/validation/auth/auth.validation";
import { navigationRouter } from "@/src/navigation";
import Toast from 'react-native-toast-message';
import { useRegisterUserMutation } from "@/src/store/features/user/user.features";
import { router } from "expo-router";
import { toastConfig } from "@/src/utils/toast.util";
import LoadingScreen from "../ui/loading-screen";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser, {isLoading} ] = useRegisterUserMutation();
  

  const {
    control,
    handleSubmit, 
    formState: { errors },
  } = useForm<IRegisterInput>({
    resolver: zodResolver(registerUserInputValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<IRegisterInput> =async (data) => {
    console.log(data , "register")

    try {
      console.log("try")
      console.log("BASE URL:", process.env.EXPO_PUBLIC_BACKEND_URL);
      const result = await registerUser(data).unwrap();
      
      console.log("result")
      console.log(result , ' result')
      
     
      // WAIT 1S OR 2S
      
     
      setTimeout(()=>{
         router.push('/login');
        
      },1500)

      
    } catch (error) {
      
      console.log(error);
      
      Toast.show({
        type:"error",
        text1:"Failed to Register",
        text2:"Please try again"
      })
      
    }    
  };

  return (
    
  
    <SafeAreaView className=" bg-[#FAFAFA] h-full pt-2">
      
    
      
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6 pt-4 pb-10" // Adjusted padding
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8">
            <Text className="text-4xl font-extrabold text-[#0F1419] mb-2">
              Create Account
            </Text>
            <Text className="text-base text-[#657786] leading-6">
              Join our community and start your journey today.
            </Text>
          </View>

          {/* Full Name */}
          <View className="mb-4">
            <Text className="text-sm font-bold text-[#0F1419] mb-2">Full Name</Text>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`h-14 border ${errors.name ? 'border-red-500' : 'border-[#E1E8ED]'} rounded-lg px-4 text-base bg-white text-[#0F1419]`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="John Doe"
                  placeholderTextColor="#A0ABC0"
                />
              )}
            />
            {errors.name && <Text className="mt-1 text-xs text-red-500">{errors.name.message}</Text>}
          </View>

          {/* Email */}
          <View className="mb-4">
            <Text className="text-sm font-bold text-[#0F1419] mb-2">Email Address</Text>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`h-14 border ${errors.email ? 'border-red-500' : 'border-[#E1E8ED]'} rounded-lg px-4 text-base bg-white text-[#0F1419]`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="john@example.com"
                  placeholderTextColor="#A0ABC0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && <Text className="mt-1 text-xs text-red-500">{errors.email.message}</Text>}
          </View>

          {/* Password */}
          <View className="mb-4">
            <Text className="text-sm font-bold text-[#0F1419] mb-2">Password</Text>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className={`flex-row items-center border ${errors.password ? 'border-red-500' : 'border-[#E1E8ED]'} rounded-lg bg-white`}>
                  <TextInput
                    className="flex-1 h-14 px-4 text-base text-[#0F1419]"
                    placeholder="••••••••"
                    placeholderTextColor="#A0ABC0"
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
                    <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#657786" />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && <Text className="mt-1 text-xs text-red-500">{errors.password.message}</Text>}
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-[#0F1419] mb-2">Confirm Password</Text>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className={`flex-row items-center border ${errors.confirmPassword ? 'border-red-500' : 'border-[#E1E8ED]'} rounded-lg bg-white`}>
                  <TextInput
                    className="flex-1 h-14 px-4 text-base text-[#0F1419]"
                    placeholder="••••••••"
                    placeholderTextColor="#A0ABC0"
                    secureTextEntry={!showConfirmPassword}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="pr-4">
                    <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#657786" />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.confirmPassword && <Text className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</Text>}
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity 
            onPress={handleSubmit(onSubmit)} 
            activeOpacity={0.8}
            className="bg-[#00AA45] h-14 rounded-lg justify-center items-center mb-6 shadow-md"
          >
            <Text className="text-base font-bold text-white">{isLoading ? <LoadingScreen/> : " Sign up "} </Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <View className="flex-row items-center justify-center mb-10">
            <Text className="text-sm text-[#657786]">Already have an account? </Text>
            <TouchableOpacity onPress={navigationRouter.goLogin}>
              <Text className="text-sm font-bold text-[#00AA45]">Login</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[1px] bg-[#E1E8ED]" />
            <Text className="mx-4 text-[10px] font-bold text-[#A0ABC0] tracking-widest">OR CONTINUE WITH</Text>
            <View className="flex-1 h-[1px] bg-[#E1E8ED]" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row mb-10 space-x-3">
            <TouchableOpacity className="flex-1 flex-row h-14 border border-[#E1E8ED] rounded-lg bg-white justify-center items-center">
              <AntDesign name="google" size={18} color="#DB4437" />
              <Text className="ml-3 text-sm font-semibold text-[#0F1419]">Google</Text>
            </TouchableOpacity>
           
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    
    



    </SafeAreaView>
  );
}