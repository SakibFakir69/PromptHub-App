import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Settings, Share2 } from "lucide-react-native";

import { IUser } from "@/src/types/user/user.types";
import { navigationRouter } from "@/src/navigation";

import { useGetMyPromptQuery, useGetSavedPromptQuery } from "@/src/store/features/prompt/prompt.features";


// Components
import MyPrompt from "../prompt/my-prompt";
import SavedPrompt from "../prompt/saved-prompt";
import ProfileHeader from "./profile-header";

const ProfileScreen = ({ user }: { user: IUser }) => {
  const [activeTab, setActiveTab] = useState<"my" | "saved">("my");

  // Fetching Data
  const { data: promptData, isLoading: isMyPromptLoading } = useGetMyPromptQuery(null);
  const { data: savedPromptData, isLoading: isSavedLoading } = useGetSavedPromptQuery(null);

  const myPrompts = promptData?.data || [];
  const savedPrompts = savedPromptData?.data || [];
  console.log(activeTab, " tab")
  console.log(myPrompts, promptData  , ' prompt')

  
  const renderHeader = () => (
    <ProfileHeader
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      promptCount={myPrompts.length}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Top Fixed Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-50">
       
        <TouchableOpacity 
          onPress={() => {/* Add Share Logic */}}
          className="p-2 rounded-full bg-gray-50"
        >
          <Share2 size={20} color="#111827" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-gray-900">Profile</Text>

        <TouchableOpacity 
          onPress={() => navigationRouter.goSetting()}
          className="p-2 rounded-full bg-gray-50"
        >
          <Settings size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Main List Body */}
      <View className="flex-1">
        {activeTab === "my" ? (
          <MyPrompt 
            data={myPrompts} 
            isLoading={isMyPromptLoading}
            ListHeaderComponent={renderHeader} 
          />
        ) : (
          <SavedPrompt 
            prompt={savedPrompts} 
            isLoading={isSavedLoading} 
            ListHeaderComponent={renderHeader} 
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;