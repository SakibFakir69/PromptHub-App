import {
  useDownVoteMutation,
  useSavedPromptMutation,
  useUpVoteMutation,
} from "@/src/store/features/prompt/prompt.features";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { it } from "zod/v4/locales";

// ── types ─────────────────────────────────────────────────────────────────────

type PromptType = "system" | "image" | "chat";

interface FeedItem {
  _id: string;
  title: string;
  prompt: string;
  tags: string[];
  upVote: number;
  upVotedBy: string[];
  downVotedBy: string[];
  downVote: number;
  createdBy: { name: string; username?: string };
  createdAt: string;
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_PALETTES = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-red-100", text: "text-red-700" },
];

function avatarPalette(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++)
    h = (h * 31 + name.charCodeAt(i)) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[h];
}

function getPromptType(prompt: string, tags: string[]): PromptType {
  const tagLower = tags.map((t) => t.toLowerCase());
  if (
    tagLower.some((t) => ["image", "midjourney", "dalle", "sdxl"].includes(t))
  )
    return "image";
  if (prompt.toLowerCase().startsWith("act as") || tagLower.includes("system"))
    return "system";
  return "chat";
}

const TYPE_META: Record<
  PromptType,
  { label: string; labelColor: string; codeColor: string }
> = {
  system: {
    label: "SYSTEM PROMPT",
    labelColor: "text-blue-400",
    codeColor: "text-green-300",
  },
  image: {
    label: "IMAGE PROMPT",
    labelColor: "text-orange-400",
    codeColor: "text-orange-300",
  },
  chat: {
    label: "CHAT PROMPT",
    labelColor: "text-violet-400",
    codeColor: "text-violet-300",
  },
};

// ── PromptCard ─────────────────────────────────────────────────────────────────

interface PromptCardProps {
  item: FeedItem;
  refetch: () => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ item, refetch }) => {
  const [myVote, setMyVote] = useState<"up" | "down" | null>(null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const [upVote, { isLoading }] = useUpVoteMutation();
  const [downVote, { isLoading: downVoteIsLoading }] = useDownVoteMutation();
  const [savedPrompt, { isLoading: IsSavedPromptLoading }] =
    useSavedPromptMutation();

  const handelDownVote = async (data: string) => {
    console.log(data);

    try {
      const result = await downVote(data).unwrap();
      console.log(result);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const handelUpVote = async (data: string) => {
    console.log(data);

    try {
      const result = await upVote(data).unwrap();
      console.log(result);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const palette = avatarPalette(item.createdBy.name);
  const pType = getPromptType(item.prompt, item.tags);
  const meta = TYPE_META[pType];
  const truncated =
    item.prompt.length > 130 ? item.prompt.slice(0, 130) + "..." : item.prompt;

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  const handleTouchCard = (id: string | number) => {
    console.log("touched", id);

    router.push({
      pathname: `/prompt/[id]`,
      params: {
        id,
      },
    });
  };

  const handelSavedPrompt = async (promptId: string | number) => {
    console.log(promptId, " prompt id");

    try {
      const result = await savedPrompt({ promptId }).unwrap();
      console.log(result, "saved prompt");
      
      Toast.show({
        text1: result?.data?.message || result?.message,
      });
    } catch (error) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: error?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <TouchableOpacity onPress={() => handleTouchCard(item._id)}>
      <View className="bg-white rounded-3xl border border-black/[0.07] overflow-hidden mx-3 my-1.5">
        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-4 pt-4">
          <View className="flex-row items-center gap-2.5">
            <View
              className={`w-9 h-9 rounded-full items-center justify-center ${palette.bg}`}
            >
              <Text className={`text-xs font-bold ${palette.text}`}>
                {initials(item.createdBy.name)}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-semibold text-gray-900">
                {item.createdBy.name}
              </Text>
              <Text className="text-[11px] text-gray-400 mt-px">
                {item.createdBy.username
                  ? `@${item.createdBy.username} · `
                  : ""}
                {timeAgo(item.createdAt)}
              </Text>
            </View>
          </View>

          <TouchableOpacity className="items-center justify-center rounded-full">
            <Text className="tracking-widest ">Follow</Text>
          </TouchableOpacity>
        </View>

        {/* ── Body ── */}
        <View className="px-4 pt-3">
          <Text className="text-base font-bold text-gray-900 tracking-tight leading-snug mb-2.5">
            {item.title}
          </Text>

          {/* Prompt code block */}
          <View className="bg-[#0e1512] rounded-xl p-3">
            <Text
              className={`text-[10px] font-bold tracking-widest mb-2 ${meta.labelColor}`}
            >
              {meta.label}
            </Text>
            <Text
              className={`font-mono text-[11.5px] leading-relaxed ${meta.codeColor}`}
            >
              {truncated}
            </Text>
          </View>
        </View>

        {/* ── Tags ── */}
        {item.tags.length > 0 && (
          <View className="flex-row flex-wrap gap-1.5 px-4 pt-3">
            {item.tags.slice(0, 4).map((tag) => (
              <View
                key={tag}
                className="bg-green-50  border-green-200 rounded-full px-2.5 py-0.5 border border-gray-500/20"
              >
                <Text className="text-[11px] font-medium text-green-800">
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Footer ── */}
        <View className="flex-row items-center justify-between px-4 py-3 mt-1.5">
          {/* Vote pill */}
          <View className="flex-row items-center bg-gray-100 rounded-full p-0.5 border border-black/[0.06]">
            <TouchableOpacity
              onPress={() => handelUpVote(item._id)}
              className={`flex-row items-center gap-1 px-3 py-1.5 rounded-full ${
                myVote === "up" ? "bg-green-700" : ""
              }`}
            >
              <Text
                className={`text-[11px] ${
                  myVote === "up" ? "text-white" : "text-gray-500"
                }`}
              >
                ▲ {item?.upVotedBy?.length ?? 0}
              </Text>
              <Text
                className={`text-[13px] font-semibold ${
                  myVote === "up" ? "text-white" : "text-gray-600"
                }`}
              ></Text>
            </TouchableOpacity>

            <View className="w-px h-4 bg-black/10 mx-0.5" />

            <TouchableOpacity
              onPress={() => handelDownVote(item._id)}
              className={`flex-row items-center gap-1 px-3 py-1.5 rounded-full ${
                myVote === "down" ? "bg-red-100" : ""
              }`}
            >
              <Text
                className={`text-[11px] ${
                  myVote === "down" ? "text-red-700" : "text-gray-500"
                }`}
              >
                ▼ {item?.downVotedBy?.length ?? 0}
              </Text>
              <Text
                className={`text-[13px] font-semibold ${
                  myVote === "down" ? "text-red-700" : "text-gray-600"
                }`}
              ></Text>
            </TouchableOpacity>
          </View>

          {/* Right actions */}
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => handelSavedPrompt(item._id)}
              className={`w-9 h-9 rounded-full items-center justify-center border ${
                saved
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-black/10"
              }`}
            >
              <Text
                className={`text-sm ${saved ? "text-green-700" : "text-gray-400"}`}
              >
                {saved ? "⬛" : "🔖"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCopy}
              className={`flex-row items-center gap-1.5 px-4 py-2 rounded-full border border-gray-500/20 ${
                copied ? "bg-emerald-700" : "bg-green-700"
              }`}
            >
              <Text className="text-[13px] font-semibold text-green-400">
                {copied ? "Copied!" : "Copy prompt"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PromptCard;
