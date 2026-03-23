import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { verifyOtpValidation } from "@/src/validation/auth/auth.validation";
import { IVerfiyOTP } from "@/src/types/auth/auth.type";
import { useIsVerifyUserMutation, useResendOtpMutation, useVerifyOtpMutation } from "@/src/store/features/otp/otp.features";
import { navigationRouter } from "@/src/navigation";


// OTP MESSAGE SHOW AFTER SUCCESSFULLY OTP SEND
//// REMOVE AFTER 3 OR 5 S 
//// 

export default function VerifyOtpPage() {
  const [ otpMessage , setOtpMessage ] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [isVerifyUser] = useIsVerifyUserMutation();
  const [ resendOtp] = useResendOtpMutation();

  
  
  // Refs for auto-focusing next input
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IVerfiyOTP>({
    resolver: zodResolver(verifyOtpValidation),
    defaultValues: { otp: "" },
  });

  // Watch the OTP value to sync with individual boxes
  const otpValue = watch("otp") || "";

  const handleOtpChange = (text: string, index: number) => {
    const newOtpArray = otpValue.split("");
    newOtpArray[index] = text;
    const combinedOtp = newOtpArray.join("");
    
    setValue("otp", combinedOtp);

    // Auto-focus next input
    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current is empty
    if (e.nativeEvent.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const onSubmit = async (data: IVerfiyOTP) => {
    try {
      await verifyOtp(data).unwrap();
      await isVerifyUser(null).unwrap();
      router.replace("/explore");
    } catch (error) {
      console.error("OTP Verification Failed:", error);
    }
  };

  const handelResendOtp =async ()=>{
    try {
      
      const result = await resendOtp(null).unwrap();
      console.log(result);
      setOtpMessage(result?.message);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6 pt-6 pb-10"
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="flex-row items-center mb-10">
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#0F1419" />
            </TouchableOpacity>
            <Text className="flex-1 text-center mr-6 text-lg font-bold text-[#0F1419]">
              OTP Verification
            </Text>
          </View>

          <View className="items-start mb-8">
            <View className="bg-[#E6F6EC] p-4 rounded-2xl">
              <MaterialCommunityIcons name="shield-check-outline" size={32} color="#00AA45" />
            </View>
          </View>

          <Text className="text-3xl font-extrabold text-[#0F1419] mb-2">Verify OTP</Text>
          <Text className="text-base text-[#657786] mb-10">
            We ve sent a 4-digit code to your email.
          </Text>

          {/* OTP Input Logic */}
          <View className="flex-row justify-between mb-4">
            {[0, 1, 2, 3].map((index) => (
              <View
                key={index}
                className={`w-[70px] h-[75px] border-2 rounded-2xl bg-white items-center justify-center ${
                  otpValue[index] ? "border-[#00AA45]" : "border-[#E1E8ED]"
                }`}
              >
                <TextInput
                  ref={inputRefs[index]}
                  className="text-3xl font-bold text-[#0F1419] text-center w-full h-full"
                  keyboardType="number-pad"
                  maxLength={1}
                  value={otpValue[index] || ""}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  placeholder="0"
                  placeholderTextColor="#E1E8ED"
                  selectionColor="#00AA45"
                />
              </View>
            ))}
          </View>
          
          {errors.otp && (
            <Text className="mb-6 text-sm text-center text-red-500">{errors.otp.message}</Text>
          )}

          {/* Action Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            className={`h-14 rounded-xl justify-center items-center mt-6 shadow-lg ${
              isLoading ? "bg-[#00AA45]/70" : "bg-[#00AA45] shadow-[#00AA45]/20"
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-base font-bold text-white">Verify & Continue</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row items-center justify-center mt-10">
            <Text className="text-sm text-[#657786]">Didn t receive code? </Text>
            <TouchableOpacity onPress={handelResendOtp}>
              <Text className="text-sm font-bold text-[#00AA45]">Resend Code</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            className="flex-row items-center justify-center mt-6" 
            onPress={() => navigationRouter.goLogin()}
          >
            <Text className="text-sm text-[#657786]">Back to </Text>
            <Text className="text-sm font-bold text-[#00AA45]">Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}