/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 

const mockNotifications = [
  {
    id: 1,
    title: "New Message Received",
    description: "You have a new message from John Doe.",
    time: "2 hours ago",
    type: "message",
    read: false,
  },
  {
    id: 2,
    title: "Payment Successful",
    description: "Your payment of $120 has been processed.",
    time: "1 day ago",
    type: "payment",
    read: true,
  },
  {
    id: 3,
    title: "System Update",
    description: "A new update is available. Please restart your system.",
    time: "3 days ago",
    type: "update",
    read: false,
  },
  {
    id: 4,
    title: "Event Reminder",
    description: "Don't forget the meeting tomorrow at 10 AM.",
    time: "4 days ago",
    type: "event",
    read: false,
  },
];

const getIcon = (type:any) => {
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
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((notification) => !notification.read)
    .length;

  const handleNotificationClick = (id:any) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    router.push(`/professionals/notifications/${id}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-4/5  bg-white rounded-lg shadow p-4">
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
                key={notification.id}
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
