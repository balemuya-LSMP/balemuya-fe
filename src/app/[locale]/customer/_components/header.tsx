/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from "react";
import Link from "next/link";
import { useUserProfileQuery } from "@/store/api/userProfile.api";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useGetNotificationsQuery } from "@/store/api/services.api";
import { FaBell, FaSearch } from "react-icons/fa";
import NotificationsPanel from "@/app/professional/_components/NotificationsPanel";
import { ToastContainer, toast } from "react-toastify";
interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}


export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const { data: userProfile } = useUserProfileQuery({});
  const { data: notificationData } = useGetNotificationsQuery();
  const [isOpen, setIsOpen] = useState(false);




  const unreadCount = notificationData?.notifications?.filter((notif: any) => !notif.is_read).length ?? 0;


  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logout successful");
      router.push("/auth/login")

    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");

    }
  }

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo image*/}

        <Link href="/customer" className="flex items-center space-x-2">

          <img
            src="/images/logo.jpg"
            alt="Logo"
            width={80}
            height={80}
            className="cursor-pointer bg-transparent"
          />
          <span className="text-xl font-semibold text-purple-800">Balamuya</span>
        </Link>


        <nav className="flex space-x-6">
          <Link href="/customer" className="text-gray-700 hover:text-purple-700">
            Home
          </Link>
          <Link href="/customer/professionals" className="text-gray-700 hover:text-purple-700">
            Professionals
          </Link>
          <Link href="/customer/work" className="text-gray-700 hover:text-purple-700">
            Work Post
          </Link>
        </nav>
        <div className="flex items-center space-x-6">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <FaSearch className="absolute right-3 text-gray-500 hover:text-purple-700 cursor-pointer" />
          </div>
          <button onClick={() => setIsOpen(true)} className="relative">
            <FaBell className="text-xl text-gray-700 hover:text-purple-700 cursor-pointer" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>


          {/* Profile Section with Dropdown */}
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
              <img
                src={userProfile?.user?.user?.profile_image_url ?? "/images/user.png"}
                alt="User"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg overflow-hidden transition-all duration-200">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/customer/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      <FiUser className="mr-3 text-lg text-purple-700" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout} // Replace with logout logic
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      <FiLogOut className="mr-3 text-lg text-red-600" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
      <ToastContainer position="top-center" />
    </header>
  );
}
