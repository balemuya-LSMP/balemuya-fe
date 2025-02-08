'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWebSocket } from "@/components/WebSocketProvider";

const getIcon = (type: string) => {
  switch (type) {
    case "message":
      return "💬";
    case "payment":
      return "💳";
    case "update":
      return "⚙️";
    case "event":
      return "📅";
    default:
      return "🔔";
  }
};

export default function Notifications() {
  const router = useRouter();
  const { messages, isConnected } = useWebSocket(); // Use WebSocket hook to get messages
  const [notifications, setNotifications] = useState<any[]>([]);

  // When a new message arrives, add it to the notifications list
  useEffect(() => {
    if (messages.length > 0) {
      const newNotification = JSON.parse(messages[messages.length - 1]);
      setNotifications((prev) => [newNotification, ...prev]);
    }
  }, [messages]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const handleNotificationClick = (id: any) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    router.push(`/professionals/notifications/${id}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-4/5 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {unreadCount} Unread
          </span>
        </div>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id} // Use unique id as key
                className={`flex items-start space-x-4 p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                  notification.read ? "opacity-70" : ""
                }`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="text-2xl">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {notification.title}
                  </h2>
                  <p className="text-gray-600">{notification.description}</p>
                  <span className="text-sm text-gray-500">
                    {notification.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No notifications to show.</p>
        )}
      </div>
    </div>
  );
}
