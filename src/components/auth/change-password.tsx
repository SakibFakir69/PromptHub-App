import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  ChevronLeft,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChangePasswordUserMutation } from "@/src/store/features/auth/auth.features";

const ChangePasswordScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  //   password , newPassword

  const [changePasswordUser] = useChangePasswordUserMutation();

  const onSubmit =async ({currentPassword , newPassword, confirmPassword}:{currentPassword:string, newPassword:string, confirmPassword:string})=>{

    try {
        const payload:{password:string, newPassword:string}={
            password:currentPassword,
            newPassword:newPassword
        }
        
        const result = await changePasswordUser(payload).unwrap();
        // show message ui or toast 
        
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
          {/* Header */}
          <View className="flex-row items-center py-6">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-full">
              <ChevronLeft size={24} color="#1A1A1A" />
            </TouchableOpacity>
            <Text className="ml-4 text-xl font-bold text-gray-900">
              Security
            </Text>
          </View>

          {/* Intro Text */}
          <View className="mt-4 mb-8">
            <Text className="text-2xl font-extrabold text-gray-900">
              Change Password
            </Text>
            <Text className="mt-2 leading-5 text-gray-500">
              Choose a strong password with at least 8 characters to keep your
              account secure.
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-5">
            {/* Current Password */}
            <View>
              <Text className="mb-2 ml-1 font-semibold text-gray-700">
                Current Password
              </Text>
              <View className="flex-row items-center px-4 border border-gray-200 bg-gray-50 rounded-2xl h-14">
                <Lock size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="Enter current password"
                  secureTextEntry={!showPassword}
                  value={formData.currentPassword}
                  onChangeText={(val) =>
                    setFormData({ ...formData, currentPassword: val })
                  }
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Eye size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* New Password */}
            <View>
              <Text className="mb-2 ml-1 font-semibold text-gray-700">
                New Password
              </Text>
              <View className="flex-row items-center px-4 border border-gray-200 bg-gray-50 rounded-2xl h-14">
                <ShieldCheck size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="Enter new password"
                  secureTextEntry={!showPassword}
                  value={formData.newPassword}
                  onChangeText={(val) =>
                    setFormData({ ...formData, newPassword: val })
                  }
                />
              </View>
            </View>

            {/* Confirm New Password */}
            <View>
              <Text className="mb-2 ml-1 font-semibold text-gray-700">
                Confirm New Password
              </Text>
              <View
                className={`flex-row items-center bg-gray-50 border rounded-2xl px-4 h-14 ${
                  formData.confirmPassword &&
                  formData.newPassword !== formData.confirmPassword
                    ? "border-red-400"
                    : "border-gray-200"
                }`}
              >
                <ShieldCheck size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="Repeat new password"
                  secureTextEntry={!showPassword}
                  value={formData.confirmPassword}
                  onChangeText={(val) =>
                    setFormData({ ...formData, confirmPassword: val })
                  }
                />
              </View>
              {formData.confirmPassword &&
                formData.newPassword !== formData.confirmPassword && (
                  <Text className="mt-2 ml-1 text-xs text-red-500">
                    Passwords do not match
                  </Text>
                )}
            </View>
          </View>

          {/* Action Button */}
          <View className="pt-10 mt-auto mb-10">
            <TouchableOpacity
              className={`h-14 rounded-2xl items-center justify-center shadow-sm ${
                formData.newPassword.length >= 8 &&
                formData.newPassword === formData.confirmPassword
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
              disabled={formData.newPassword.length < 8}
            >
              <Text className="text-lg font-bold text-white">
                Update Password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center mt-4">
              <Text className="font-medium text-gray-500">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
