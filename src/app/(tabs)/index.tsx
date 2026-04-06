import { View, Text, ScrollView, FlatList,TouchableOpacity } from "react-native";
import React from "react";
import { useGetFeedQuery } from "@/src/store/features/feed/feed.features";
import PromptCard from "@/src/components/feed/prompt-card";
import { Header } from "@react-navigation/elements";

const TABS = ["Trending", "Newest", "Following"] as const;
 const HeaderComponent = (
    <View className="flex-row p-4 px-4 py-4 bg-white border-b border-gray-200">
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
         
          className="py-3 mr-6"
        >
          <Text
           
          >
            {tab}
          </Text>
          
        </TouchableOpacity>
      ))}
    </View>
  );

export default function Home() {
  const { data: getFeed, isLoading } = useGetFeedQuery({ cursor: "" });
  console.log(getFeed);
  const feedData = getFeed?.data || [];

  return (
    <View>

        

      
        <FlatList
          data={feedData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PromptCard item={item} />}
          contentContainerClassName="py-3"
          ListHeaderComponent={HeaderComponent}
          stickyHeaderIndices={[0]}
          
          showsVerticalScrollIndicator={false}
        />
    
    </View>
  );
}
