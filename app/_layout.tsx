import "@/global.css";
import { useScreenOptions } from "@/hooks/use-screen-options";
import { WebSocketProvider } from "@/providers/websocket-provider";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

const queryClient = new QueryClient();
const RootLayout = () => {
  // TODO: Reenable this once you add users.
  // const { success, error } = useMigrations(db, migrations);
  const { colorScheme } = useColorScheme();
  const screenOptions = useScreenOptions();
  console.log(colorScheme);
  useDrizzleStudio(SQLite.openDatabaseSync("relaychat.db"));

  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <WebSocketProvider>
              <Stack>
                <Stack.Screen name="(home)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="settings/index"
                  options={{
                    ...screenOptions,
                    title: "Settings",
                    headerBackTitle: "Back",
                  }}
                />
              </Stack>
            </WebSocketProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
