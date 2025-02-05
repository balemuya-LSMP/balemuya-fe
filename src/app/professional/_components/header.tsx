/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBell, FaFilter, FaSearch } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { useUserProfileQuery } from "@/store/api/userProfile.api";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: userProfile, isLoading } = useUserProfileQuery({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();


  const handleLogout = async()=>{
    await logout();
    router.push("/auth/login")
    
  }
  
  const categories = [
    { name: "Home Services" },
    { name: "Repair and Maintenance" },
    { name: "Event Services" },
    { name: "Technology and IT" },
    { name: "Construction and Renovation" },
    { name: "Health and Wellness" },
  ];

  const handleCategoryToggle = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      // Remove category if already selected
      setSelectedCategories(
        selectedCategories.filter((name) => name !== categoryName)
      );
    } else {
      // Add category if not selected
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const applyFilter = () => {
    setShowFilter(false);
    console.log("Selected Categories:", selectedCategories);
    // Logic to apply filter with selectedCategories can go here
  };

  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-purple-700">BALEMUYA</h1>

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
        </nav>

        {/* Search, Filter, Notification, and Profile Section */}
        <div className="flex items-center gap-6 relative">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
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
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      onClick={() => handleCategoryToggle(category.name)}
                      className={`flex items-center gap-2 text-gray-700 hover:text-purple-700 cursor-pointer ${
                        selectedCategories.includes(category.name)
                          ? "font-bold text-purple-700"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => handleCategoryToggle(category.name)}
                      />
                      {category.name}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={applyFilter}
                  className="mt-4 px-4 py-2 text-purple-700 rounded-lg"
                >
                  Apply Filter
                </button>
              </div>
            )}
          </div>

          {/* Notifications Icon */}
          <Link href="/professional/notifications">
            <FaBell className="text-xl text-gray-700 hover:text-purple-700 transition cursor-pointer" />
          </Link>

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

      {/* Display Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="bg-gray-100 py-2 px-4 mt-4 text-center">
          <p>
            <strong>Selected Categories:</strong>{" "}
            {selectedCategories.join(", ")}
          </p>
        </div>
      )}
    </header>
  );
}
