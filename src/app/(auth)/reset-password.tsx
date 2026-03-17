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

export default function ResetPasswordScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
            <TouchableOpacity>
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
          <View className="mb-6 space-y-6">
            {/* New Password */}
            <View>
              <Text className="text-sm font-bold text-[#0F1419] mb-2">New Password</Text>
              <View className="flex-row items-center border border-[#E1E8ED] rounded-xl bg-white px-4 h-14">
                <Feather name="lock" size={20} color="#A0ABC0" />
                <TextInput
                  className="flex-1 ml-3 text-base text-[#0F1419]"
                  placeholder="Enter new password"
                  placeholderTextColor="#A0ABC0"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#A0ABC0" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm New Password */}
            <View>
              <Text className="text-sm font-bold text-[#0F1419] mb-2">Confirm New Password</Text>
              <View className="flex-row items-center border border-[#E1E8ED] rounded-xl bg-white px-4 h-14">
                <MaterialCommunityIcons name="lock-reset" size={22} color="#A0ABC0" />
                <TextInput
                  className="flex-1 ml-3 text-base text-[#0F1419]"
                  placeholder="Confirm new password"
                  placeholderTextColor="#A0ABC0"
                  secureTextEntry={!showConfirm}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                  <Feather name={showConfirm ? "eye" : "eye-off"} size={20} color="#A0ABC0" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Validation Checklist */}
          <View className="mb-10 space-y-2">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={18} color="#00AA45" />
              <Text className="ml-2 text-sm text-[#657786]">At least 8 characters long</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-[18px] h-[18px] rounded-full bg-[#E1E8ED] items-center justify-center" />
              <Text className="ml-2 text-sm text-[#657786]">Include a symbol or number</Text>
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity className="bg-[#00AA45] h-14 rounded-xl justify-center items-center mb-10 shadow-lg shadow-[#00AA45]/20">
            <Text className="text-base font-bold text-white">Update Password</Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <TouchableOpacity className="flex-row items-center justify-center mt-auto">
            <Text className="text-sm text-[#657786]">Back to </Text>
            <Text className="text-sm font-bold text-[#00AA45]">Login</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}