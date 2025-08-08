import { Text, View } from "react-native";

interface ChatMessageProps {
  username: string;
  message: string;
  timestamp: Date;
}

const ChatMessage = ({ username, message, timestamp }: ChatMessageProps) => {
  return (
    <View className="py-1">
      <View className="flex-row items-start">
        <Text className="mr-2 font-bold text-black">{username}:</Text>
        <Text className="flex-1 text-black">{message}</Text>
      </View>
      <Text className="ml-1 text-xs text-black">{timestamp.toLocaleTimeString()}</Text>
    </View>
  );
};

export default ChatMessage;
