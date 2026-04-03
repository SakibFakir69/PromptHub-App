import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Feather, AntDesign } from "@expo/vector-icons";
import { navigationRouter } from "@/src/navigation";
import { loginUserValidation } from "@/src/validation/auth/auth.validation";
import { ILoginInput } from "@/src/types/auth/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "@/src/store/features/auth/auth.features";
import { useSendOtpMutation } from "@/src/store/features/otp/otp.features";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import LoadingScreen from "../ui/loading-screen";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [message, setMessage] = useState<string>("");

  const [sendOtp] = useSendOtpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    resolver: zodResolver(loginUserValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const userEmail = useRef("");
  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    console.log("Login Data:", data);

    userEmail.current = data?.email;

    try {
      console.log("login user data");
      const result = await loginUser(data).unwrap();
      
      
    
      await SecureStore.setItemAsync("accessToken", result.accessToken);
      await SecureStore.setItemAsync("refreshToken", result.refreshToken);
    
      console.log(result ,'',result?.data?.message);
      
      if (result?.data?.isVerify) {
        router.replace("/explore");
      } else {
        const sendOtpResult = await sendOtp(userEmail?.current).unwrap();
        console.log(sendOtpResult, "otp");
        
        
        
        router.replace("/verify-otp");
      }
    } catch (error:any) {
      console.log(error , 'error');
      setMessage(error?.data?.message);
      
    }
  };



  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6 pt-12 pb-10"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View className="items-start mb-20">
           
          </View>

          {/* Header Section */}
          <Text className="text-4xl font-extrabold text-[#0F1419] mb-3">
            Welcome back
          </Text>
          <Text className="text-base text-[#657786] mb-10 leading-6">
            Enter your credentials to access your account
          </Text>

          {/* Form Section */}
          <View className="space-y-4">
            <Text className="mb-4 -mt-4 text-red-500">{message}</Text>

            {/* Email Address */}
            <View className="mb-4">
              <Text className="text-sm font-bold text-[#0F1419] mb-2">
                Email Address
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center border rounded-xl bg-white px-4 h-14 ${
                      errors.email ? "border-red-500" : "border-[#E1E8ED]"
                    }`}
                  >
                    <Feather
                      name="mail"
                      size={20}
                      color={errors.email ? "#EF4444" : "#A0ABC0"}
                    />
                    <TextInput
                      className="flex-1 ml-3 text-base text-[#0F1419]"
                      placeholder="name@company.com"
                      placeholderTextColor="#A0ABC0"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text className="mt-1 ml-1 text-xs text-red-500">
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Password */}
            <View className="mb-2">
              <Text className="text-sm font-bold text-[#0F1419] mb-2">
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center border rounded-xl bg-white px-4 h-14 ${
                      errors.password ? "border-red-500" : "border-[#E1E8ED]"
                    }`}
                  >
                    <Feather
                      name="lock"
                      size={20}
                      color={errors.password ? "#EF4444" : "#A0ABC0"}
                    />
                    <TextInput
                      className="flex-1 ml-3 text-base text-[#0F1419]"
                      placeholder="••••••••"
                      placeholderTextColor="#A0ABC0"
                      secureTextEntry={!showPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={20}
                        color="#A0ABC0"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text className="mt-1 ml-1 text-xs text-red-500">
                  {errors.password.message}
                </Text>
              )}
            </View>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={navigationRouter.forgotPassword}
            className="items-end mt-2 mb-10"
          >
            <Text className="text-sm font-bold text-[#00AA45]">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
            className="bg-[#00AA45] h-14 rounded-xl justify-center items-center mb-10 shadow-lg shadow-[#00AA45]/20"
          >
            <Text className="text-base font-bold text-white">
              {isLoading ? <LoadingScreen/> : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Footer Navigation */}
          <View className="flex-row items-center justify-center">
            <Text className="text-sm text-[#657786]">
              Don t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={navigationRouter.goRegister}>
              <Text className="text-sm font-bold text-[#00AA45]">Sign up</Text>
            </TouchableOpacity>
          </View>

          {/* Social Divider */}
          <View className="flex-row items-center mt-8 mb-8">
            <TouchableOpacity className="flex-1 h-[1px] bg-[#E1E8ED]" />
            <Text className="mx-4 text-xs font-medium text-[#657786]">
              Or continue with
            </Text>
            <TouchableOpacity className="flex-1 h-[1px] bg-[#E1E8ED]" />
          </View>

          {/* Social Buttons Row */}
          <View className="flex-row mb-10">
            <TouchableOpacity className="flex-1 flex-row h-14 border border-[#E1E8ED] rounded-xl justify-center items-center bg-white">
              <AntDesign name="google" size={18} color="#DB4437" />
              <Text className="ml-3 text-sm font-bold text-[#0F1419]">
                Google
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
