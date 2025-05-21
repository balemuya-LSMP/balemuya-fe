/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useBlockUserMutation, useGetUserQuery, useDeleteUserMutation } from "@/store/api/user.api";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaUserShield,
  FaBan,
  FaBriefcase,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from "@/app/[locale]/(features)/_components/loader";

export default function CustomerDetails() {
  const router = useRouter();
  const { id } = useParams();
  const { data: customer, isLoading, error } = useGetUserQuery(id);
  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <Loader />;
  if (error || !customer || !customer?.data) {
    console.error("Error fetching user:", error);
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-lg font-medium bg-white p-6 rounded-lg shadow-md">
          Failed to load user data
        </p>
      </div>
    );
  }

  const {
    full_name,
    email,
    phone_number,
    address,
    gender,
    user_type,
    username,
    is_active,
    created_at,
    profile_image_url,
  } = customer?.data?.user || {};
  const rating = customer?.data?.rating;


  console.log(customer)

  // Mock jobs data (replace with actual API data if available)
  const mockJobs = [
    { id: 1, title: "Software Engineer", location: "Bahir Dar, Ethiopia", status: "Open" },
    { id: 2, title: "System Administrator", location: "Addis Ababa, Ethiopia", status: "Closed" },
    { id: 3, title: "Network Analyst", location: "Bahir Dar, Ethiopia", status: "Open" },
  ];

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id).unwrap();
      router.push("/admin/dashboard/users/professionals");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleBlockUser = async () => {
    try {
      await blockUser(id).unwrap();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header Section */}
        <div className="px-8 py-6 bg-purple-400 text-white">
          <div className="flex items-center space-x-6">
            {profile_image_url ? (
              <img
                src={profile_image_url}
                alt={`${full_name || "User"}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-indigo-700">
                <FaUser />
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {full_name ?? username ?? "Unknown User"}
              </h2>
              <p className="text-sm font-medium mt-1">
                {is_active ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">
                    Inactive
                  </span>
                )}
                <span className="ml-2 text-indigo-200">| {user_type ? user_type.charAt(0).toUpperCase() + user_type.slice(1) : "Admin"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="flex items-center space-x-4">
              <FaUserShield className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-gray-800 font-medium">
                  {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "Not specified"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">{email || "Not provided"}</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center space-x-4">
              <FaPhone className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800 font-medium">{phone_number || "Not provided"}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-800 font-medium">
                  {address?.city && address?.region && address?.country
                    ? `${address.city}, ${address.region}, ${address.country}`
                    : "Not provided"}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <FaStar className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="text-gray-800 font-medium">
                  {rating && !isNaN(rating) ? (
                    <span className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < rating ? "text-yellow-500" : "text-gray-300"}
                          size={16}
                        />
                      ))}
                      <span className="ml-2">({rating}/5)</span>
                    </span>
                  ) : (
                    "No rating available"
                  )}
                </p>
              </div>
            </div>

            {/* Account Creation Date */}
            <div className="flex items-center space-x-4">
              <FaUser className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="text-gray-800 font-medium">
                  {created_at
                    ? new Date(created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Unknown date"}
                </p>
              </div>
            </div>
          </div>

          {/* Jobs Posted Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Jobs Posted</h3>
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200">
              {mockJobs.length > 0 ? (
                <ul className="space-y-4">
                  {mockJobs.map((job) => (
                    <li
                      key={job.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      <FaBriefcase className="text-indigo-600 text-xl" />
                      <div>
                        <p className="text-gray-800 font-semibold">{job.title}</p>
                        <p className="text-gray-600 text-sm">{job.location}</p>
                        <p
                          className={`text-sm font-medium ${
                            job.status === "Open" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {job.status}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">No jobs posted yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 flex justify-end gap-4">
          <div className="relative group">
            <button
              onClick={handleBlockUser}
              className="flex items-center justify-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-all duration-300"
            >
              {is_active ? <FaBan className="mr-2" /> : <FaUserShield className="mr-2" />}
              {is_active ? "Block User" : "Unblock User"}
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {is_active ? "Block this user" : "Unblock this user"}
            </div>
          </div>
          <div className="relative group">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-300"
            >
              <MdDelete className="mr-2" />
              Delete User
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Permanently delete this user
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                onClick={async () => {
                  await handleDeleteUser();
                  setIsModalOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}