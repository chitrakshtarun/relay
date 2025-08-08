import { Text } from "@/components/ui/text";
import { View } from "react-native";

interface ChatMessageProps {
  username: string;
  message: string;
  timestamp: Date;
}

const ChatMessage = ({ username, message, timestamp }: ChatMessageProps) => {
  return (
    <View className="py-1">
      <View className="flex-row items-start">
        <Text className="flex-">
          <Text className="font-bold">{username}: </Text>
          {message}
        </Text>
      </View>
      <Text className="text-xs">{timestamp.toLocaleTimeString()}</Text>
    </View>
  );
};

export default ChatMessage;
