import { useScreenOptions } from "@/hooks/use-screen-options";
import { useWebSocket } from "@/providers/websocket-provider";
import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";

const HomeLayout = () => {
  const router = useRouter();
  const screenOptions = useScreenOptions();
  const { connectToServer, disconnect, isConnected, connectionState } = useWebSocket();

  const handlePress = () => {
    if (isConnected) {
      disconnect();
    } else {
      connectToServer();
    }
  };

  const getButtonText = () => {
    switch (connectionState.status) {
      case "connected":
        return "Disconnect";
      case "connecting":
        return "Connecting...";
      default:
        return "Connect";
    }
  };

  return (
    <Stack
      screenOptions={{
        title: "Relay",
        ...screenOptions,
        headerLargeTitle: false,
        headerRight: () => (
          <Button title={getButtonText()} onPress={handlePress} disabled={connectionState.status === "connecting"} />
        ),
        headerLeft: () => (
          <Button
            title={"Settings"}
            onPress={() => router.push("/settings")}
            disabled={connectionState.status === "connecting"}
          />
        ),
      }}
    />
  );
};

export default HomeLayout;
