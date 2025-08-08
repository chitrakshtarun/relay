import screenOptions from "@/constants/screen-options";
import "@/global.css";
import { WebSocketProvider } from "@/providers/websocket-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

const queryClient = new QueryClient();
const RootLayout = () => {
  // TODO: Reenable this once you add users.
  // const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(SQLite.openDatabaseSync("relaychat.db"));

  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
