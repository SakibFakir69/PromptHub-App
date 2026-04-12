import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import { Heart, Eye, X, Edit2, Trash2, Globe, Lock } from "lucide-react-native";

const { width } = Dimensions.get("window");
const CARD_SIZE = Math.floor((width - 4) / 3);

interface Prompt {
  _id: string;
  title: string;
  body: string;
  emoji?: string;
  tag?: string;
  likes?: number;
  views?: number;
  isPublic?: boolean;
}

const DEFAULT_EMOJIS = ["✍️", "🧠", "💼", "🎨", "📊", "🤖", "📧", "🔍", "🧪"];

const TAG_STYLE: Record<string, { container: string; text: string }> = {
  Writing:   { container: "bg-sky-100",     text: "text-sky-800"     },
  Education: { container: "bg-teal-100",    text: "text-teal-800"    },
  Business:  { container: "bg-violet-100",  text: "text-violet-800"  },
  Design:    { container: "bg-orange-100",  text: "text-orange-800"  },
  Analytics: { container: "bg-green-100",   text: "text-green-800"   },
  AI:        { container: "bg-blue-100",    text: "text-blue-800"    },
  Dev:       { container: "bg-emerald-100", text: "text-emerald-800" },
};

const DEFAULT_TAG = { container: "bg-gray-100", text: "text-gray-700" };

interface MyPromptProps {
  data?: Prompt[];
  onEdit?: (prompt: Prompt) => void;
  onDelete?: (id: string) => void;
  onTogglePublic?: (id: string, isPublic: boolean) => void;
}

const MyPrompt = ({
  data = [],
  onEdit,
  onDelete,
  onTogglePublic,
}: MyPromptProps) => {
  const [selected, setSelected] = useState<Prompt | null>(null);
  // Local visibility state so UI updates immediately without waiting for API
  const [publicMap, setPublicMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(data.map((p) => [p._id, p.isPublic ?? true]))
  );

  const isPublic = (id: string) => publicMap[id] ?? true;

  const handleTogglePublic = (id: string) => {
    const next = !publicMap[id];
    setPublicMap((prev) => ({ ...prev, [id]: next }));
    onTogglePublic?.(id, next);
    // Update selected state too
    if (selected?._id === id) {
      setSelected((s) => s ? { ...s, isPublic: next } : s);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete prompt",
      "This prompt will be permanently deleted. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setSelected(null);
            onDelete?.(id);
          },
        },
      ]
    );
  };

  const renderCard = ({ item, index }: { item: Prompt; index: number }) => {
    const emoji = item.emoji || DEFAULT_EMOJIS[index % DEFAULT_EMOJIS.length];
    const tagStyle = TAG_STYLE[item.tag ?? ""] ?? DEFAULT_TAG;
    const pub = isPublic(item._id);

    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => setSelected(item)}
        className="bg-white p-2.5 flex-col justify-between relative"
        style={{ width: CARD_SIZE, height: CARD_SIZE }}
      >
        {/* Top row: likes + visibility dot */}
        <View className="absolute top-1.5 right-1.5 flex-row items-center gap-1">
          {/* Public/private dot */}
          <View
            className={`w-1.5 h-1.5 rounded-full ${
              pub ? "bg-emerald-400" : "bg-gray-300"
            }`}
          />
          <Heart size={9} color="#9CA3AF" fill="#9CA3AF" />
          <Text className="font-medium text-gray-400" style={{ fontSize: 9 }}>
            {item.likes ?? 0}
          </Text>
        </View>

        {/* Emoji */}
        <Text style={{ fontSize: 22, lineHeight: 28, marginBottom: 4 }}>
          {emoji}
        </Text>

        {/* Title */}
        <Text
          className="flex-1 font-semibold leading-tight text-gray-900"
          style={{ fontSize: 11 }}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        {/* Tag */}
        {item.tag && (
          <View
            className={`self-start px-1.5 py-0.5 rounded mt-1 ${tagStyle.container}`}
          >
            <Text
              className={`font-semibold ${tagStyle.text}`}
              style={{ fontSize: 9 }}
            >
              {item.tag}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // ── Empty state ──────────────────────────────────────────────
  if (data.length === 0) {
    return (
      <View className="items-center justify-center gap-3 px-8 py-16">
        <View className="items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <Text style={{ fontSize: 28 }}>📝</Text>
        </View>
        <Text className="mt-1 text-base font-semibold text-gray-900">
          No prompts yet
        </Text>
        <Text className="text-sm leading-5 text-center text-gray-500">
          Share your first prompt with the community
        </Text>
        <TouchableOpacity
          className="px-6 py-3 mt-2 bg-black rounded-xl"
          activeOpacity={0.8}
        >
          <Text className="text-sm font-semibold text-white">Create prompt</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Grid ─────────────────────────────────────────────────────
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderCard}
        numColumns={3}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View className="h-0.5 bg-gray-100" />}
        columnWrapperStyle={{ gap: 2 }}
      />

      {/* ── Bottom sheet modal ─────────────────────────────── */}
      <Modal
        visible={!!selected}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <Pressable
          className="justify-end flex-1 bg-black/40"
          onPress={() => setSelected(null)}
        >
          <Pressable
            className="px-5 pt-4 pb-10 bg-white rounded-t-3xl"
            onPress={() => {}}
          >
            {/* Handle */}
            <View className="self-center h-1 mb-4 bg-gray-200 rounded-full w-9" />

            {/* Close */}
            <TouchableOpacity
              className="absolute top-4 right-4 p-1.5"
              onPress={() => setSelected(null)}
            >
              <X size={18} color="#6B7280" />
            </TouchableOpacity>

            {/* Header */}
            <View className="flex-row items-start gap-3 mb-3">
              <Text style={{ fontSize: 34, lineHeight: 40 }}>
                {selected?.emoji ||
                  DEFAULT_EMOJIS[
                    (data.findIndex((p) => p._id === selected?._id) || 0) %
                      DEFAULT_EMOJIS.length
                  ]}
              </Text>
              <View className="flex-1">
                <Text className="mb-1 text-base font-bold text-gray-900">
                  {selected?.title}
                </Text>
                <Text className="text-sm leading-5 text-gray-500" numberOfLines={3}>
                  {selected?.body}
                </Text>
              </View>
            </View>

            {/* Meta pills */}
            <View className="flex-row flex-wrap gap-2 mb-4">
              {selected?.tag && (() => {
                const ts = TAG_STYLE[selected.tag] ?? DEFAULT_TAG;
                return (
                  <View className={`px-3 py-1 rounded-full ${ts.container}`}>
                    <Text className={`text-xs font-semibold ${ts.text}`}>
                      {selected.tag}
                    </Text>
                  </View>
                );
              })()}
              <View className="flex-row items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
                <Heart size={11} color="#9CA3AF" />
                <Text className="text-xs text-gray-500">
                  {selected?.likes ?? 0} likes
                </Text>
              </View>
              <View className="flex-row items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
                <Eye size={11} color="#9CA3AF" />
                <Text className="text-xs text-gray-500">
                  {selected?.views ?? 0} views
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View className="h-px mb-3 bg-gray-100" />

            {/* Visibility toggle row */}
            {selected && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleTogglePublic(selected._id)}
                className="flex-row items-center justify-between px-3 py-3 mb-3 bg-gray-50 rounded-xl"
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-9 h-9 rounded-xl items-center justify-center ${
                      isPublic(selected._id) ? "bg-emerald-100" : "bg-gray-200"
                    }`}
                  >
                    {isPublic(selected._id) ? (
                      <Globe size={17} color="#059669" />
                    ) : (
                      <Lock size={17} color="#6B7280" />
                    )}
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-gray-900">
                      {isPublic(selected._id) ? "Public" : "Private"}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {isPublic(selected._id)
                        ? "Visible to everyone"
                        : "Only visible to you"}
                    </Text>
                  </View>
                </View>

                {/* Toggle switch */}
                <View
                  className={`w-11 h-6 rounded-full justify-center px-0.5 ${
                    isPublic(selected._id) ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <View
                    className={`w-5 h-5 bg-white rounded-full ${
                      isPublic(selected._id) ? "self-end" : "self-start"
                    }`}
                  />
                </View>
              </TouchableOpacity>
            )}

            {/* Edit & Delete actions */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-xl border border-gray-200 bg-white"
                activeOpacity={0.8}
                onPress={() => {
                  setSelected(null);
                  if (selected) onEdit?.(selected);
                }}
              >
                <Edit2 size={15} color="#374151" />
                <Text className="text-sm font-semibold text-gray-700">
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-xl bg-red-50 border border-red-100"
                activeOpacity={0.8}
                onPress={() => selected && handleDelete(selected._id)}
              >
                <Trash2 size={15} color="#DC2626" />
                <Text className="text-sm font-semibold text-red-600">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default MyPrompt;