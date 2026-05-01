import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Define the shape of a single User based on your logs

interface UserProps {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
  isVerify?: boolean;
}

// FlatList renderItem provides the item wrapped in an object: { item: UserProps }
export default function DiscoverCard({ item }: { item: UserProps }) {

    // console.log(item);
    
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      className="flex-row items-center p-4 bg-white border-b border-gray-100"
    >
      {/* Avatar */}
      <View className="mr-3">
        {item.avatar ? (
          <Image 
            source={{ uri: item.avatar }} 
            className="w-12 h-12 bg-gray-200 rounded-full" 
          />
        ) : (
          <View className="items-center justify-center w-12 h-12 border rounded-full bg-slate-200 border-slate-300">
            <Text className="text-lg font-bold text-slate-500">
              {item.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* User Info */}
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="mr-1 text-base font-bold text-black">
            {item.name}
          </Text>
          {item.isVerify && (
            <View className="bg-[#00AA45] rounded-full px-1 justify-center items-center">
              <Text className="text-white text-[10px] leading-4">✓</Text>
            </View>
          )}
        </View>
        <Text className="text-sm text-gray-500" numberOfLines={1}>
          {item.bio || "No bio available"}
        </Text>
      </View>

      {/* Action Button */}
      {/* <TouchableOpacity className="px-4 py-2 bg-black rounded-lg">
        <Text className="text-xs font-semibold text-white">Follow</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
}