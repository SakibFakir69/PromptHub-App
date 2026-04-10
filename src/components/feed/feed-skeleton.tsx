


import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

function Bone({
  className,
  style,
}: {
  className?: string;
  style?: object;
}) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View className={className} style={[{ opacity }, style]} />;
}

export function PromptCardSkeleton() {
  return (
    <View className="bg-white rounded-3xl border border-black/[0.07] overflow-hidden mx-3 my-1.5">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-4">
        <View className="flex-row items-center gap-2.5">
          {/* Avatar circle */}
          <Bone className="bg-gray-200 rounded-full w-9 h-9" />
          <View className="gap-1.5">
            <Bone className="w-28 h-3.5 rounded-full bg-gray-200" />
            <Bone className="w-20 h-2.5 rounded-full bg-gray-100" />
          </View>
        </View>
        {/* Follow button */}
        <Bone className="bg-gray-100 rounded-full w-14 h-7" />
      </View>

      {/* Body */}
      <View className="px-4 pt-3">
        {/* Title */}
        <Bone className="w-3/4 h-4 rounded-full bg-gray-200 mb-2.5" />

        {/* Code block */}
        <View className="bg-[#0e1512] rounded-xl p-3 gap-2">
          <Bone
            className="w-24 h-2.5 rounded-full"
            style={{ backgroundColor: "#1e2d24" }}
          />
          <Bone
            className="w-full h-2.5 rounded-full"
            style={{ backgroundColor: "#1e2d24" }}
          />
          <Bone
            className="w-5/6 h-2.5 rounded-full"
            style={{ backgroundColor: "#1e2d24" }}
          />
          <Bone
            className="w-4/6 h-2.5 rounded-full"
            style={{ backgroundColor: "#1e2d24" }}
          />
        </View>
      </View>

      {/* Tags */}
      <View className="flex-row gap-1.5 px-4 pt-3">
        {[48, 56, 40, 52].map((w, i) => (
          <Bone
            key={i}
            className="h-5 bg-gray-100 rounded-full"
            style={{ width: w }}
          />
        ))}
      </View>

      {/* Footer */}
      <View className="flex-row items-center justify-between px-4 py-3 mt-1.5">
        {/* Vote pill */}
        <Bone className="bg-gray-100 rounded-full w-28 h-9" />
        {/* Right actions */}
        <View className="flex-row items-center gap-2">
          <Bone className="bg-gray-100 rounded-full w-9 h-9" />
          <Bone className="bg-gray-100 rounded-full w-28 h-9" />
        </View>
      </View>
    </View>
  );
}