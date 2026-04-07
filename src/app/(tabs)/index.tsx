import { View, FlatList } from "react-native";
import React, { useState } from "react";
import { useGetFeedQuery } from "@/src/store/features/feed/feed.features";
import PromptCard from "@/src/components/feed/feed-card";
import HeaderComponent from "@/src/components/feed/feed-header";
import LoadingScreen from "@/src/components/ui/loading-screen";
import { TABS } from "@/src/constant/TABS";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const [cursor, setCursor] = useState("");

  const {
    data: getFeed,
    isLoading,
    isFetching,
  } = useGetFeedQuery({ cursor: cursor });

  const feedData = getFeed?.data || [];
  const nextCursor = getFeed?.nextCursor;

  const handelTab = (tab: string) => {
    setActiveTab(tab);
    console.log(tab);
  };

  const handelLoadMore = () => {
    setCursor(nextCursor);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <FlatList
        data={feedData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PromptCard item={item} />}
        contentContainerClassName="py-3"
        ListHeaderComponent={
          <HeaderComponent activeTab={activeTab} onTabPress={handelTab} />
        }
        ListFooterComponent={isFetching ? <LoadingScreen /> : null}
        onEndReached={handelLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={isFetching}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
