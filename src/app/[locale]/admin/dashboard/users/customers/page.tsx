/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useListCustomersQuery } from "@/store/api/user.api";
import { FaEye, FaFilter, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import Loader from "@/app/[locale]/(features)/_components/loader";

export default function Users() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const {
    data: userlist,
    isLoading,
    error,
  } = useListCustomersQuery(accountStatus);

  if (error) {
    console.error("Error fetching users:", error);
  }

  
  const filteredUsers =
    userlist?.filter((userData: any) => {
      const user = userData.user;
      const matchesSearch =
        user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.org_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        accountStatus === "" ||
        (accountStatus === "active" && user.is_active) ||
        (accountStatus === "blocked" && !user.is_active);

      return matchesSearch && matchesStatus;
    }) || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Professionals</h1>
        </div>

        {/* Search and Filter Section */}
        <div className="p-4 flex flex-col sm:flex-row justify-center items-center gap-4 border-b relative">
          {/* Search Input */}
          <div className="flex items-center w-full sm:w-auto border-2 border-gray-300 rounded-2xl px-3 py-2">
            <input
              type="text"
              placeholder="Search users"
              className="ml-2 w-full sm:w-auto focus:outline-none text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="text-gray-700" />
          </div>

          {/* Filter Icon with Dropdown */}
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-800 font-medium"
              onClick={() => setShowFilterDropdown((prev) => !prev)}
            >
              <FaFilter className="text-2xl" />
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-40">
                <ul className="space-y-2">
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      accountStatus === "all" ? "bg-gray-100 font-bold" : ""
                    }`}
                    onClick={() => {
                      setAccountStatus("");
                      setShowFilterDropdown(false);
                    }}
                  >
                    All
                  </li>
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      accountStatus === "active" ? "bg-gray-100 font-bold" : ""
                    }`}
                    onClick={() => {
                      setAccountStatus("active");
                      setShowFilterDropdown(false);
                    }}
                  >
                    Active
                  </li>
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      accountStatus === "blocked" ? "bg-gray-100 font-bold" : ""
                    }`}
                    onClick={() => {
                      setAccountStatus("blocked");
                      setShowFilterDropdown(false);
                    }}
                  >
                    Blocked
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[400px]">
              <table className="min-w-full bg-white">
                <thead className="sticky top-0 bg-gray-100 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">
                      Account Status
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                       <Loader/>
                      </td>
                    </tr>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((userData: any, index: number) => {
                      const user = userData.user;
                      return (
                        <tr
                          key={user.id}
                          className={`border-t text-gray-600 ${
                            index % 2 === 0 ? "bg-gray-50" : ""
                          }`}
                        >
                          <td className="px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                            {user.first_name} {user.middle_name}
                          </td>
                          <td className="px-6 py-3">{user.phone_number}</td>
                          <td className="px-6 py-3">{user.email}</td>
                          <td className="px-6 py-3">
                            {user.is_active ? "Active" : "Inactive"}
                          </td>
                          <td className="px-6 py-3">
                            {user?.address?.city ?? "N/A"} 
                          </td>
                          <td className="px-6 py-3">
                            <button
                              onClick={() => router.push(`/admin/dashboard/users/customers/${user.id}`)}
                              className="px-3 py-1 bg-blue-100 text-blue-500 font-medium rounded-md hover:bg-blue-200"
                            >
                              <FaEye />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
