import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Camera, Check, ChevronDown, X } from "lucide-react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IUser, GenderEnum } from "@/src/types/user/user.types";
import { editProfileSchema } from "@/src/validation/profile/profile.validation";
import { SUGGESTED_TAGS } from "@/src/utils/profile/profile.utils";
import { GENDER_OPTIONS } from "@/src/constant/profile.contant";
import { useUpdateProfileMutation } from "@/src/store/features/profile/profile.features";

type EditProfileFormValues = z.infer<typeof editProfileSchema>;
interface EditProfileScreenProps {
  user: IUser;
  onBack: () => void;
}

// OPTIMIZE COMPONENT


const EditProfileScreen = ({ user, onBack }: EditProfileScreenProps) => {
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditProfileFormValues>({
    // resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      gender: (user?.gender as GenderEnum) || GenderEnum.MALE,
      tags: user?.tags || [],
    },
  });

  // live watch for bio char count and tags list
  const bioValue = useWatch({ control, name: "bio" }) ?? "";
  const tagsValue = useWatch({ control, name: "tags" }) ?? [];

  const onSubmit = async (data: EditProfileFormValues) => {
    console.log(data);
    
    

    try {
        const result = await updateProfile(data).unwrap();
        console.log(result);
        onBack();
        
        
    } catch (error) {
        console.log(error);
        
    }
    
  };

  const addTag = (tag: string) => {
    const cleaned = tag.trim().replace(/^#/, "");
    if (!cleaned) return;
    const current = getValues("tags");
    if (current.includes(cleaned) || current.length >= 8) return;
    setValue("tags", [...current, cleaned], { shouldDirty: true });
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    const current = getValues("tags");
    setValue(
      "tags",
      current.filter((t) => t !== tag),
      { shouldDirty: true },
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            className="p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} color="#374151" />
          </TouchableOpacity>

          <Text className="text-base font-bold text-gray-900">
            Edit Profile
          </Text>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
            disabled={isSubmitting || !isDirty}
            className={`flex-row items-center gap-1.5 px-4 py-2 rounded-full ${
              isDirty && !isSubmitting ? "bg-black" : "bg-gray-300"
            }`}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Check size={14} color="#fff" />
                <Text className="text-sm font-semibold text-white">Save</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* ── Avatar ── */}
          <View className="items-center pt-8 pb-6">
            <View className="relative">
              <Image
                source={{
                  uri: user?.avatar || "https://via.placeholder.com/150",
                }}
                className="w-24 h-24 bg-gray-200 border-4 rounded-full border-gray-50"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                className="absolute bottom-0 right-0 items-center justify-center w-8 h-8 bg-black border-2 border-white rounded-full"
              >
                <Camera size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.7} className="mt-3">
              <Text className="text-sm font-semibold text-sky-500">
                Change photo
              </Text>
            </TouchableOpacity>
          </View>

          <View className="px-5 gap-y-5">
            {/* ── Name ── */}
            <View>
              <Text className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Name
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Your full name"
                    placeholderTextColor="#9CA3AF"
                    className={`h-12 px-4 rounded-xl text-sm text-gray-900 bg-gray-50 border ${
                      errors.name ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                )}
              />
              {errors.name && (
                <Text className="text-xs text-red-500 mt-1.5">
                  {errors.name.message}
                </Text>
              )}
            </View>

            {/* ── Email (read-only) ── */}
            <View>
              <Text className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Email
              </Text>
              <View className="flex-row items-center justify-between h-12 px-4 bg-gray-100 border border-gray-200 rounded-xl">
                <Text className="text-sm text-gray-400">{user?.email}</Text>
                <View className="bg-gray-200 px-2 py-0.5 rounded-md">
                  <Text className="text-xs text-gray-500">Read only</Text>
                </View>
              </View>
            </View>

            {/* ── Bio ── */}
            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Bio
                </Text>
                <Text
                  className={`text-xs ${bioValue.length > 150 ? "text-red-400" : "text-gray-400"}`}
                >
                  {bioValue.length}/160
                </Text>
              </View>
              <Controller
                control={control}
                name="bio"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Tell the world about yourself..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    maxLength={160}
                    textAlignVertical="top"
                    className={`px-4 py-3 rounded-xl text-sm text-gray-900 bg-gray-50 border min-h-24 ${
                      errors.bio ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                )}
              />
              {errors.bio && (
                <Text className="text-xs text-red-500 mt-1.5">
                  {errors.bio.message}
                </Text>
              )}
            </View>

            {/* ── Gender ── */}
            <View>
              <Text className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Gender
              </Text>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <View>
                    {
                      <TouchableOpacity
                        onPress={() => setShowGenderPicker((prev) => !prev)}
                        activeOpacity={0.7}
                        className="flex-row items-center justify-between h-12 px-4 border border-gray-200 rounded-xl bg-gray-50"
                      >
                        <Text className="text-sm text-gray-900">
                          {GENDER_OPTIONS?.find((o) => o.value === value)
                            ?.label ?? "Select"}
                        </Text>
                        <ChevronDown
                          size={16}
                          color="#6B7280"
                          style={{
                            transform: [
                              { rotate: showGenderPicker ? "180deg" : "0deg" },
                            ],
                          }}
                        />
                      </TouchableOpacity>
                    }

                    {showGenderPicker && (
                      <View className="mt-1 overflow-hidden bg-white border border-gray-200 rounded-xl">
                        {GENDER_OPTIONS?.map((option, index) => (
                          <TouchableOpacity
                            key={option.value}
                            onPress={() => {
                              onChange(option.value);
                              setShowGenderPicker(false);
                            }}
                            activeOpacity={0.7}
                            className={`h-11 px-4 flex-row items-center justify-between ${
                              index < GENDER_OPTIONS?.length - 1
                                ? "border-b border-gray-100"
                                : ""
                            } ${value === option.value ? "bg-gray-50" : "bg-white"}`}
                          >
                            <Text
                              className={`text-sm ${value === option.value ? "font-semibold text-gray-900" : "text-gray-700"}`}
                            >
                              {option.label}
                            </Text>
                            {value === option.value && (
                              <Check size={15} color="#111827" />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              />
            </View>

            {/* ── Tags ── */}
            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Interests
                </Text>
                <Text
                  className={`text-xs ${tagsValue.length >= 8 ? "text-red-400" : "text-gray-400"}`}
                >
                  {tagsValue.length}/8
                </Text>
              </View>

              {/* Selected tags */}
              {tagsValue.length > 0 && (
                <View className="flex-row flex-wrap mb-3">
                  {tagsValue.map((tag) => (
                    <View
                      key={tag}
                      className="flex-row items-center bg-sky-50 border border-sky-100 rounded-lg px-3 py-1.5 m-1"
                    >
                      <Text className="text-xs font-semibold text-sky-600 mr-1.5">
                        #{tag.toLowerCase()}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeTag(tag)}
                        hitSlop={8}
                      >
                        <X size={11} color="#0EA5E9" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {/* Tag input */}
              {tagsValue.length < 8 && (
                <View className="flex-row items-center gap-2 mb-3">
                  <TextInput
                    value={tagInput}
                    onChangeText={setTagInput}
                    onSubmitEditing={() => addTag(tagInput)}
                    placeholder="Add a tag..."
                    placeholderTextColor="#9CA3AF"
                    returnKeyType="done"
                    className="flex-1 h-10 px-4 text-sm text-gray-900 border border-gray-200 rounded-xl bg-gray-50"
                  />
                  <TouchableOpacity
                    onPress={() => addTag(tagInput)}
                    activeOpacity={0.8}
                    disabled={!tagInput.trim()}
                    className={`h-10 px-4 rounded-xl items-center justify-center ${
                      tagInput.trim() ? "bg-black" : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${tagInput.trim() ? "text-white" : "text-gray-400"}`}
                    >
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {errors.tags && (
                <Text className="mb-2 text-xs text-red-500">
                  {errors.tags.message}
                </Text>
              )}

              {/* Suggested tags */}
              <Text className="mb-2 text-xs text-gray-400">Suggested</Text>
              <View className="flex-row flex-wrap">
                {SUGGESTED_TAGS.filter((t) => !tagsValue.includes(t)).map(
                  (tag) => (
                    <TouchableOpacity
                      key={tag}
                      onPress={() => addTag(tag)}
                      activeOpacity={0.7}
                      disabled={tagsValue.length >= 8}
                      className={`border rounded-lg px-3 py-1.5 m-1 ${
                        tagsValue.length >= 8
                          ? "border-gray-100 opacity-40"
                          : "border-gray-200"
                      }`}
                    >
                      <Text className="text-xs font-medium text-gray-600">
                        #{tag.toLowerCase()}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
