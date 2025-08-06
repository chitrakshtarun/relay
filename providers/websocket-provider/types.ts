import { ReactNode } from "react";

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
}

export interface ConnectionState {
  status: "disconnected" | "connecting" | "connected" | "error";
}

export interface ServerMessage {
  user: string;
  message: string;
}

export interface WebSocketContextType {
  connectionState: ConnectionState;
  messages: ChatMessage[];
  connectToServer: () => void;
  disconnect: () => void;
  clearMessages: () => void;
  isConnected: boolean;
}

export interface WebSocketProviderProps {
  children: ReactNode;
  serverUrl?: string;
}
