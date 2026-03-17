
import { Redirect, router } from "expo-router";
import { TouchableOpacity, View ,Text} from "react-native";
import { navigationRouter } from "../navigation";


export default function Index() {



  return (
    <View style={{flex:1, justifyContent:"center", margin:"auto"}}>
      <TouchableOpacity onPress={navigationRouter.goRegister}>
        <Text>Get Started</Text>
      </TouchableOpacity>

    </View>
  )
} 