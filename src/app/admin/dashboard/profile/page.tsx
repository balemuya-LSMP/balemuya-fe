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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());
    updateProfile({ updated: user });
    handleModalClose();
  };

  return (
    <div className="relative container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-xl">
      {/* Edit Icon in Top-Right */}
      <button
        className="absolute top-4 right-4 p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
        onClick={handleEditClick}
      >
        <MdEdit className="h-6 w-6" />
      </button>

      <div className="flex flex-col items-center space-y-6">
        {/* Avatar Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-600">
          <img
            src={userData.avatar || "/images/user.jpg"}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <h1 className="text-3xl font-bold text-gray-900">
          {userData.first_name} {userData.middle_name} {userData.last_name}
        </h1>

        {/* Email */}
        <div className="flex items-center space-x-3 text-gray-700 text-lg">
          <MdEmail className="w-5 h-5 text-purple-600" />
          <span>{userData.email}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3 text-gray-700 text-lg">
          <MdPhone className="w-5 h-5 text-purple-600" />
          <span>{userData.phone_number}</span>
        </div>

        {/* User Type */}
        <div className="text-center">
          <span className="block text-sm font-medium text-gray-600">
            {userData.user_type || "User"}
          </span>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <div className="p-6 bg-white rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Edit Profile
            </h2>
            <form>
              <div className="mb-6">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  defaultValue={userData.first_name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  defaultValue={userData.last_name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  defaultValue={userData.phone_number}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
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
