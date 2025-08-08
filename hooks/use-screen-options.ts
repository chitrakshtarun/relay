import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";
import { PlatformColor } from "react-native";

export const useScreenOptions = (): NativeStackNavigationOptions => {
  const { colorScheme } = useColorScheme();
  return {
    headerTransparent: true,
    headerLargeTitle: true,
    headerBlurEffect: "prominent",
    headerShadowVisible: true,
    headerLargeTitleShadowVisible: false,
    headerLargeStyle: {
      backgroundColor: PlatformColor("systemGroupedBackgroundColor") as unknown as string,
    },
    headerStyle: {
      backgroundColor: colorScheme === "dark" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
    },
  };
};
