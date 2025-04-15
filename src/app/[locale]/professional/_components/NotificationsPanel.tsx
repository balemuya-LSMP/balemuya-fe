/* eslint-disable @next/next/no-img-element */
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useWebSocket } from "@/components/WebSocketProvider";
import {
  useGetNotificationsQuery,
  useReadNotificationMutation,
  useReadNotificationsMutation,
} from "@/store/api/services.api";

const getIcon = (type: string) => {
  switch (type) {
    case "ver_notifications":
      return "✅";
    case "sub_notifications":
      return "📩";
    case "new_bookings":
      return "📅";
    case "general_notifications":
      return "🔔";
    case "new_jobs":
      return "💼";
    default:
      return "🔔";
  }
};

export default function NotificationsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { messages } = useWebSocket();
  const { data: notificationData, isFetching } = useGetNotificationsQuery();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
  const [readNotification] = useReadNotificationMutation();
  const [readNotifications] = useReadNotificationsMutation();

  useEffect(() => {
    if (notificationData?.notifications) {
      setNotifications(
        notificationData.notifications.map((notif: any) => ({
          id: notif.id,
          type: notif.notification_type,
          title: notif.title,
          description: notif.message,
          time: new Date(notif.created_at).toLocaleTimeString(),
          date: new Date(notif.created_at).toLocaleDateString(),
          read: notif.is_read,
          metadata: notif.metadata,
        }))
      );
    }
  }, [notificationData]);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = JSON.parse(messages[messages.length - 1]);
      if (latestMessage.notification) {
        const newNotification = {
          id: latestMessage.notification.id,
          type: latestMessage.notification.notification_type,
          title: latestMessage.notification.title,
          description: latestMessage.notification.message,
          time: new Date(latestMessage.notification.created_at).toLocaleTimeString(),
          date: new Date(latestMessage.notification.created_at).toLocaleDateString(),
          read: latestMessage.notification.is_read,
          metadata: latestMessage.notification.metadata,
        };
        setNotifications((prev) => [newNotification, ...prev]);
      }
    }
  }, [messages]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const handleNotificationClick = async (id: string) => {
    await readNotification(id);
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    setSelectedNotification(notifications.find((n) => n.id === id));
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const handleMarkAllAsRead = async () => {
    await readNotifications();
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-gray-500 bg-opacity-30 z-40" onClick={onClose}></div>}

      {/* Notification Panel */}
      <div
        className={`fixed mt-0.5 right-0 w-96 h-full bg-white transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 shadow-lg border-l`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-gray-100">
            <h1 className="text-lg font-bold">📢 Notifications</h1>
            <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>✖</button>
          </div>

          {/* Mark All as Read */}
          {unreadCount > 0 && (
            <button
              className="bg-red-500 text-white text-sm px-4 py-2 m-4 rounded hover:bg-red-600 transition"
              onClick={handleMarkAllAsRead}
            >
              Mark All as Read ({unreadCount})
            </button>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {isFetching && notifications.length === 0 ? (
              <p className="text-gray-600 text-center p-4">Loading notifications...</p>
            ) : notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`flex items-start p-4 cursor-pointer transition ${notification.read ? "opacity-70" : "bg-gray-50 shadow-sm"
                      } hover:bg-gray-100`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    {/* Profile Icon */}
                    <div className="relative">
                      <img
                        src={notification.metadata?.profile_image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-300"
                      />
                      {!notification.read && (
                        <span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></span>
                      )}
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 ml-3">
                      <h2 className="text-md font-semibold flex items-center">
                        <span className="text-lg">{getIcon(notification.type)}</span>
                        <span className="ml-2">{notification.title}</span>
                      </h2>
                      <p className="text-sm text-gray-600 break-words">{notification.description}</p>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">{notification.metadata?.name}</span> • {notification.date} - {notification.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center p-4">🎉 No new notifications!</p>
            )}
          </div>
        </div>
      </div>

      {/* Notification Details Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center">
                <span className="text-2xl">{getIcon(selectedNotification.type)}</span>
                <span className="ml-2">{selectedNotification.title}</span>
              </h2>
              <button className="text-gray-600 hover:text-gray-800" onClick={handleCloseModal}>✖</button>
            </div>

            {/* Modal Content */}
            <p className="text-sm text-gray-700 mt-2">{selectedNotification.description}</p>

            <div className="mt-4 text-sm text-gray-500 flex items-center space-x-3">
              <img
                src={selectedNotification.metadata?.profile_image}
                alt={selectedNotification.metadata?.name}
                className="w-12 h-12 rounded-full border border-gray-300 object-cover"
              />
              <div>
                <p><strong>From:</strong> {selectedNotification.metadata?.name ?? "Unknown"}</p>
                <p><strong>Date:</strong> {selectedNotification.date}</p>
                <p><strong>Time:</strong> {selectedNotification.time}</p>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
