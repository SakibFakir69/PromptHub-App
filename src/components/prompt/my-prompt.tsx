import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Dimensions,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  // *** ADDED: Need Image for preview ***
  Image,
} from "react-native";
import {
  Heart,
  X,
  Edit2,
  Trash2,
  Globe,
  Lock,
  Check,
  Image as ImageIcon,
} from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import {
  useDeletePromptMutation,
  useUpdatePromptMutation,
} from "@/src/store/features/prompt/prompt.features";
import Toast from "react-native-toast-message";
// *** ADDED: ImagePicker import ***
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get("window");
const CARD_SIZE = Math.floor((width - 4) / 3);

interface Prompt {
  _id: string;
  title: string;
  prompt: string;
  tags: string;
  image?: string;
  emoji?: string;
  likes?: number;
  isPublic?: boolean;
}
interface MyPromptProps {
  data?: Prompt[]; // Based on your error message, it expects an array of Prompts
  isLoading: boolean;
  onTogglePublic?: (id: string, isPublic: boolean) => void;
  // This line below is the fix:
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}
const DEFAULT_EMOJIS = ["✍️", "🧠", "💼", "🎨", "📊", "🤖", "📧", "🔍", "🧪"];


const MyPrompt = ({
  data = [],
  onTogglePublic,
  isLoading,
  ListHeaderComponent
  
}: MyPromptProps) => {
  const [selected, setSelected] = useState<Prompt | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [publicMap, setPublicMap] = useState<Record<string, boolean>>({});

  const [deletePrompt] = useDeletePromptMutation();
  const [updatePrompt, { isLoading: isUpdateLoading }] =
    useUpdatePromptMutation();

  const { control, handleSubmit, reset } = useForm<Prompt>();

  useEffect(() => {
    setPublicMap(
      Object.fromEntries(data.map((p) => [p._id, p.isPublic ?? true])),
    );
  }, [data]);

  const handleClose = () => {
    setSelected(null);
    setIsEditing(false);
    reset();
  };

  const onEditPress = (prompt: Prompt) => {
    reset({
      _id: prompt._id,
      title: prompt.title,
      prompt: prompt.prompt,
      tags: prompt.tags,
      image: prompt.image,
    });
    setIsEditing(true);
  };

  const onSubmit = async (formData: Prompt) => {
    try {
      await updatePrompt({
        id: formData._id,
        data: {
          title: formData.title,
          prompt: formData.prompt,
          tags: formData.tags,
          // *** formData.image will now be a local file URI (e.g., 'file://...') ***
          image: formData.image,
        },
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Prompt updated! ",
      });
      handleClose();
    } catch (error) {
      Toast.show({ type: "error", text1: "Error", text2: "Update failed ❌" });
    }
  };

  // *** ADDED: Function to handle image picking ***
  const pickImage = async (onChange: (uri: string) => void) => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Allows user to crop/rotate
      aspect: [4, 3],       // Consistent aspect ratio
      quality: 0.7,        // Moderate compression
    });

    if (!result.canceled) {
      // Pass the local URI back to the form
      onChange(result.assets[0].uri);
    }
  };
  

  const handleTogglePublic = (id: string) => {
    const next = !publicMap[id];
    setPublicMap((prev) => ({ ...prev, [id]: next }));
    onTogglePublic?.(id, next);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Prompt", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePrompt({ id }).unwrap();

            Toast.show({
              type: "success",
              text1: "Deleted",
              text2: "The prompt has been removed successfully. 👋",
            });

            handleClose();
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to delete the prompt. Please try again.",
            });
          }
        },
      },
    ]);
  };


 

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
      
        numColumns={3}
        ItemSeparatorComponent={() => <View className="h-0.5 bg-gray-100" />}
        columnWrapperStyle={{ gap: 2 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className="bg-white p-2.5 flex-col justify-between"
            style={{ width: CARD_SIZE, height: CARD_SIZE }}
          >
            <View className="absolute top-1.5 right-1.5 flex-row items-center gap-1">
              <View
                className={`w-1.5 h-1.5 rounded-full ${publicMap[item._id] ? "bg-emerald-400" : "bg-gray-300"}`}
              />
              <Heart size={9} color="#9CA3AF" fill="#9CA3AF" />
              <Text className="text-gray-400" style={{ fontSize: 9 }}>
                {item.likes ?? 0}
              </Text>
            </View>
            <Text style={{ fontSize: 22 }}>
              {item.emoji || DEFAULT_EMOJIS[index % DEFAULT_EMOJIS.length]}
            </Text>
            <Text
              className="font-semibold text-gray-900"
              style={{ fontSize: 11 }}
              numberOfLines={2}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={<View className="flex justify-center"><Text className="mt-10 text-center">Empty</Text></View>}
      />

      <Modal
        visible={!!selected}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <Pressable
            className="justify-end flex-1 bg-black/40"
            onPress={handleClose}
          >
            <Pressable
              className="px-5 pt-4 pb-10 bg-white rounded-t-3xl max-h-[90%]"
              onPress={() => {}}
            >
              <View className="self-center h-1 mb-4 bg-gray-200 rounded-full w-9" />
              <TouchableOpacity
                className="absolute top-4 right-4 p-1.5"
                onPress={handleClose}
              >
                <X size={18} color="#6B7280" />
              </TouchableOpacity>

              <ScrollView showsVerticalScrollIndicator={false}>
                
                {isEditing ? (
                  <View className="mt-2">
                    <Text className="mb-4 text-lg font-bold text-gray-900">
                      Edit Prompt
                    </Text>

                    <Text className="mb-1 ml-1 text-xs font-semibold text-gray-500 uppercase">
                      Title
                    </Text>
                    <Controller
                      control={control}
                      name="title"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          className="p-3 mb-4 border border-gray-200 bg-gray-50 rounded-xl"
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />

                    <Text className="mb-1 ml-1 text-xs font-semibold text-gray-500 uppercase">
                      Prompt
                    </Text>
                    <Controller
                      control={control}
                      name="prompt"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          className="p-3 mb-4 bg-gray-50 border border-gray-200 rounded-xl min-h-[100]"
                          multiline
                          textAlignVertical="top"
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />

                    <Text className="mb-1 ml-1 text-xs font-semibold text-gray-500 uppercase">
                      Tags
                    </Text>
                    <Controller
                      control={control}
                      name="tags"
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          className="p-3 mb-4 border border-gray-200 bg-gray-50 rounded-xl"
                          value={value}
                          onChangeText={onChange}
                          placeholder="AI, Writing..."
                        />
                      )}
                    />

                    {/* *** SECTION MODIFIED: Replaced TextInput with Image Upload Component *** */}
                    {/* <Text className="mb-1 ml-1 text-xs font-semibold text-gray-500 uppercase">
                      Cover Image
                    </Text>
                    <Controller
                      control={control}
                      name="image"
                      render={({ field: { onChange, value } }) => (
                        <View className="mb-6">
                          {value ? (
                            // Show Image Preview with Remove Button
                            <View className="relative w-full h-40 overflow-hidden border border-gray-200 rounded-xl">
                              <Image 
                                source={{ uri: value }} 
                                className="w-full h-full" 
                                resizeMode="cover" 
                              />
                              <TouchableOpacity 
                                onPress={() => onChange("")} // Clear image
                                className="absolute p-1.5 bg-black/50 rounded-full top-2 right-2"
                              >
                                <X size={14} color="white" />
                              </TouchableOpacity>
                            </View>
                          ) : (
                            // Show Upload Button
                            <TouchableOpacity
                              onPress={() => pickImage(onChange)}
                              className="items-center justify-center w-full h-40 border-2 border-gray-200 border-dashed bg-gray-50 rounded-xl"
                            >
                              <ImageIcon size={28} color="#9CA3AF" />
                              <Text className="mt-2 text-sm text-gray-400">Tap to upload image</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                    /> */}
                    {/* *** END OF MODIFICATION *** */}

                    <View className="flex-row gap-3">
                      <TouchableOpacity
                        className="flex-1 py-4 bg-gray-100 rounded-xl"
                        onPress={() => setIsEditing(false)}
                      >
                        <Text className="font-semibold text-center text-gray-600">
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="flex-row items-center justify-center gap-2 py-4 bg-black flex-2 rounded-xl"
                        onPress={handleSubmit(onSubmit)}
                        disabled={isUpdateLoading}
                      >
                        <Check size={16} color="white" />
                        <Text className="font-semibold text-white">
                          {isUpdateLoading ? "Saving..." : "Save Changes"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <>
                    <View className="flex-row items-start gap-3 mb-4">
                      <Text style={{ fontSize: 34 }}>
                        {selected?.emoji || "✍️"}
                      </Text>
                      <View className="flex-1">
                        <Text className="mb-1 text-base font-bold text-gray-900">
                          {selected?.title}
                        </Text>
                        <Text className="text-sm leading-5 text-gray-500">
                          {selected?.prompt || (selected as any)?.body}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        selected && handleTogglePublic(selected._id)
                      }
                      className="flex-row items-center justify-between px-3 py-3 mb-5 bg-gray-50 rounded-xl"
                    >
                      <View className="flex-row items-center gap-3">
                        <View
                          className={`w-9 h-9 rounded-xl items-center justify-center ${publicMap[selected?._id || ""] ? "bg-emerald-100" : "bg-gray-200"}`}
                        >
                          {publicMap[selected?._id || ""] ? (
                            <Globe size={17} color="#059669" />
                          ) : (
                            <Lock size={17} color="#6B7280" />
                          )}
                        </View>
                        <View>
                          <Text className="text-sm font-semibold">
                            {publicMap[selected?._id || ""]
                              ? "Public"
                              : "Private"}
                          </Text>
                        </View>
                      </View>
                      <View
                        className={`w-11 h-6 rounded-full justify-center px-0.5 ${publicMap[selected?._id || ""] ? "bg-black" : "bg-gray-300"}`}
                      >
                        <View
                          className={`w-5 h-5 bg-white rounded-full ${publicMap[selected?._id || ""] ? "self-end" : "self-start"}`}
                        />
                      </View>
                    </TouchableOpacity>

                    <View className="flex-row gap-3">
                      <TouchableOpacity
                        className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-xl border border-gray-200"
                        onPress={() => selected && onEditPress(selected)}
                      >
                        <Edit2 size={15} color="#374151" />
                        <Text className="font-semibold text-gray-700">
                          Edit
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-xl bg-red-50 border border-red-100"
                        onPress={() => selected && handleDelete(selected._id)}
                      >
                        <Trash2 size={15} color="#DC2626" />
                        <Text className="font-semibold text-red-600">
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </ScrollView>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default MyPrompt;