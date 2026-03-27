import React, { useState } from "react";
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
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { navigationRouter } from "@/src/navigation";
import { forgotPasswordValidation } from "@/src/validation/auth/auth.validation";
import { IForgotPassword } from "@/src/types/auth/auth.type";
import { useResetEmailMutation } from "@/src/store/features/auth/auth.features";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import LoadingScreen from "@/src/components/ui/loading-screen";

export default function ForgotPasswordScreen() {
  const [resetEmail] = useResetEmailMutation();
  const [ message , setMessage ] = useState<string>('')
 

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForgotPassword>({
    resolver: zodResolver(forgotPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IForgotPassword> = async (data) => {
    console.log("Forgot Password Data:", data);

    try {
      const result = await resetEmail(data).unwrap();
      console.log(result);
    

      Toast.show({
        text1: "Send otp to your email",
      });

      if (result?.status) {
        router.push({
          pathname: "/reset-verify-otp",
          params: {
            email: data?.email,
          },
        });
      } else {
        console.log(result, " forgot password");
      }
    } catch (error:any) {
      console.log(error, 'error');
      setMessage(error?.data?.message)

      
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
          className="px-6 pt-6 pb-10"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Navigation Bar */}
          <View className="flex-row items-center justify-between mt-8 mb-10">
            <TouchableOpacity onPress={navigationRouter.goLogin}>
              <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-[#0F1419]">
              Recover Access
            </Text>
            <View className="w-6" /> {/* Spacer for centering title */}
          </View>

          {/* Icon Badge */}
          <View className="items-start mb-10">
            <View className="bg-[#E6F6EC] p-4 rounded-2xl">
              <MaterialCommunityIcons
                name="lock-reset"
                size={32}
                color="#00AA45"
              />
            </View>
          </View>

          {/* Header Section */}
          <Text className="text-4xl font-extrabold text-[#0F1419] mb-3">
            Recover Access
          </Text>
          <Text className="text-base text-[#657786] mb-10 leading-6">
            Enter your email. We ll send you a link to reset your password.
          </Text>

          {/* Form Section */}
          <View className="mb-8">
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
                    placeholder="name@example.com"
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
            {/* Error Message */}
            {errors.email && (
              <Text className="mt-2 ml-1 text-xs text-red-500">
                {errors.email.message}
              </Text>
            )}
            {message && ( <Text className="text-red-500">{message}</Text>)}

          </View>

          {/* Primary Action Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
            className={`bg-[#00AA45] h-14 rounded-xl justify-center items-center mb-10 shadow-lg shadow-[#00AA45]/20 ${
              isSubmitting ? "opacity-70" : ""
            }`}
          >
            <Text className="text-base font-bold text-white">
              {isSubmitting ? <LoadingScreen /> : "Send Code"}
            </Text>
          </TouchableOpacity>

          {/* Footer Navigation */}
          <View className="flex-row items-center justify-center ">
            <Text className="text-sm text-[#657786]">
              Remember your password?{" "}
            </Text>
            <TouchableOpacity onPress={navigationRouter.goLogin}>
              <Text className="text-sm font-bold text-[#00AA45]">Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
