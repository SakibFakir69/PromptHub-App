import { View, Text, FlatList } from "react-native";
import React from "react";
import DiscoverCard from "./discover-card";
import DiscoverFilterPeople from "./discover-filter";

interface IDiscoverPeople {
  data: any;
  isLoading: boolean;
  // onLoadMore:()=> void
  onSearch: (text: string) => void;
  onGender: (text: string) => void;
  onLimit?: (limit: number) => void
  handleLoadMore: () => void;
}



export default function DiscoverPeople({ data, isLoading, onSearch, onGender, onLimit, handleLoadMore }: IDiscoverPeople) {

  return (
    <View className="flex-1">
      <FlatList
        data={data}
        renderItem={({ item }) => <DiscoverCard item={item} />}
        ListHeaderComponent={
          <DiscoverFilterPeople onGender={onGender} onSearch={onSearch} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 0, 
        }}

      />
    </View>
  );
}
