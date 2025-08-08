// TODO: Configure MMKV to store user preferences.
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { PlatformColor } from "react-native";
const colorScheme = "light" as "light" | "dark" | "system";

const screenOptions: NativeStackNavigationOptions = {
  headerTransparent: true,
  headerBlurEffect: "prominent",
  headerLargeTitle: true,
  headerShadowVisible: true,
  headerLargeTitleShadowVisible: false,
  headerLargeStyle: {
    backgroundColor: PlatformColor("systemGroupedBackgroundColor") as unknown as string,
  },
  headerStyle: {
    backgroundColor: colorScheme === "dark" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
  },
};

export default screenOptions;
