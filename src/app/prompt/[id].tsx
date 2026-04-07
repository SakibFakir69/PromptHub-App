import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import LoadingScreen from "@/src/components/ui/loading-screen";
import { useGetPromptByIdQuery } from "@/src/store/features/feed/feed.features";


export default function PromptDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  // Fetch specific prompt data
  const { data:item, isLoading, error } = useGetPromptByIdQuery(id);
  
  console.log(item, id);

  if (isLoading) return <LoadingScreen />;
 

 

  return (
    <ScrollView className="flex-1 bg-white">
     {JSON.stringify(item)}
    </ScrollView>
  );
}