import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDeletePromptMutation } from '@/src/store/features/prompt/prompt.features';

export default function SavedPrompt({ prompt, isLoading }) {
  const [deletePrompt, { isLoading: isLoadingDelete }] = useDeletePromptMutation();

  const handelDeletePrompt = async (id: string) => {
    // 1. Ask for Confirmation
    Alert.alert(
      "Remove Saved Prompt",
      "Are you sure you want to remove this from your library?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive", 
          onPress: async () => {
            try {
              // 2. Smooth Delete Operation
              const result = await deletePrompt({ promptId: id }).unwrap();
              // 3. Optional: Success Feedback (usually handled by RTK Query cache updates)
              console.log("Deleted successfully", result);
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Failed to remove the prompt. Please try again.");
            }
          } 
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="small" color="#6366f1" />
        <Text className="mt-4 text-sm font-medium text-gray-400">Loading library...</Text>
      </View>
    );
  }

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

  return (
    <FlatList
      data={prompt}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const data = item.promptId;
        
        // Handle case where prompt might have been deleted from global DB
        if (!data) return null;

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
              
              {/* DELETE TRIGGER (The ellipsis menu) */}
              <TouchableOpacity 
                disabled={isLoadingDelete}
                onPress={() => handelDeletePrompt(data._id)}
                className="p-1"
              >
                 {isLoadingDelete ? (
                   <ActivityIndicator size="small" color="#ef4444" />
                 ) : (
                   <Ionicons name="trash-outline" size={20} color="#ef4444" />
                 )}
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
                      Saved
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