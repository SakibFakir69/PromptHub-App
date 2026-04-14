import { Stack } from "expo-router";
import "./../../global.css";
import { usePathname } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const path = usePathname();
  console.log("pathname layout ", path);

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      
      <Toast/>
    </Provider>
  );
}
