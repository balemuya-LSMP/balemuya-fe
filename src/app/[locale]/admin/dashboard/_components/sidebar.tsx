/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
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
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { HiUserGroup, HiUser } from "react-icons/hi";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    router.push("/auth/login");
  };

  return (
    <div
      className={`bg-gray-200 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
      }`}
    >
      {isOpen && (
        <div className="flex flex-col h-full p-5 space-y-6">
          <h2 className="text-xl text-gray-800 font-bold">Dashboard</h2>
          <ul className="space-y-2">
            <Link href="/admin/dashboard">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                <AiFillDashboard className="mr-3" />
                Dashboard
              </li>
            </Link>
            {/* Manage Users Section */}
            <li>
              <div
                className="flex items-center justify-between font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2 mt-1 cursor-pointer"
                onClick={() => setIsManageUsersOpen(!isManageUsersOpen)}
              >
                <div className="flex items-center">
                  <FaUsers className="mr-3" />
                  Manage Users
                </div>
                {isManageUsersOpen ? <MdExpandLess /> : <MdExpandMore />}
              </div>
              {isManageUsersOpen && (
                <ul className="pl-8 space-y-2">
                  <Link href="/admin/dashboard/users/customers">
                    <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                      <HiUserGroup className="mr-3" />
                      Customers
                    </li>
                  </Link>
                  <Link href="/admin/dashboard/users/professionals">
                    <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                      <HiUser className="mr-3" />
                      Professionals
                    </li>
                  </Link>
                </ul>
              )}
            </li>
            <Link href="/admin/dashboard/fianance">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2 ">
                <FaMoneyCheck className="mr-3" />
                Transaction
              </li>
            </Link>
            <Link href="/admin/dashboard/works">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                <FaTasks className="mr-3" />
                Manage Works
              </li>
            </Link>
            <Link href="/admin/dashboard/feedback">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                <FaCommentDots className="mr-3" />
                Feedback
              </li>
            </Link>
            <Link href="/admin/dashboard/settings">
              <li className="flex items-center font-medium text-gray-600 hover:text-black hover:bg-gray-300 rounded p-2">
                <FaCog className="mr-3" />
                Settings
              </li>
            </Link>
          </ul>
          <button
            onClick={handleLogout}
            className="mt-auto bg-purple-500 text-white py-2 rounded flex items-center justify-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div> 
      )}
    </div>
  );
}
