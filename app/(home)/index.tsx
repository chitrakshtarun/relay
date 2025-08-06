/* 
TODO: 
- Fix Scrolling to match Twitch chat
- Fix Styling
*/
import ChatMessage from "@/components/chat-message";
import { useWebSocket } from "@/providers/websocket-provider";
import { useRef } from "react";
import { FlatList } from "react-native";

const HomePage = () => {
  const { messages } = useWebSocket();
  const flatListRef = useRef(null);

  return (
    <FlatList
      ref={flatListRef}
      className="px-6"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      data={messages}
      renderItem={({ item }) => <ChatMessage {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default HomePage;
