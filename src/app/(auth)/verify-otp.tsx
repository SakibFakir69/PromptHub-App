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
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function VerifyOtp() {
  
  const [otp, setOtp] = useState(['', '', '', '']);
  

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
            <Text className="flex-1 text-center mr-6 text-lg font-bold text-[#0F1419]">OTP Verification</Text>
          </View>

          {/* Icon Badge */}
          <View className="items-start mb-10">
            <View className="bg-[#E6F6EC] p-4 rounded-2xl">
              <MaterialCommunityIcons name="shield-check-outline" size={32} color="#00AA45" />
            </View>
          </View>

          {/* Header Section */}
          <Text className="text-4xl font-extrabold text-[#0F1419] mb-3">
            Verify OTP
          </Text>
          <Text className="text-base text-[#657786] mb-10 leading-6">
            We ve sent a 4-digit code to your email. Enter it below to verify your account.
          </Text>

          {/* OTP Input Section */}
          <View className="flex-row justify-between mb-10">
            {[0, 1, 2, 3].map((index) => (
              <View key={index} className="w-[70px] h-[70px] border border-[#E1E8ED] rounded-2xl bg-white items-center justify-center">
                <TextInput
                  className="text-2xl font-bold text-[#0F1419] text-center w-full h-full"
                  keyboardType="number-pad"
                  maxLength={1}
                  placeholder="0"
                  placeholderTextColor="#E1E8ED"
                />
              </View>
            ))}
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity className="bg-[#00AA45] h-14 rounded-xl justify-center items-center mb-8 shadow-lg shadow-[#00AA45]/20">
            <Text className="text-base font-bold text-white">Verify & Continue</Text>
          </TouchableOpacity>

          {/* Resend Logic */}
          <View className="flex-row items-center justify-center">
            <Text className="text-sm text-[#657786]">Didn t receive code? </Text>
            <TouchableOpacity>
              <Text className="text-sm font-bold text-[#00AA45]">Resend Code</Text>
            </TouchableOpacity>
          </View>

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