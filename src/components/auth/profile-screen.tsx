import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  CheckCircle,
  Settings,
  Share2,
  LayoutGrid,
  Bookmark,
} from "lucide-react-native";
import { IUser } from "@/src/types/user/user.types";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigationRouter } from "@/src/navigation";
import SavedPrompt from "../prompt/saved-prompt";
import MyPrompt from "../prompt/my-prompt";
import { useGetMyPromptQuery, useGetSavedPromptQuery } from "@/src/store/features/prompt/prompt.features";
import saved from "@/src/app/(tabs)/saved";

const ProfileScreen = ({
  user,
  isLoading,
}: {
  user: IUser;
  isLoading: any;
}) => {
  const [activeTab, setActiveTab] = useState("my");
  const { data: promptData } = useGetMyPromptQuery(null);
  
  const {data:savedPromptData, isLoading:isSavedPromptLoading} = useGetSavedPromptQuery(null);
  console.log(savedPromptData , 'data')
  const myPromptData = promptData?.data || [];
  
  const savedPrompt = savedPromptData?.data || [];
  console.log(savedPrompt , ' saved')
  

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Fixed Top Navigation Bar - stays outside ScrollView */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="p-2 bg-gray-100 rounded-full"
        >
          <Share2 size={20} color="#374151" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-gray-900">Profile</Text>

        <TouchableOpacity
          onPress={() => navigationRouter.goSetting()}
          activeOpacity={0.7}
          className="p-2 bg-gray-100 rounded-full"
        >
          <Settings size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Profile Identity Section */}
        <View className="items-center px-8 mt-4">
          <View className="relative">
            <Image
              source={{
                uri: user?.avatar || "https://via.placeholder.com/150",
              }}
              className="bg-gray-200 border-4 rounded-full w-28 h-28 border-gray-50"
            />
            {user?.isVerify && (
              <View className="absolute bg-white rounded-full bottom-1 right-1">
                <CheckCircle size={24} color="#0EA5E9" fill="white" />
              </View>
            )}
          </View>

          <Text className="mt-4 text-2xl font-extrabold text-center text-gray-900">
            {user?.name}
          </Text>
          <Text className="font-medium text-gray-500">{user?.email}</Text>

          <Text className="px-2 mt-3 leading-5 text-center text-gray-600">
            {user?.bio || "No bio added yet."}
          </Text>

          {/* Tags / Interests */}
          <View className="flex-row flex-wrap justify-center mt-4">
            {user?.tags?.map((tag, index) => (
              <View
                key={index}
                className="bg-sky-50 px-3 py-1.5 rounded-lg m-1 border border-sky-100"
              >
                <Text className="text-xs font-semibold text-sky-600">
                  #{tag?.toLowerCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row py-5 mt-8 border-gray-100 border-y bg-gray-50/50">
          <View className="items-center flex-1">
            <Text className="text-xl font-bold text-gray-900">
              {myPromptData?.length}
            </Text>
            <Text className="mt-1 text-xs tracking-widest text-gray-500 uppercase">
              Prompts
            </Text>
          </View>
          <View className="items-center flex-1 border-gray-200 border-x">
            <Text className="text-xl font-bold text-gray-900">
              {user?.followers?.length}
            </Text>
            <Text className="mt-1 text-xs tracking-widest text-gray-500 uppercase">
              Followers
            </Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-xl font-bold text-gray-900">
              {user?.following?.length}
            </Text>
            <Text className="mt-1 text-xs tracking-widest text-gray-500 uppercase">
              Following
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row px-6 mt-6">
          <TouchableOpacity
            onPress={() => navigationRouter.goEditProfile()}
            className="items-center justify-center flex-1 h-12 bg-black shadow-sm rounded-xl"
            activeOpacity={0.8}
          >
            <Text className="text-base font-bold text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Content Tabs — sticky-style header */}
        <View className="flex-row mt-8 border-b border-gray-100">
          <TouchableOpacity
            onPress={() => setActiveTab("my")}
            className="items-center flex-1 pb-3"
          >
            <LayoutGrid
              size={22}
              color={activeTab === "my" ? "black" : "gray"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("saved")}
            className="items-center flex-1 pb-3"
          >
            <Bookmark
              size={22}
              color={activeTab === "saved" ? "black" : "gray"}
            />
          </TouchableOpacity>
        </View>

        {/* Prompt Feed */}
        <View>
          {activeTab === "my" ? (
            <MyPrompt data={myPromptData} />
          ) : (
            <SavedPrompt prompt={savedPrompt} isLoading={isSavedPromptLoading} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;