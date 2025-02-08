/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface WebSocketContextType {
    messages: string[];
    isConnected: boolean;
    sendMessage: (message: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
    children: React.ReactNode;
}

export  const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const socketRef = useRef<WebSocket | null>(null);
    
    const token = localStorage.getItem("access");

    const WS_URL = `wss://balemuya-project.onrender.com/ws/notifications/?token=${token}`;

    useEffect(() => {
        const socket = new WebSocket(WS_URL);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("✅ WebSocket Connected");
            setIsConnected(true);
        };

        socket.onmessage = (event: MessageEvent) => {
            console.log("📩 Received:", event.data);
            setMessages((prev) => [...prev, event.data]);
        };

        socket.onclose = () => {
            console.log("❌ WebSocket Disconnected");
            setIsConnected(false);
        };

        socket.onerror = (error) => {
            console.error("⚠️ WebSocket Error:", error);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (message: any) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        } else {
            console.error("⚠️ WebSocket is not connected.");
        }
    };

    return (
        <WebSocketContext.Provider value={{ messages, isConnected, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook for using WebSocket context
export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
