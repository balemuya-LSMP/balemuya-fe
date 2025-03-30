/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useState, ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import { FaBars, FaBell } from "react-icons/fa";
import {Link} from "@/i18n/navigation";
import { useUserProfileQuery } from "@/store/api/userProfile.api";
import { useGetNotificationsQuery } from "@/store/api/services.api";
import NotificationsPanel from "../../professional/_components/NotificationsPanel";


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: userProfile, isLoading } = useUserProfileQuery({});
  const { data: notificationData } = useGetNotificationsQuery();
  const [isOpen, setIsOpen] = useState(false);


  const unreadCount = notificationData?.notifications?.filter((notif: any) => !notif.is_read).length ?? 0;


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white shadow w-full fixed top-0 left-0 z-10 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-lg font-bold text-gray-800">Balemuya</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            <FaBars className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        <div className="flex items-center space-x-4">

          <button onClick={() => setIsOpen(true)} className="relative">
            <FaBell className="text-xl text-gray-700 hover:text-purple-700 cursor-pointer" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <Link href="/admin/dashboard/profile">
            <img
              src={userProfile?.user?.user?.profile_image_url}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </div>
      </header>

      {/* Sidebar and Content */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && <Sidebar isOpen={sidebarOpen} />}

        {/* Main Content */}
        <main
          className={`flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300 ${sidebarOpen ? "ml-0" : "ml-0"
            }`}
        >
          {children}
        </main>
      </div>
      <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
