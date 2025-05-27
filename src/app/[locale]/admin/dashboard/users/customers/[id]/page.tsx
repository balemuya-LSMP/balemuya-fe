/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useBlockUserMutation, useGetUserQuery, useGetCustomerByIdQuery, useDeleteUserMutation } from "@/store/api/user.api";
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
  const { data: customerData, isLoading: isCustomerDataLoading } = useGetCustomerByIdQuery(id);
  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || isCustomerDataLoading) return <Loader />;
  if (error || !customer || !customer?.data || !customerData) {
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
    bio,
  } = customer?.data?.user || {};
  
  const {
    rating,
    description: customerDescription,
    number_of_services_booked,
    report_count,
    active_service_posts,
    booked_service_posts,
    completed_service_posts,
    reviews
  } = customerData.data || {};

  // Helper function to format date
  const formatDate = (dateString: any) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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
                <span className="ml-2 text-indigo-200">| {user_type ? user_type.charAt(0).toUpperCase() + user_type.slice(1) : "Customer"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8 space-y-6">
          {/* Bio Section */}
          {bio && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Bio</h3>
              <p className="text-gray-800">{bio}</p>
            </div>
          )}

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
                  {formatDate(created_at)}
                </p>
              </div>
            </div>

            {/* Services Booked */}
            <div className="flex items-center space-x-4">
              <FaBriefcase className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Services Booked</p>
                <p className="text-gray-800 font-medium">
                  {number_of_services_booked || 0}
                </p>
              </div>
            </div>

            {/* Report Count */}
            <div className="flex items-center space-x-4">
              <FaBan className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Report Count</p>
                <p className="text-gray-800 font-medium">
                  {report_count || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Active Jobs Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Active Service Posts ({active_service_posts?.length || 0})</h3>
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200">
              {active_service_posts?.length > 0 ? (
                <ul className="space-y-4">
                  {active_service_posts.map((job:any) => (
                    <li
                      key={job.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      <FaBriefcase className="text-indigo-600 text-xl mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-800 font-semibold">{job.title}</p>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${job.urgency === "urgent" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                            {job.urgency}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{job.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-gray-500 text-xs">
                            {job.location?.city && job.location?.region && job.location?.country
                              ? `${job.location.city}, ${job.location.region}`
                              : "Location not specified"}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Due: {formatDate(job.work_due_date)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">No active service posts.</p>
              )}
            </div>
          </div>

          {/* Completed Jobs Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Completed Service Posts ({completed_service_posts?.length || 0})</h3>
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200">
              {completed_service_posts?.length > 0 ? (
                <ul className="space-y-4">
                  {completed_service_posts.map((job:any) => (
                    <li
                      key={job.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      <FaBriefcase className="text-green-600 text-xl mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-800 font-semibold">{job.title}</p>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{job.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-gray-500 text-xs">
                            {job.location?.city && job.location?.region && job.location?.country
                              ? `${job.location.city}, ${job.location.region}`
                              : "Location not specified"}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Due: {formatDate(job.work_due_date)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">No completed service posts.</p>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Reviews ({reviews?.length || 0})</h3>
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200">
              {reviews?.length > 0 ? (
                <ul className="space-y-4">
                  {reviews.map((review:any) => (
                    <li
                      key={review.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      {review.user.profile_image_url ? (
                        <img
                          src={review.user.profile_image_url}
                          alt={review.user.full_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-indigo-700">
                          <FaUser />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-800 font-semibold">{review.user.full_name}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                                size={14}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                        <p className="text-gray-500 text-xs mt-2">
                          {formatDate(review.created_at)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">No reviews yet.</p>
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