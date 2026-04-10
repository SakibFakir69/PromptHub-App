import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Share, StatusBar} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Clipboard from 'expo-clipboard';
import { useGetPromptByIdQuery } from "@/src/store/features/feed/feed.features";
import LoadingScreen from "@/src/components/ui/loading-screen";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PromptDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const { data: response, isLoading } = useGetPromptByIdQuery(id);
  const item = response?.data;

  const handleCopy = async () => {
    if (!item?.prompt) return;
    await Clipboard.setStringAsync(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({ 
        message: `🔥 Check out this AI Prompt: ${item.title}\n\n${item?.prompt}\n\nShared via PromptApp` 
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (!item) return (
    <View className="items-center justify-center flex-1 p-6 bg-white">
      <Ionicons name="search-outline" size={64} color="#D1D5DB" />
      <Text className="mt-4 text-xl font-bold text-gray-900">Prompt not found</Text>
      <TouchableOpacity onPress={() => router.back()} className="px-6 py-3 mt-4 bg-black rounded-full">
        <Text className="font-semibold text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* --- Modern Header --- */}
      <SafeAreaView className="bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between px-5 py-3">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="items-center justify-center w-10 h-10 rounded-full bg-gray-50"
          >
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-base font-bold text-gray-900">Details</Text>
          <TouchableOpacity 
            onPress={handleShare} 
            className="items-center justify-center w-10 h-10 rounded-full bg-gray-50"
          >
            <Ionicons name="share-outline" size={20} color="#111827" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* --- Hero Section --- */}
        <View className="px-6 py-6">
          <View className="flex-row items-center mb-3 space-x-2">
            {item.category?.map((cat: string) => (
              <View key={cat} className="px-3 py-1 border border-indigo-100 rounded-full bg-indigo-50">
                <Text className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-tighter">{cat}</Text>
              </View>
            ))}
          </View>
          
          <Text className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-gray-900">
            {item.title}
          </Text>

          {/* Author Card */}
          <View className="flex-row items-center p-3 border border-gray-100 bg-gray-50 rounded-2xl">
            <View className="items-center justify-center w-12 h-12 overflow-hidden bg-indigo-500 border-2 border-white rounded-full shadow-sm">
              {item.createdBy?.avatar ? (
                <Image source={{ uri: item.createdBy.avatar }} className="w-full h-full" />
              ) : (
                <Text className="text-lg font-bold text-white">{item.createdBy?.name?.charAt(0)}</Text>
              )}
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-sm font-bold text-gray-900">{item.createdBy?.name}</Text>
              <Text className="text-xs text-gray-500">Curator • {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
            </View>
            <TouchableOpacity className="px-4 py-2 bg-white border border-gray-200 rounded-xl">
                <Text className="text-xs font-bold text-gray-900">Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- The Content (Glassmorphic Code Block) --- */}
        <View className="px-5 mb-8">
          <View className="bg-[#0f172a] rounded-[32px] overflow-hidden shadow-xl shadow-indigo-200">
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
              <View className="flex-row space-x-1.5">
                <View className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <View className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <View className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </View>
              <Text className="text-gray-500 text-[10px] font-black tracking-widest">ENGINE: GPT-4</Text>
            </View>
            
            <View className="p-6">
              <Text className="font-mono text-[15px] leading-7 text-indigo-50">
                {item.prompt}
              </Text>
            </View>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handleCopy}
              className={`m-4 py-4 rounded-2xl flex-row items-center justify-center space-x-2 ${copied ? 'bg-emerald-500' : 'bg-white'}`}
            >
              <Ionicons name={copied ? "checkmark-circle" : "copy"} size={18} color={copied ? "white" : "black"} />
              <Text className={`font-bold text-sm ${copied ? 'text-white' : 'text-black'}`}>
                {copied ? "COPIED TO CLIPBOARD" : "COPY PROMPT"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Metadata & Stats --- */}
        <View className="px-6 space-y-6">
          <View>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-[2px] mb-3">KEYWORDS</Text>
            <View className="flex-row flex-wrap gap-2">
              {item.tags?.map((tag: string) => (
                <View key={tag} className="px-4 py-2 border border-gray-100 rounded-xl bg-gray-50">
                    <Text className="text-sm font-medium text-gray-600">#{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="flex-row space-x-4">
            <View className="items-center flex-1 p-4 border border-gray-100 bg-gray-50 rounded-2xl">
                <Text className="text-xl font-black text-gray-900">{item.upVote}</Text>
                <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">Upvotes</Text>
            </View>
            <View className="items-center flex-1 p-4 border border-gray-100 bg-gray-50 rounded-2xl">
                <Text className="text-xl font-black text-gray-900">{item.downVote}</Text>
                <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">Downvotes</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* --- Bottom Floating Action Bar --- */}
      <View className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white/80 backdrop-blur-md">
        <View className="flex-row space-x-4">
            <TouchableOpacity className="items-center justify-center flex-1 bg-black shadow-lg h-14 rounded-2xl shadow-black/20">
                <Text className="text-base font-bold text-white">Open in AI Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center bg-gray-100 border border-gray-200 w-14 h-14 rounded-2xl">
                <Ionicons name="bookmark-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}