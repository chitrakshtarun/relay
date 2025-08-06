/*
TODO: 
- Save chats to SQLite instead of a useState hook for persistency
- Rework reconnection logic (if it disconnects, messages go into redis, but are retrieved on reconnection)
*/

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { ChatMessage, ConnectionState, ServerMessage, WebSocketContextType, WebSocketProviderProps } from "./types";

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  serverUrl = "ws://localhost:8765",
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectionState, setConnectionState] = useState<ConnectionState>({ status: "disconnected" });
  const websocketRef = useRef<WebSocket | null>(null);

  const connectToServer = () => {
    if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
      Alert.alert("Already Connected", "Already connected to server");
      return;
    }

    setConnectionState({ status: "connecting" });
    setMessages([]);

    try {
      const ws = new WebSocket(serverUrl);
      websocketRef.current = ws;

      ws.onopen = () => {
        console.log("Connected to chat relay WebSocket server");
        setConnectionState({ status: "connected" });

        setMessages([
          {
            id: "system-connected",
            username: "System",
            message: "Connected to Twitch chat relay",
            timestamp: new Date(),
          },
        ]);
      };

      ws.onmessage = (event) => {
        try {
          const data: ServerMessage = JSON.parse(event.data);
          console.log("Chat message received:", data);

          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}-${Math.random()}`,
              username: data.user,
              message: data.message,
              timestamp: new Date(),
            },
          ]);
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnectionState({ status: "error" });
        Alert.alert("Connection Error", "Failed to connect to chat relay");
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setConnectionState({ status: "disconnected" });
        setMessages((prev) => [
          {
            id: "system-disconnected",
            username: "System",
            message: "Disconnected from chat relay",
            timestamp: new Date(),
            color: "#EF4444",
          },
          ...prev,
        ]);
      };
    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      setConnectionState({ status: "error" });
      Alert.alert("Error", "Failed to create connection");
    }
  };

  const disconnect = () => {
    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = null;
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  const isConnected = connectionState.status === "connected";

  const contextValue: WebSocketContextType = {
    connectionState,
    messages,
    connectToServer,
    disconnect,
    clearMessages,
    isConnected,
  };

  return <WebSocketContext.Provider value={contextValue}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
