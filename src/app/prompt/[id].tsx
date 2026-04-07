import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Share } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Clipboard from 'expo-clipboard';
import { useGetPromptByIdQuery } from "@/src/store/features/feed/feed.features";
import LoadingScreen from "@/src/components/ui/loading-screen";

export default function PromptDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const { data: response, isLoading } = useGetPromptByIdQuery(id);
  const item = response?.data; // Extracting from your ReturnResponse wrapper

  const handleCopy = async () => {
    await Clipboard.setStringAsync(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: `Check out this prompt: ${item.title}\n\n${item?.prompt}` });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (!item) return <View className="items-center justify-center flex-1"><Text>Prompt not found</Text></View>;

  return (
    <View className="flex-1 bg-white">
      {/* --- Custom Header --- */}
      <View className="flex-row items-center justify-between px-5 pb-4 border-b pt-14 border-gray-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Prompt Details</Text>
        <TouchableOpacity onPress={handleShare} className="p-2 -mr-2">
          <Text className="text-xl"> share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* --- Hero Section: Title & Author --- */}
        <View className="px-6 py-6">
          <View className="flex-row items-center mb-4">
            {item.category?.map((cat: string) => (
              <View key={cat} className="px-3 py-1 mr-2 rounded-full bg-blue-50">
                <Text className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{cat}</Text>
              </View>
            ))}
          </View>
          
          <Text className="mb-6 text-3xl font-black leading-tight text-gray-900">
            {item.title}
          </Text>

          <View className="flex-row items-center">
            <View className="items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
              {item.createdBy?.avatar ? (
                <Image source={{ uri: item.createdBy.avatar }} className="w-full h-full" />
              ) : (
                <Text className="font-bold text-gray-500">{item.createdBy?.name?.charAt(0)}</Text>
              )}
            </View>
            <View className="ml-3">
              <Text className="text-sm font-bold text-gray-900">{item.createdBy?.name}</Text>
              <Text className="text-xs text-gray-400">Published on {new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
          </View>
        </View>

        {/* --- The Content (Prompt Block) --- */}
        <View className="px-5 mb-6">
          <View className="bg-[#0e1512] rounded-3xl p-6 shadow-2xl">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-500 text-[10px] font-bold tracking-[2px]">RAW PROMPT</Text>
              <TouchableOpacity 
                onPress={handleCopy}
                className={`px-4 py-1.5 rounded-lg border ${copied ? 'bg-emerald-500 border-emerald-500' : 'border-gray-700'}`}
              >
                <Text className="text-white text-[10px] font-bold">
                  {copied ? "COPIED!" : "COPY"}
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text className="font-mono text-base leading-relaxed text-green-400 selection:bg-green-900">
              {item.prompt}
            </Text>
          </View>
        </View>

        {/* --- Tags Section --- */}
        <View className="flex-row flex-wrap gap-2 px-6 mb-10">
          {item.tags?.map((tag: string) => (
            <Text key={tag} className="text-sm italic font-medium text-gray-400">
              #{tag}
            </Text>
          ))}
        </View>

        {/* --- Action Stats --- */}
        <View className="flex-row justify-around p-6 mx-6 mb-10 border border-gray-100 bg-gray-50 rounded-3xl">
          <View className="items-center">
            <Text className="text-xl font-black text-gray-900">{item.upVote}</Text>
            <Text className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Upvotes</Text>
          </View>
          <View className="w-[1px] h-10 bg-gray-200" />
          <View className="items-center">
            <Text className="text-xl font-black text-gray-900">{item.downVote}</Text>
            <Text className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Downvotes</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}