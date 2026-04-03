import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Alert, Image, ActivityIndicator } from 'react-native';
import { X, Globe, Image as ImageIcon, Maximize2, Plus, Trash2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';

import { CreatePromptValidation } from '@/src/validation/tabs/tabs.validation';
import { CreatePromptType } from '@/src/types/tabs/tabs.type';

const CreatePromptScreen = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePromptType>({
    // resolver: zodResolver(CreatePromptValidation),
    defaultValues: {
      title: "",
      prompt: "",
      tags: [],
      image: ""
    },
  });

  const currentTags = watch("tags") || [];
  const selectedImage = watch("image");

  // Tag Logic
  const addTag = () => {
    if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
      setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue("tags", currentTags.filter(t => t !== tagToRemove));
  };

  // Image Picker Logic
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need gallery permissions to make this work!');
      return;
    }

    setLoadingImage(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      // Storing the base64 string in the form state
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setValue("image", base64);
    } 
    setLoadingImage(false);
  };

  const onSubmit: SubmitHandler<CreatePromptType> = (data) => {
    console.log("Form Data:", { ...data, isPublic });
    Alert.alert("Success", "Prompt created successfully!");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity>
          <Text className="text-lg text-gray-500">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Create Prompt</Text>
        <TouchableOpacity 
          className="px-6 py-2 rounded-lg bg-emerald-500 active:opacity-80" 
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-base font-bold text-white">Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text className="mb-2 text-2xl font-bold text-gray-900">Prompt Title</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`text-xl font-medium text-gray-800 ${errors.title ? 'mb-1' : 'mb-6'}`}
              placeholder="Give your prompt a catchy name..."
              placeholderTextColor="#A0AEC0"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.title && <Text className="mb-4 text-xs text-red-500">{errors.title.message}</Text>}

        {/* Prompt */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-sm font-semibold text-gray-500 uppercase">The Prompt</Text>
          <Maximize2 size={16} color="#718096" />
        </View>
        <Controller
          control={control}
          name="prompt"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className={`border ${errors.prompt ? 'border-red-500' : 'border-gray-200'} rounded-2xl min-h-[200px] p-4 mb-2`}>
              <TextInput
                className="text-base text-gray-800"
                placeholder="Paste your system prompt..."
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                textAlignVertical="top"
              />
            </View>
          )}
        />
        {errors.prompt && <Text className="mb-4 text-xs text-red-500">{errors.prompt.message}</Text>}

        {/* Categories */}
        <Text className="mb-3 text-sm font-semibold text-gray-500 uppercase">Categories</Text>
        <View className="flex-row items-center mb-4 space-x-2 gap-x-2">
          <TextInput
            className="flex-1 px-4 py-2 text-gray-800 border border-gray-200 rounded-xl bg-gray-50"
            placeholder="e.g. Coding"
            value={tagInput}
            onChangeText={setTagInput}
            onSubmitEditing={addTag}
          />
          <TouchableOpacity onPress={addTag} className="p-2 bg-gray-100 rounded-xl">
            <Plus size={24} color="#10B981" />
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap gap-2 mb-8">
          {currentTags.map((tag) => (
            <View key={tag} className="flex-row items-center bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <Text className="mr-1 font-medium text-emerald-700">#{tag}</Text>
              <TouchableOpacity onPress={() => removeTag(tag)}>
                <X size={14} color="#047857" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Image Preview Area */}
        {selectedImage ? (
          <View className="relative w-full h-48 mb-6 overflow-hidden border border-gray-200 rounded-2xl">
            <Image source={{ uri: selectedImage }} className="w-full h-full" resizeMode="cover" />
            <TouchableOpacity 
              onPress={() => setValue("image", "")}
              className="absolute p-2 rounded-full top-2 right-2 bg-black/50"
            >
              <Trash2 size={18} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Toggle Card */}
        <View className="flex-row items-center p-4 mb-6 border border-gray-100 bg-gray-50 rounded-2xl">
          <View className="p-2 rounded-full bg-emerald-100">
            <Globe size={20} color="#059669" />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-base font-bold text-gray-900">Public Access</Text>
            <Text className="text-xs text-gray-500">Anyone can see and use this prompt</Text>
          </View>
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#E2E8F0', true: '#10B981' }}
          />
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View className="p-4 border-t border-gray-100">
        <TouchableOpacity 
          onPress={pickImage}
          disabled={loadingImage}
          className="flex-row items-center justify-center w-full py-4 border border-gray-200 rounded-2xl active:bg-gray-50"
        >
          {loadingImage ? (
            <ActivityIndicator color="#1A202C" />
          ) : (
            <>
              <ImageIcon size={20} color="#1A202C" />
              <Text className="ml-2 text-lg font-bold text-gray-900">
                {selectedImage ? "Change Cover Image" : "Add Cover Image"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreatePromptScreen;