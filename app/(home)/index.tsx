import TwitchChat from "@/components/twitch-chat";
import { useWebSocket } from "@/providers/websocket-provider";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
  const { messages } = useWebSocket();

  return (
    <SafeAreaView className="flex flex-1">
      <TwitchChat messages={messages} />
    </SafeAreaView>
  );
};

export default HomePage;
