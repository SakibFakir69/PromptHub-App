import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    //  FIX HERE  ( SAFE AREA VIEW )
    <View className="flex-1 bg-[#FAFAFA]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          className="px-6 pt-10 pb-16"
          showsVerticalScrollIndicator={false}
        >
          
          <Text className="text-4xl font-extrabold text-[#0F1419] mb-2">
            Create Account
          </Text>
          <Text className="text-base text-[#657786] mb-8 leading-6">
            Join our community and start your journey today.
          </Text>

          {/* Form Section */}
          <View className="mb-8 space-y-5">
            {/* Full Name */}
            <View>
              <Text className="text-sm font-bold text-[#0F1419] mb-2">Full Name</Text>
              <TextInput
                className="h-14 border border-[#E1E8ED] rounded-lg px-4 text-base bg-white text-[#0F1419]"
                placeholder="John Doe"
                placeholderTextColor="#A0ABC0"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm font-bold text-[#0F1419] mb-2">Email Address</Text>
              <TextInput
                className="h-14 border border-[#E1E8ED] rounded-lg px-4 text-base bg-white text-[#0F1419]"
                placeholder="hello@example.com"
                placeholderTextColor="#A0ABC0"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View>
              <Text className="text-sm font-bold text-[#0F1419] mb-2">Password</Text>
              <View className="flex-row items-center border border-[#E1E8ED] rounded-lg bg-white">
                <TextInput
                  className="flex-1 h-14 px-4 text-base text-[#0F1419]"
                  placeholder="••••••••"
                  placeholderTextColor="#A0ABC0"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#657786" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View>
              <Text className="text-sm font-bold text-[#0F1419] mb-2">Confirm Password</Text>
              <View className="flex-row items-center border border-[#E1E8ED] rounded-lg bg-white">
                <TextInput
                  className="flex-1 h-14 px-4 text-base text-[#0F1419]"
                  placeholder="••••••••"
                  placeholderTextColor="#A0ABC0"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="pr-4">
                  <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#657786" />
                </TouchableOpacity>
              </View>

              {/* gender , profession */}
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity className="bg-[#00AA45] h-14 rounded-lg justify-center items-center mb-6 shadow-md">
            <Text className="text-base font-bold text-white">Sign up</Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <View className="flex-row items-center justify-center mb-10">
            <Text className="text-sm text-[#657786]">Already have an account? </Text>
            <TouchableOpacity>
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
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-1 flex-row h-14 border border-[#E1E8ED] rounded-lg bg-white justify-center items-center">
              <AntDesign name="google" size={18} color="#DB4437" />
              <Text className="ml-3 text-sm font-semibold text-[#0F1419]">Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 flex-row h-14 border border-[#E1E8ED] rounded-lg bg-white justify-center items-center">
              <AntDesign name="github" size={18} color="#000" />
              <Text className="ml-3 text-sm font-semibold text-[#0F1419]">GitHub</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}