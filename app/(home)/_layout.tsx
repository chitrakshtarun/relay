import { useScreenOptions } from "@/hooks/use-screen-options";
import { useWebSocket } from "@/providers/websocket-provider";
import { Stack } from "expo-router";
import { Button } from "react-native";

const HomeLayout = () => {
  const { connectToServer, disconnect, isConnected, connectionState } = useWebSocket();

  const screenOptions = useScreenOptions("Relay");

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
        ...screenOptions,
        headerRight: () => (
          <Button title={getButtonText()} onPress={handlePress} disabled={connectionState.status === "connecting"} />
        ),
      }}
    />
  );
};

export default HomeLayout;
