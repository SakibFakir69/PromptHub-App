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
import { Feather, AntDesign, FontAwesome5 } from '@expo/vector-icons';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          className="px-6 pt-12 pb-10"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View className="items-start mb-10">
            <View className="bg-[#E6F6EC] p-3 rounded-2xl">
              <Feather name="power" size={28} color="#00AA45" />
            </View>
          </View>

          {/* Header Section */}
          <Text className="text-4xl font-extrabold text-[#0F1419] mb-3">
            Welcome back
          </Text>
          <Text className="text-base text-[#657786] mb-10 leading-6">
            Enter your credentials to access your account
          </Text>

          {/* Form Section */}
          <View className="mb-4 space-y-6">
            {/* Email Address */}
            <View>
              <Text className="text-sm font-bold text-[#0F1419] mb-2">Email Address</Text>
              <View className="flex-row items-center border border-[#E1E8ED] rounded-xl bg-white px-4 h-14">
                <Feather name="mail" size={20} color="#A0ABC0" />
                <TextInput
                  className="flex-1 ml-3 text-base text-[#0F1419]"
                  placeholder="name@company.com"
                  placeholderTextColor="#A0ABC0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text className="text-sm font-bold text-[#0F1419] mb-2">Password</Text>
              <View className="flex-row items-center border border-[#E1E8ED] rounded-xl bg-white px-4 h-14">
                <Feather name="lock" size={20} color="#A0ABC0" />
                <TextInput
                  className="flex-1 ml-3 text-base text-[#0F1419]"
                  placeholder="••••••••"
                  placeholderTextColor="#A0ABC0"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#A0ABC0" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity className="items-end mb-10">
            <Text className="text-sm font-bold text-[#00AA45]">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity className="bg-[#00AA45] h-14 rounded-xl justify-center items-center mb-10 shadow-lg shadow-[#00AA45]/20">
            <Text className="text-base font-bold text-white">Login</Text>
          </TouchableOpacity>

          {/* Social Divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-[#E1E8ED]" />
            <Text className="mx-4 text-xs font-medium text-[#657786]">Or continue with</Text>
            <View className="flex-1 h-[1px] bg-[#E1E8ED]" />
          </View>

          {/* Social Buttons Row */}
          <View className="flex-row mb-10 space-x-4">
            <TouchableOpacity className="flex-1 flex-row h-14 border border-[#E1E8ED] rounded-xl justify-center items-center bg-white">
              <AntDesign name="google" size={18} color="#DB4437" />
              <Text className="ml-3 text-sm font-bold text-[#0F1419]">Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 flex-row h-14 border border-[#E1E8ED] rounded-xl justify-center items-center bg-white">
              <AntDesign name="github" size={18} color="#0F1419" />
              <Text className="ml-3 text-sm font-bold text-[#0F1419]">GitHub</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Navigation */}
          <View className="flex-row items-center justify-center mt-auto">
            <Text className="text-sm text-[#657786]">Don't have an account? </Text>
            <TouchableOpacity>
              <Text className="text-sm font-bold text-[#00AA45]">Sign up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}