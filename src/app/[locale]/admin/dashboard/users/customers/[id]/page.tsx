/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useBlockUserMutation, useGetUserQuery } from "@/store/api/user.api";

import Loader from "@/app/(features)/_components/loader";
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
import { useDeleteUserMutation } from "@/store/api/user.api";

export default function CustomerDetails() {
  const router = useRouter();
  const { id } = useParams();
  const { data: customer, isLoading, error } = useGetUserQuery(id);
  const [blockUser] = useBlockUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <Loader />;
  if (error || !customer || !customer?.data) {
    console.error("Error fetching user:", error);
    return <p className="text-red-500 text-center mt-4">Failed to load data</p>;
  }

  const {
    first_name,
    middle_name,
    last_name,
    email,
    phone_number,
    address,
    gender,
    user_type,
    is_active,
    created_at,
  } = customer?.data?.user || {};

  const { rating, profile_image_url } = customer?.data || {};


  const mockJobs = [
    { id: 1, title: "Software Engineer", location: "New York, USA", status: "Open" },
    { id: 2, title: "Graphic Designer", location: "Los Angeles, USA", status: "Closed" },
    { id: 3, title: "Data Analyst", location: "San Francisco, USA", status: "Open" },
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 bg-slate-200 text-gray-600">
          <div className="flex items-center space-x-4">
            {profile_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile_image_url}
                alt={`${first_name} ${last_name}`}
                className="w-20 h-20 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                <FaUser />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">
                {first_name} {middle_name} {last_name}
              </h2>
              <p className="text-sm text-purple-700">
                {is_active ? "Active" : "Inactive"} User
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4">
          {/* Personal Information */}
          <div className="flex items-center space-x-4">
            <FaUserShield className="text-purple-700 text-xl" />
            <p className="text-gray-800">
              {gender
                ? gender.charAt(0).toUpperCase() + gender.slice(1)
                : "Unknown"}
            </p>
          </div>
          {/* user type */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-purple-700 text-xl" />
            <p className="text-gray-800 ">
              {user_type
                ? user_type.charAt(0).toUpperCase() + user_type.slice(1)
                : "Unknown"}
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-purple-700 text-xl" />
            <p className="text-gray-800">{email}</p>
          </div>

          {/* Phone Number */}
          <div className="flex items-center space-x-4">
            <FaPhone className="text-purple-700 text-xl" />
            <p className="text-gray-800">{phone_number}</p>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-purple-700 text-xl" />
            <p className="text-gray-800">
              {address && address.length > 0
                ? address?.city
                : "No address provided"}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <FaStar className="text-purple-700 text-xl" />
            <p className="text-gray-800">
              {rating && !isNaN(rating)
                ? `${rating} Stars`
                : "No rating available"}
            </p>
          </div>

          {/* Account Creation Date */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-purple-700 text-xl" />
            <p className="text-gray-800">
              Joined on{" "}
              {created_at
                ? new Date(created_at).toLocaleDateString()
                : "Unknown date"}
            </p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Jobs Posted</h3>
          <div className="max-h-60 overflow-y-auto no-scrollbar">
            <ul className="space-y-2">
              {mockJobs.map((job) => (
                <li key={job.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <FaBriefcase className="text-purple-700 text-xl" />
                  <div>
                    <p className="text-gray-800 font-medium">{job.title}</p>
                    <p className="text-gray-600 text-sm">{job.location}</p>
                    <p className={`text-sm font-semibold ${job.status === "Open" ? "text-green-500" : "text-red-500"}`}>
                      {job.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 bg-gray-100 flex justify-end gap-4">
          <div className="relative group">
            <button
              onClick={handleBlockUser}
              className="bg-blue-100 px-4 py-2 rounded-lg">
              {is_active ? <FaBan className="text-lg" /> : <FaUserShield className="text-lg" />}
            </button>
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Block User
            </div>
          </div>
          <div className="relative group">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-200 px-4 py-2 rounded-lg"
            >
              <MdDelete className="text-lg" />
            </button>
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Delete User
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-lg font-bold text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 my-4">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
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
