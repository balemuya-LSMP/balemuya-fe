/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  FaUsers,
  FaMoneyCheck,
  FaTasks,
  FaCommentDots,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
    className={`bg-gray-200 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
      }`}
    >
      {isOpen && (
        <div className="flex flex-col h-full p-5 space-y-6">
          <h2 className="text-xl text-gray-800 font-bold">Dashboard</h2>
          <ul className="space-y-4">
            <Link href="/dashboard">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                <AiFillDashboard className="mr-3" />
                Dashboard
              </li>
            </Link>
            <Link href="/dashboard/users">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2 ">
                <FaUsers className="mr-3" />
                Manage Users
              </li>
            </Link>
            <Link href="/dashboard/fianance">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2 ">
                <FaMoneyCheck className="mr-3" />
                Transaction
              </li>
            </Link>
            <Link href="/dashboard/works">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                <FaTasks className="mr-3" />
                Manage Works
              </li>
            </Link>
            <Link href="/dashboard/feedback">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                <FaCommentDots className="mr-3" />
                Feedback
              </li>
            </Link>
            <Link href="/dashboard/settings">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                <FaCog className="mr-3" />
                Settings
              </li>
            </Link>
          </ul>
          <button className="mt-auto bg-purple-500 text-white py-2 rounded flex items-center justify-center">
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
