import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// Using Ionicons and MaterialIcons from the Expo library
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SavedPrompt({ prompt, isLoading }) {
  console.log(prompt ,'prompt')
  
  // 1. Loading State
  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="small" color="#6366f1" />
        <Text className="mt-4 text-sm font-medium text-gray-400">Loading library...</Text>
      </View>
    );
  }

  // 2. Empty State
  if (!prompt || prompt.length === 0) {
    return (
      <View className="items-center justify-center flex-1 px-10 bg-white">
        <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-slate-50">
          <Ionicons name="bookmark-outline" size={32} color="#cbd5e1" />
        </View>
        <Text className="text-xl font-bold text-center text-gray-900">No saved prompts</Text>
        <Text className="mt-2 leading-6 text-center text-gray-500">
          Your saved items will live here. Start exploring and bookmark your favorites!
        </Text>
      </View>
    );
  }

  // 3. Content State
  return (
    <FlatList
      data={prompt}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const data = item.promptId; 
        
        return (
          <TouchableOpacity 
            activeOpacity={0.8}
            className="p-5 mb-5 bg-white border border-gray-100 shadow-xl shadow-black/5 rounded-[24px]"
          >
            {/* Header: Categories */}
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-row flex-wrap flex-1">
                {data?.category?.map((cat, index) => (
                  <View key={index} className="px-2.5 py-1 mr-2 mb-1 rounded-lg bg-indigo-50">
                    <Text className="text-[11px] font-semibold text-indigo-600 capitalize">
                      {cat}
                    </Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity>
                 <Ionicons name="ellipsis-horizontal" size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <Text className="mb-2 text-lg font-bold leading-6 text-gray-900">
              {data?.title}
            </Text>
            <Text numberOfLines={3} className="text-sm leading-6 text-gray-600">
              {data?.prompt}
            </Text>

            {/* Footer */}
            <View className="flex-row items-center justify-between pt-5 mt-5 border-t border-slate-50">
               <View className="flex-row items-center">
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="arrow-up-circle-outline" size={18} color="#6366f1" />
                    <Text className="ml-1.5 text-xs font-bold text-gray-700">
                      {data?.upVote || 0}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#94a3b8" />
                    <Text className="ml-1 text-[11px] text-gray-400">
                      2d ago
                    </Text>
                  </View>
               </View>
               
               <TouchableOpacity className="flex-row items-center px-4 py-2 bg-gray-900 rounded-xl">
                  <Ionicons name="copy-outline" size={14} color="white" />
                  <Text className="ml-2 text-xs font-bold text-white">Use Prompt</Text>
               </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}