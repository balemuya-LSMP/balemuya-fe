'use client';

import React from "react";
import { useRouter, useParams } from "next/navigation";

const mockNotifications = [
  {
    id: 1,
    title: "New Message Received",
    description: "You have a new message from John Doe.",
    time: "2 hours ago",
    type: "message",
  },
  {
    id: 2,
    title: "Payment Successful",
    description: "Your payment of $120 has been processed.",
    time: "1 day ago",
    type: "payment",
  },
  {
    id: 3,
    title: "System Update",
    description: "A new update is available. Please restart your system.",
    time: "3 days ago",
    type: "update",
  },
  {
    id: 4,
    title: "Event Reminder",
    description: "Don't forget the meeting tomorrow at 10 AM.",
    time: "4 days ago",
    type: "event",
  },
];

export default function NotificationDetails() {
  const { id } = useParams();
  const router = useRouter();

  // Ensure the `id` is safely handled as a string
  const notificationId = Array.isArray(id) ? id[0] : id;
  const notification = mockNotifications.find(
    (notification) => notification.id === parseInt(notificationId || "", 10)
  );

  if (!notification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Notification Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The notification you are looking for does not exist.
          </p>
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
            onClick={() => router.push("/professional/notifications")}
          >
            ← Back to Notifications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8">
        <button
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md mb-6"
          onClick={() => router.push("/professional/notifications")}
        >
          ← Back to Notifications
        </button>
        <div className="flex items-center mb-6">
          <span className="text-5xl text-blue-500 mr-4">
            {getIcon(notification.type)}
          </span>
          <h1 className="text-3xl font-bold text-gray-800">{notification.title}</h1>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          {notification.description}
        </p>
        <span className="block text-sm text-gray-500">Received: {notification.time}</span>
      </div>
    </div>
  );
}

function getIcon(type: string) {
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
}
