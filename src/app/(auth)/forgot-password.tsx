import React from 'react';
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

export default function ForgotPasswordScreen() {
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
          {/* Top Navigation Bar */}
          <View className="flex-row items-center justify-between mb-10">
            <TouchableOpacity>
              <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-[#0F1419]">Recover Access</Text>
            <View className="w-6" /> {/* Spacer for centering title */}
          </View>

          {/* Icon Badge */}
          <View className="items-start mb-10">
            <View className="bg-[#E6F6EC] p-4 rounded-2xl">
              <MaterialCommunityIcons name="lock-reset" size={32} color="#00AA45" />
            </View>
          </View>

          {/* Header Section */}
          <Text className="text-4xl font-extrabold text-[#0F1419] mb-3">
            Recover Access
          </Text>
          <Text className="text-base text-[#657786] mb-10 leading-6">
            Enter your email. We'll send you a link to reset your password.
          </Text>

          {/* Form Section */}
          <View className="mb-8">
            <Text className="text-sm font-bold text-[#0F1419] mb-2">Email Address</Text>
            <View className="flex-row items-center border border-[#E1E8ED] rounded-xl bg-white px-4 h-14">
              <Feather name="mail" size={20} color="#A0ABC0" />
              <TextInput
                className="flex-1 ml-3 text-base text-[#0F1419]"
                placeholder="name@example.com"
                placeholderTextColor="#A0ABC0"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity className="bg-[#00AA45] h-14 rounded-xl justify-center items-center mb-10 shadow-lg shadow-[#00AA45]/20">
            <Text className="text-base font-bold text-white">Send Reset Link</Text>
          </TouchableOpacity>

          {/* Footer Navigation */}
          <View className="flex-row items-center justify-center mt-auto">
            <Text className="text-sm text-[#657786]">Remember your password? </Text>
            <TouchableOpacity>
              <Text className="text-sm font-bold text-[#00AA45]">Log in</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}