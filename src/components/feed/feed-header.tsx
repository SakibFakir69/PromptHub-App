import { TABS } from "@/src/constant/TABS";
import { View, Text, TouchableOpacity } from "react-native";

interface IHeaderComonent{
  activeTab:string,
  onTabPress:(tab:string)=>void
}

const HeaderComponent = ({activeTab,onTabPress }:IHeaderComonent) => {


  
  
  
  return (
    <View className="p-4 py-4 bg-white">
      <View className="flex flex-row justify-between w-full py-6 ">
        <Text>PromptHub</Text>

        <Text>Profile</Text>
      </View>

      <View className="flex-row border-b border-gray-200">
        {TABS.map((tab) => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => onTabPress(tab)}
            className={`py-3 mr-6 ${activeTab === tab ? "border-b-2 border-black" : ""}`}
          >
            <Text className={`${activeTab === tab ? "font-bold text-black" : "text-gray-500"}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default HeaderComponent;
