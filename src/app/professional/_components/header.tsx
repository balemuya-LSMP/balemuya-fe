/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBell, FaFilter, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useUserProfileQuery } from "@/store/api/userProfile.api";

export default function Header() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: userProfile, isLoading } = useUserProfileQuery({});
  
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
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <Link href="/professional/profile">
              <img
                src={userProfile?.user?.user?.profile_image_url                   || "/images/user.png"}
                alt="User"
                width={48}
                height={48}
                className="rounded-full"
              />
            </Link>
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
