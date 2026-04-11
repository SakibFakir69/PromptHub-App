import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_ITEM_SIZE = (SCREEN_WIDTH - 4) / 3;

const SkeletonBox = ({
  className = "",
  width,
  height,
  borderRadius,
  animatedValue,
}: {
  className?: string;
  width?: number | string;
  height?: number;
  borderRadius?: number;
  animatedValue: Animated.Value;
}) => {
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", "#F3F4F6"],
  });

  return (
    <Animated.View
      className={className}
      style={[
        { backgroundColor },
        width !== undefined ? { width: width as number } : null,
        height !== undefined && { height },
        borderRadius !== undefined && { borderRadius },
      ]}
    />
  );
};

const ProfileScreenSkeleton = () => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [shimmer]);

  const S = (
    props: Omit<Parameters<typeof SkeletonBox>[0], "animatedValue">,
  ) => <SkeletonBox {...props} animatedValue={shimmer} />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Navigation Bar */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <S width={36} height={36} borderRadius={18} />
          <S width={64} height={18} borderRadius={6} />
          <S width={36} height={36} borderRadius={18} />
        </View>

        {/* Profile Identity Section */}
        <View className="items-center px-8 mt-4">
          {/* Avatar + Badge */}
          <View className="relative">
            <S width={112} height={112} borderRadius={56} />
            <S
              className="absolute bottom-1 right-1"
              width={24}
              height={24}
              borderRadius={12}
            />
          </View>

          {/* Name */}
          <S className="mt-4" width={160} height={22} borderRadius={6} />
          {/* Email */}
          <S className="mt-2" width={120} height={14} borderRadius={6} />
          {/* Bio */}
          <S className="mt-3" width={220} height={13} borderRadius={6} />
          <S className="mt-1.5" width={180} height={13} borderRadius={6} />

          {/* Tags */}
          <View className="flex-row flex-wrap justify-center mt-4">
            {[64, 80, 56, 72].map((w, i) => (
              <S
                key={i}
                className="m-1"
                width={w}
                height={28}
                borderRadius={8}
              />
            ))}
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row py-5 mt-8 border-gray-100 border-y bg-gray-50">
          <View className="items-center flex-1 gap-y-1.5">
            <S width={40} height={22} borderRadius={6} />
            <S width={52} height={11} borderRadius={6} />
          </View>

          <View className="items-center flex-1 gap-y-1.5 border-x border-gray-200">
            <S width={40} height={22} borderRadius={6} />
            <S width={60} height={11} borderRadius={6} />
          </View>

          <View className="items-center flex-1 gap-y-1.5">
            <S width={40} height={22} borderRadius={6} />
            <S width={60} height={11} borderRadius={6} />
          </View>
        </View>

        {/* Edit Profile Button */}
        <View className="px-6 mt-6">
          <S className="w-full" height={48} borderRadius={12} />
        </View>

        {/* Content Tabs */}
        <View className="flex-row mt-8 border-b border-gray-100">
          <View className="items-center flex-1 pb-3 border-b-2 border-black">
            <S width={22} height={22} borderRadius={4} />
          </View>
          <View className="items-center flex-1 pb-3">
            <S width={22} height={22} borderRadius={4} />
          </View>
        </View>

        {/* Post Grid */}
        <View className="flex-row flex-wrap gap-0.5 mt-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <S
              key={i}
              width={GRID_ITEM_SIZE}
              height={GRID_ITEM_SIZE}
              borderRadius={0}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreenSkeleton;
