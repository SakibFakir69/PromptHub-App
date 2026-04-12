import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ChevronLeft, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordUserMutation } from "@/src/store/features/auth/auth.features";
import { navigationRouter } from "@/src/navigation";

// 1. Define Validation Schema
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [changePasswordUser, { isLoading }] = useChangePasswordUserMutation();
  const [ message , setMessage ] = useState("");

  // 2. Initialize Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 3. Handle Submit
  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const payload = {
        password: data.currentPassword,
        newPassword: data.newPassword,
      };
      const result = await changePasswordUser(payload).unwrap();
      console.log("Success:", result);
      setMessage(result?.message);
      reset(); // Clear form on success
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
          
          {/* Header */}
          <View className="flex-row items-center py-6">
            <TouchableOpacity onPress={()=> navigationRouter.backRoute()} className="p-2 bg-gray-100 rounded-full">
              <ChevronLeft size={24} color="#1A1A1A" />
            </TouchableOpacity>
            <Text className="ml-4 text-xl font-bold text-gray-900">Security</Text>
          </View>

          <View className="mt-4 mb-8">
            <Text className="text-2xl font-extrabold text-gray-900">Change Password</Text>
            <Text className="mt-2 leading-5 text-gray-500">
              Choose a strong password with at least 8 characters.
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-5">
            
            {/* Current Password */}
            <View>
              <Text className="mb-2 ml-1 font-semibold text-gray-700">Current Password</Text>
              <Controller
                control={control}
                name="currentPassword"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center px-4 border border-gray-200 bg-gray-50 rounded-2xl h-14">
                    <Lock size={20} color="#9CA3AF" />
                    <TextInput
                      className="flex-1 ml-3 text-gray-900"
                      placeholder="Enter current password"
                      secureTextEntry={!showPassword}
                      value={value}
                      onChangeText={onChange}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.currentPassword && <Text className="mt-1 ml-1 text-xs text-red-500">{errors.currentPassword.message}</Text>}
            </View>

            {/* New Password */}
            <View>
              <Text className="mb-2 ml-1 font-semibold text-gray-700">New Password</Text>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center px-4 border border-gray-200 bg-gray-50 rounded-2xl h-14">
                    <ShieldCheck size={20} color="#9CA3AF" />
                    <TextInput
                      className="flex-1 ml-3 text-gray-900"
                      placeholder="Enter new password"
                      secureTextEntry={!showPassword}
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
              {errors.newPassword && <Text className="mt-1 ml-1 text-xs text-red-500">{errors.newPassword.message}</Text>}
            </View>

            {/* Confirm Password */}
            <View>
              <Text className="mb-2 ml-1 font-semibold text-gray-700">Confirm New Password</Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <View className={`flex-row items-center bg-gray-50 border rounded-2xl px-4 h-14 ${errors.confirmPassword ? "border-red-400" : "border-gray-200"}`}>
                    <ShieldCheck size={20} color="#9CA3AF" />
                    <TextInput
                      className="flex-1 ml-3 text-gray-900"
                      placeholder="Repeat new password"
                      secureTextEntry={!showPassword}
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
              {errors.confirmPassword && <Text className="mt-1 ml-1 text-xs text-red-500">{errors.confirmPassword.message}</Text>}
              {message ? <Text className="text-green">{message}</Text> : <Text></Text>}
            </View>
          </View>

          {/* Action Button */}
          <View className="pt-10 mt-auto mb-10">
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className={`h-14 rounded-2xl items-center justify-center shadow-sm ${isValid && !isLoading ? "bg-black" : "bg-gray-300"}`}
              disabled={!isValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-lg font-bold text-white">Update Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;