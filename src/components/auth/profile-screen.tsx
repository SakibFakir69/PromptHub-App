

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, MoreVertical, Pencil, ThumbsUp, MessageSquare, Home, Compass, Plus, Bookmark, User } from 'lucide-react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';


const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FBFA]">
      {/* Header Nav */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <ArrowLeft color="#000" size={24} />
        <Text className="text-lg font-bold">Profile</Text>
        <MoreVertical color="#000" size={24} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        {/* Avatar & Info */}
        <View className="items-center px-6 pt-6">
          <View className="relative">
            <View className="p-1 border-2 border-green-500 rounded-full">
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?u=sarah' }} 
                className="w-24 h-24 rounded-full"
              />
            </View>
            <View className="absolute bottom-1 right-1 bg-green-500 p-1.5 rounded-full border-2 border-white">
              <Pencil color="white" size={12} />
            </View>
          </View>
          
          <Text className="mt-4 text-2xl font-bold">Sarah Jenkins</Text>
          <Text className="font-medium text-green-500">@sarah_codes</Text>
          <Text className="px-4 mt-3 leading-5 text-center text-slate-500">
            Building tools for the future of AI. Exploring the limits of LLMs through prompt engineering and creative logic.
          </Text>

          <TouchableOpacity className="w-full py-3 mt-6 bg-green-500 rounded-lg shadow-sm shadow-green-400">
            <Text className="text-lg font-bold text-center text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View className="flex-row mt-8 bg-white border-y border-slate-200">
          <StatItem label="PROMPTS" value="42" last={undefined} />
          <StatItem label="FOLLOWERS" value="1.2k" last={undefined} />
          <StatItem label="UPVOTES" value="8.5k" last />
        </View>

        {/* Tabs */}
        <View className="flex-row justify-around bg-white border-b border-slate-100">
          <TabItem label="Prompts" active />
          
        </View>

        {/* Feed */}
        <View className="p-4 space-y-4">
          <PromptCard 
            title="System Architect Prompt"
            version="V2.1"
            content="Act as a Lead Systems Architect. Analyze the following requirements and provide a high-level design document including..."
            likes="342"
            comments="18"
            date="2 days ago"
          />
          <PromptCard 
            title="Minimalist UI Refiner"
            version="V1.0"
            content="Refactor this UI code to match modern minimalist standards. Focus on whitespace usage, color harmony, and accessibility..."
            likes="891"
            comments="45"
            date="1 week ago"
          />
        </View>
        <View className="h-20" /> {/* Spacer for Bottom Nav */}
      </ScrollView>

      {/* Floating Bottom Nav */}
      <View className="absolute bottom-0 flex-row items-center justify-around w-full px-2 py-3 bg-white border-t border-slate-100">
        <NavItem icon={<Home size={24} color="#64748b" />} label="Home" />
        <NavItem icon={<Compass size={24} color="#64748b" />} label="Explore" />
        <View className="-top-6">
          <View className="p-4 bg-green-500 rounded-full shadow-lg shadow-green-600">
            <Plus size={28} color="white" />
          </View>
        </View>
        <NavItem icon={<Bookmark size={24} color="#64748b" />} label="Saved" />
        <NavItem icon={<User size={24} color="#22c55e" />} label="Profile" active />
      </View>
    </SafeAreaView>
  );
};

// --- Sub-Components ---

const StatItem = ({ label, value, last }) => (
  <View className={`flex-1 items-center py-4 ${!last ? 'border-r border-slate-100' : ''}`}>
    <Text className="text-lg font-bold text-slate-800">{value}</Text>
    <Text className="text-[10px] text-slate-400 tracking-widest">{label}</Text>
  </View>
);

const TabItem = ({ label, active }) => (
  <TouchableOpacity className={`py-4 px-6 ${active ? 'border-b-2 border-green-500' : ''}`}>
    <Text className={`font-semibold ${active ? 'text-black' : 'text-slate-400'}`}>{label}</Text>
  </TouchableOpacity>
);

const PromptCard = ({ title, version, content, likes, comments, date }) => (
  <View className="p-4 mb-4 bg-white border shadow-sm rounded-xl border-slate-100">
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-row items-center space-x-2">
        <View className="p-1 rounded bg-slate-100">
           <Text>📟</Text> 
        </View>
        <Text className="font-bold text-slate-800">{title}</Text>
      </View>
      <View className="px-2 py-1 rounded bg-green-50">
        <Text className="text-green-600 text-[10px] font-bold">{version}</Text>
      </View>
    </View>
    
    <View className="p-3 mb-4 rounded-lg bg-slate-50">
      <Text className="font-mono text-xs leading-5 text-slate-600" numberOfLines={3}>
        {content}
      </Text>
    </View>

    <View className="flex-row items-center justify-between">
      <View className="flex-row space-x-4">
        <View className="flex-row items-center space-x-1">
          <ThumbsUp size={16} color="#64748b" />
          <Text className="text-xs text-slate-500">{likes}</Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MessageSquare size={16} color="#64748b" />
          <Text className="text-xs text-slate-500">{comments}</Text>
        </View>
      </View>
      <Text className="text-xs italic text-slate-400">{date}</Text>
    </View>
  </View>
);

const NavItem = ({ icon, label, active }) => (
  <View className="items-center space-y-1">
    {icon}
    <Text className={`text-[10px] ${active ? 'text-green-600 font-bold' : 'text-slate-500'}`}>{label}</Text>
  </View>
);

export default ProfileScreen;