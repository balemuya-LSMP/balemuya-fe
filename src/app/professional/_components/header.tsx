/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBell, FaFilter, FaSearch } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useUserProfileQuery } from "@/store/api/userProfile.api";
import { useGetNotificationsQuery, useGetCategoriesQuery } from "@/store/api/services.api";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import NotificationsPanel from "./NotificationsPanel";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string[];
  setFilter: (filter: string[]) => void;
  handleFilter?: (updatedFilter: string[]) => void;
}

export default function Header({ searchQuery, setSearchQuery, filter, setFilter, handleFilter }: HeaderProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: userProfile, isLoading } = useUserProfileQuery({});
  const { data: categories } = useGetCategoriesQuery();
  const { data: notificationData } = useGetNotificationsQuery();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const unreadCount = notificationData?.notifications?.filter((notif: any) => !notif.is_read).length ?? 0;

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login")

  }

  const handleCategoryChange = (categoryName: string) => {
    const updatedFilter = filter.includes(categoryName)
      ? filter.filter((item: string) => item !== categoryName)
      : [...filter, categoryName];
    setFilter(updatedFilter);

    if (handleFilter) {
      handleFilter(updatedFilter); // Pass updated filter
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-8xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/professional" className="flex items-center space-x-2">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            width={80}
            height={80}
            className="cursor-pointer bg-transparent"
          />
          <span className="text-xl font-semibold text-purple-800">Balamuya</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-8">
          <a
            href="/professional"
            className="text-gray-700 hover:text-purple-700 transition"
          >
            Home
          </a>
          <a
            href="/professional/subscription"
            className="text-gray-700 hover:text-purple-700 transition"
          >
            Subscription
          </a>
          <Link
            href="/professional/jobs"
            className="text-gray-700 hover:text-purple-700 transition"
          >
            Job
          </Link>
          <Link href="/professional/requests" className="text-gray-700 hover:text-purple-700">
            Requests
          </Link>
        </nav>

        {/* Search, Filter, Notification, and Profile Section */}
        <div className="flex items-center gap-6 relative">
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

          {/* Filter Icon */}
          <div className="relative">
            <FaFilter
              onClick={() => setShowFilter(!showFilter)}
              className="text-xl text-gray-700 hover:text-purple-700 transition cursor-pointer"
            />
            {showFilter && (
              <div className="absolute top-10 right-0 w-56 bg-white shadow-lg rounded-lg p-4 z-20">
                <ul className="space-y-2">
                  {categories?.map((category: any, index: any) => (
                    <li
                      key={index}

                      className={`flex items-center gap-2 text-gray-700 hover:text-purple-700 cursor-pointer ${selectedCategories.includes(category.name)
                        ? "font-bold text-purple-700"
                        : ""
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={filter.includes(category.name)}
                        onChange={() => handleCategoryChange(category.name)}
                      />
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Notifications Icon */}
          <button onClick={() => setIsOpen(true)} className="relative">
            <FaBell className="text-xl text-gray-700 hover:text-purple-700 cursor-pointer" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
              <img
                src={userProfile?.user?.user?.profile_image_url ?? "/images/user.png"}
                alt="User"
                width={48}
                height={48}
                className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg overflow-hidden transition-all duration-200">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/professional/profile"
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
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
