/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
} from "@/store/api/userProfile.api";
import Modal from "@/app/admin/dashboard/_components/modal";
import { MdEdit, MdEmail, MdPhone } from "react-icons/md";
import { User } from "@/store/types";

const UserProfile = () => {
  const userProfile = useUserProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const { data } = userProfile;

  const userData = data?.user?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (!userData) {
    return (
      <p className="text-center text-gray-600">
        No user data available to display.
      </p>
    );
  }

  const handeleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());
    updateProfile(user as unknown as User);
    handleModalClose();
  };

  return (
    <div className="relative container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg">
      {/* Edit Icon in Top-Right */}
      <button
        className="absolute top-4 right-4   p-2 "
        onClick={handleEditClick}
      >
        <MdEdit className="h-6 w-6 text-purple-700" />
      </button>

      <div className="flex flex-col items-center space-y-4">
        {/* Avatar Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={userData.avatar || "/images/user.jpg"}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-semibold text-gray-800">
          {userData.first_name} {userData.middle_name} {userData.last_name}
        </h1>

        {/* Email */}
        <div className="flex items-center space-x-2 text-gray-600">
          <MdEmail className="w-5 h-5 text-purple-700" />
          <span>{userData.email}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-2 text-gray-600">
          <MdPhone className="w-5 h-5 text-purple-700" />
          <span>{userData.phone_number}</span>
        </div>

        {/* User Type */}
        <div className="text-center">
          <span className="block text-sm font-medium text-gray-500">
            {userData.user_type || "User"}
          </span>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  defaultValue={userData.first_name}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  defaultValue={userData.last_name}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  defaultValue={userData.phone_number}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2 hover:bg-gray-400"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handeleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
