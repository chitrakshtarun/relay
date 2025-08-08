import ChatMessage from "@/components/chat-message";
import type { ChatMessage as ChatMessageType } from "@/providers/websocket-provider/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

interface TwitchChatProps {
  messages: ChatMessageType[];
}

const TwitchChat = ({ messages }: TwitchChatProps) => {
  const flatListRef = useRef<FlatList<ChatMessageType> | null>(null);

  const SCROLL_THRESHOLD_PX = 80;
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const isContentOverflowing = contentHeight > containerHeight;

  const scrollToBottom = useCallback(() => {
    if (!flatListRef.current) return;
    flatListRef.current.scrollToEnd({ animated: true });
  }, []);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerHeight(e.nativeEvent.layout.height ?? 0);
  }, []);

  const handleContentSizeChange = useCallback(
    (_w: number, h: number) => {
      setContentHeight(h);
      if (autoScrollEnabled && containerHeight > 0 && h > containerHeight + 1) {
        requestAnimationFrame(scrollToBottom);
      }
    },
    [autoScrollEnabled, containerHeight, scrollToBottom]
  );

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
      const distanceFromBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);
      const isNearBottom = distanceFromBottom <= SCROLL_THRESHOLD_PX;
      if (isNearBottom !== autoScrollEnabled) {
        setAutoScrollEnabled(isNearBottom);
      }
    },
    [autoScrollEnabled]
  );

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    if (isContentOverflowing && autoScrollEnabled) {
      requestAnimationFrame(scrollToBottom);
    }
  }, [messages?.length, autoScrollEnabled, isContentOverflowing, scrollToBottom]);

  return (
    <FlatList
      ref={flatListRef}
      className="px-6"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      onLayout={handleLayout}
      onContentSizeChange={handleContentSizeChange}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerClassName="grow pb-2"
      data={messages}
      renderItem={({ item }) => <ChatMessage {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TwitchChat;
