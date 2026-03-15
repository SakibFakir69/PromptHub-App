import { Stack } from "expo-router";
import "./../../global.css"
import { usePathname } from "expo-router";

export default function RootLayout() {
  const path = usePathname();
  console.log("pathname layout ",path);
  


  return <Stack />;
}
