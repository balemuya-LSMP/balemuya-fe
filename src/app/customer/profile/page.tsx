/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
  useAddAddressesMutation,
  useUpdateAddressesMutation,
} from "@/store/api/userProfile.api";
import Modal from "@/app/admin/dashboard/_components/modal";
import { FaUser, FaUpload } from "react-icons/fa";
import { MdEdit, MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { useGeolocation } from "@/hooks/useGeolocation";


const UserProfile = () => {
  const userProfile = useUserProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const { position, getPosition, isLoading, error } = useGeolocation();
  const [addAddress] = useAddAddressesMutation();
  const [updateAddress] = useUpdateAddressesMutation();

  const { data } = userProfile;
  const userData = data?.user?.user;
  const address =  userData?.addresses && userData?.addresses.length > 0
    ? userData.addresses[0]
    : null;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);



  const handleEditClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);


  useEffect(() => {
    if (isAddressModalOpen) {
      getPosition();
    }
  }, []);


  if (!userData) {
    return (
      <p className="text-center text-gray-600">
        No user data available to display.
      </p>
    );
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    if (selectedFile) {
      formData.append("profile_image", selectedFile);
    }

    updateProfile({ updated: formData });
    handleModalClose();
  }

  const handleAddressSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const addressData = {
      city: formData.get("city"),
      region: formData.get("region"),
      country: formData.get("country"),
      latitude: position?.lat,
      longitude: position?.lng,
      is_current: true,

    };

    if (address) {
      await updateAddress({ id: address.id, addresses: addressData });
    } else {
      await addAddress({ addresses: addressData });
    }

    setIsAddressModalOpen(false);
  };


  const avatarSrc = userData.profile_image_url || "/images/user.jpg";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
        {/* Edit Icon */}
        <button
          className="absolute top-4 right-4 p-3 text-gray-700 hover:bg-blue-50 rounded-full transition-transform transform hover:scale-110"
          onClick={handleEditClick}
        >
          <MdEdit className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center space-y-6">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-600 shadow-lg">
            <img
              src={avatarSrc}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            {userData.first_name} {userData.middle_name} {userData.last_name}
          </h1>

          {/* User Details */}
          <div className="flex flex-col items-start gap-4 bg-gray-100 px-6 py-4 rounded-lg w-full">
            <div className="flex items-center gap-3">
              <MdEmail className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">{userData.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MdPhone className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">{userData.phone_number}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaUser className="w-5 h-5 text-purple-600" />
              <span className="font-medium capitalize text-gray-800">
                {userData.user_type || "User"}
              </span>
            </div>
          </div>

          {/* Address Section */}
          {address && (
            <div className="bg-gray-100 px-6 py-4 rounded-lg w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MdLocationOn className="w-6 h-6 text-purple-600 mr-2" />
                  Address
                </h2>
                <button className="p-2 rounded-md text-gray-700 hover:bg-gray-200 transition duration-200"
                  onClick={() => setIsAddressModalOpen(true)}
                >
                  <MdEdit className="h-6 w-6" />
                </button>
              </div>
              <p className="text-gray-700 mt-2">
                {address.city}, {address.region}, {address.country}
              </p>
            </div>
          )}

          {
            isAddressModalOpen && (
              <Modal onClose={() => setIsAddressModalOpen(false)}>
                <div className="p-8 bg-white rounded-2xl shadow-2xl w-[400px] transition-transform transform scale-95 animate-fadeIn">
                  {/* Modal Header */}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    Edit Address
                  </h2>
                  <form className="space-y-5">
                    {/* City */}
                    <div>
                      <label className="block text-gray-700 font-medium">City</label>
                      <input
                        type="text"
                        name="city"
                        defaultValue={address.city}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all shadow-sm hover:shadow-md"
                      />
                    </div>

                    {/* Region */}
                    <div>
                      <label className="block text-gray-700 font-medium">Region</label>
                      <input
                        type="text"
                        name="region"
                        defaultValue={address.region}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all shadow-sm hover:shadow-md"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-gray-700 font-medium">Country</label>
                      <input
                        type="text"
                        name="country"
                        defaultValue={address.country}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all shadow-sm hover:shadow-md"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-8 items-center mt-6">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
                        onClick={handleAddressSubmit}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="px-5 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
                        onClick={() => setIsAddressModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Modal>
            )
          }
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <Modal onClose={handleModalClose}>
            <div className="p-8 bg-white rounded-2xl shadow-2xl w-[400px] transition-transform transform scale-95 animate-fadeIn">
              {/* Modal Header */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Edit Profile
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 font-medium">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    defaultValue={userData.first_name}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all shadow-sm hover:shadow-md"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 font-medium">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    defaultValue={userData.last_name}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all shadow-sm hover:shadow-md"
                  />
                </div>
                {/* profile image */}
                <div>
                  <label className="block mb-4">
                    Profile Picture:
                    <div className="mt-1 flex items-center justify-center p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100">
                      <FaUpload className="text-gray-600 mr-2" />
                      <span className="text-gray-700">
                        {selectedFile ? selectedFile.name : "upload a photo"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </div>
                  </label>
                </div>
                <div>

                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={userData.email}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all shadow-sm hover:shadow-md"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-700 font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    defaultValue={userData.phone_number}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all shadow-sm hover:shadow-md"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-8 items-center mt-6">

                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>

        )}
      </div>
    </div>
  );
};

export default UserProfile;
