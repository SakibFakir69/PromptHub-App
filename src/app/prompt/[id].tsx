import { View, Text } from "react-native";
import React from "react";
import { usePathname } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";

export default function PromptDetails() {
  const id = useLocalSearchParams();
  console.log(id);

  return (
    <View className="flex text-center">
      <Text>prompt card details page</Text>
    </View>
  );
}
