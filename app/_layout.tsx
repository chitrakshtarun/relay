import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();
const RootLayout = () => {
  // TODO: Reenable this once you add users.
  // const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(SQLite.openDatabaseSync("relaychat.db"));

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
