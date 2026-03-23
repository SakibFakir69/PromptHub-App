import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordValidation } from "@/src/validation/auth/auth.validation";
import { IResetPassword } from "@/src/types/auth/auth.type";
import { navigationRouter } from '@/src/navigation';

export default function ResetPasswordScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IResetPassword>({
    resolver: zodResolver(resetPasswordValidation),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<IResetPassword> = (data) => {
    console.log("Reset Password Data:", data);
    // Add your API call here
    

    
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          className="px-6 pt-6 pb-10"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Navigation */}
          <View className="flex-row items-center mb-12">
            <TouchableOpacity onPress={navigationRouter.goLogin}>
              <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="flex-1 text-center mr-6 text-lg font-bold text-[#0F1419]">Security</Text>
          </View>

          {/* Header Section */}
          <Text className="text-4xl font-extrabold text-[#0F1419] mb-3">
            Set New Password
          </Text>
          <Text className="text-base text-[#657786] mb-10 leading-6">
            Choose a secure new password for your account.
          </Text>

          {/* Form Section */}
          <View className="mb-6">
            {/* New Password */}
            <View className="mb-4">
              <Text className="text-sm font-bold text-[#0F1419] mb-2">New Password</Text>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className={`flex-row items-center border rounded-xl bg-white px-4 h-14 ${errors.newPassword ? 'border-red-500' : 'border-[#E1E8ED]'}`}>
                    <Feather name="lock" size={20} color={errors.newPassword ? "#EF4444" : "#A0ABC0"} />
                    <TextInput
                      className="flex-1 ml-3 text-base text-[#0F1419]"
                      placeholder="Enter new password"
                      placeholderTextColor="#A0ABC0"
                      secureTextEntry={!showPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#A0ABC0" />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.newPassword && <Text className="mt-1 ml-1 text-xs text-red-500">{errors.newPassword.message}</Text>}
            </View>

            {/* Confirm New Password */}
            <View className="mb-4">
              <Text className="text-sm font-bold text-[#0F1419] mb-2">Confirm New Password</Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className={`flex-row items-center border rounded-xl bg-white px-4 h-14 ${errors.confirmPassword ? 'border-red-500' : 'border-[#E1E8ED]'}`}>
                    <MaterialCommunityIcons name="lock-reset" size={22} color={errors.confirmPassword ? "#EF4444" : "#A0ABC0"} />
                    <TextInput
                      className="flex-1 ml-3 text-base text-[#0F1419]"
                      placeholder="Confirm new password"
                      placeholderTextColor="#A0ABC0"
                      secureTextEntry={!showConfirm}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                      <Feather name={showConfirm ? "eye" : "eye-off"} size={20} color="#A0ABC0" />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.confirmPassword && <Text className="mt-1 ml-1 text-xs text-red-500">{errors.confirmPassword.message}</Text>}
            </View>
          </View>

          {/* Validation Checklist */}
          <View className="mb-10">
            <View className="flex-row items-center mb-2">
              <Ionicons name="checkmark-circle" size={18} color="#00AA45" />
              <Text className="ml-2 text-sm text-[#657786]">At least 8 characters long</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={18} color="#00AA45" />
              <Text className="ml-2 text-sm text-[#657786]">Include a symbol or number</Text>
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity 
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
            className={`bg-[#00AA45] h-14 rounded-xl justify-center items-center mb-10 shadow-lg shadow-[#00AA45]/20 ${isSubmitting ? 'opacity-70' : ''}`}
          >
            <Text className="text-base font-bold text-white">
              {isSubmitting ? "Updating..." : "Update Password"}
            </Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <TouchableOpacity 
            onPress={navigationRouter.goLogin}
            className="flex-row items-center justify-center mt-auto"
          >
            <Text className="text-sm text-[#657786]">Back to </Text>
            <Text className="text-sm font-bold text-[#00AA45]">Login</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}