import { StyleSheet, View } from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import { useGetDiscoverQuery } from "@/src/store/features/discover/discover.features";
import { SafeAreaView } from "react-native-safe-area-context";
import DiscoverPeople from "@/src/components/discover/discover-people";

// Performance Check: Component is now optimized with memoization
export default function DiscoverHome() {
  const [cursor, setCursor] = useState("");
  const [searchByName, setSearchByName] = useState("");
  const [searchByGender, setSearchByGender] = useState("");
  const [limit, setLimit] = useState(10);

  // RTK Query hook
  const { data, isLoading, isFetching } = useGetDiscoverQuery({
    cursor,
    name: searchByName,
    gender: searchByGender,
    limit,
  });

  const discoverData = useMemo(() => data?.data || [], [data?.data]);

  
  const handleSearchName = useCallback((name: string) => {
    
    setSearchByName(name);
    setCursor(""); 
  }, []);

  const handleSearchGender = useCallback((gender: string) => {
    setSearchByGender(gender);
    setCursor(""); 
  }, []);

  const handleLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
  }, []);

  const handleLoadMore = useCallback(() => {
   
    if (!isFetching && data?.nextCursor) {
      setCursor(data.nextCursor);
    }
  }, [isFetching, data?.nextCursor]);

  return (
    <SafeAreaView style={styles.container} className="">
      <DiscoverPeople
        data={discoverData}
        isLoading={isLoading || isFetching}
        onSearch={handleSearchName}
        onLimit={handleLimit}
        onGender={handleSearchGender}
        handleLoadMore={handleLoadMore}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});