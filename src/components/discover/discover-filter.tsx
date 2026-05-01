import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface IDiscoverFilterPeople {
  onSearch: (text: string) => void;
  onGender: (gender: string) => void;
  onLimit?: (limit: number) => void; // Fixed: Added back to interface
}

const GENDERS = [
  { label: 'All', value: '' },
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
];

// Brand Colors mapping
const G_ACTIVE_PILL = "bg-[#E6F7ED] border-[#00AA45]";
const G_TEXT_ACTIVE = "text-[#00AA45]";

export default function DiscoverFilterPeople({ onSearch, onGender, onLimit }: IDiscoverFilterPeople) {
  const [search, setSearch] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
    onSearch(text);
  }, [onSearch]);

  const handleGender = useCallback((value: string) => {
    setSelectedGender(value);
    onGender(value);
  }, [onGender]);

  return (
    <View className="pt-[14px] pb-[12px] bg-white border-b-[0.5px] border-[#E8E8E8]">

      {/* Search */}
      <View className="flex-row items-center bg-[#F6F6F6] rounded-[12px] px-3 h-[44px] mx-[14px] mb-[12px] border-[0.5px] border-[#EBEBEB]">
        <Ionicons name="search-outline" size={18} color="#999" />
        <TextInput
          placeholder="Search by name..."
          placeholderTextColor="#999"
          className="flex-1 ml-2 text-[14px] text-[#111]"
          value={search}
          onChangeText={handleSearch}
          returnKeyType="search"
          autoCorrect={false}
        />
        {search.length > 0 && (
          <TouchableOpacity 
            onPress={() => handleSearch('')} 
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={18} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>

      {/* Gender - FIXED: Corrected closing tag from </View> to </ScrollView> */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 14, gap: 8 }}
      >
        {GENDERS.map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => handleGender(item.value)}
            activeOpacity={0.7}
            className={`px-4 py-[7px] rounded-full bg-[#F5F5F5] border-[0.5px] border-[#E0E0E0] ${
              selectedGender === item.value ? G_ACTIVE_PILL : ""
            }`}
          >
            <Text className={`text-[13px] font-medium ${
              selectedGender === item.value ? `${G_TEXT_ACTIVE} font-semibold` : "text-[#777]"
            }`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
