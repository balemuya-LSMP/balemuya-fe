/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaCheckCircle,
  FaBan,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useBlockUserMutation, useGetUserQuery } from "@/store/api/user.api";
import { useDeleteUserMutation } from "@/store/api/user.api";
import Loader from "@/app/(features)/_components/loader";
import { useRouter } from "next/navigation";

export default function UserDetails() {
  const router = useRouter();
  const { id } = useParams();
  const { data: userData, isLoading, error } = useGetUserQuery(id);
  const [blockUser] = useBlockUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error loading user details</p>;
  }

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
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">User Details</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md"
          >
            <FaArrowLeft className="mr-2" />
          </button>
        </div>

        {/* User Information */}
        <div className="p-6 flex flex-col md:flex-row items-start gap-6 bg-white rounded-lg border border-gray-200">
          {/* Profile Image */}
          <img
            src={userData?.data?.profile_image_url ?? "/images/user.jpg"}
            alt="profile image"
            width={100}
            height={100}
            className="rounded-full"
          />

          {/* User Info */}
          <div className="flex justify-between">
            <div className="mr-8">
              {/* Name */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {userData?.data?.user?.first_name}{" "}
                {userData?.data?.user?.middle_name}{" "}
                {userData?.data?.user?.last_name}
              </h2>

              {/* Bio */}
              <p className="text-gray-600 text-sm mb-4">
                {userData?.data?.bio || "No bio available."}
              </p>
            </div>
            {/* Details */}
            <div className="col-span-2 grid gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-800">
                  <FaPhone className="text-purple-700" />
                  <span>{userData?.data?.user?.phone_number}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <FaEnvelope className="text-purple-700" />
                  <span>{userData?.data?.user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <FaUser className="text-purple-700" />
                  <span>{userData?.data?.user?.user_type}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  {userData?.data?.user?.is_active ? (
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Active
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaBan className="text-red-500" />
                      Blocked
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <FaCalendarAlt className="text-purple-700" />
                  <span>
                    Created At:{" "}
                    {new Date(
                      userData?.data?.user?.created_at
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <FaMapMarkerAlt className="text-purple-700" />
                  <span>
                    {userData?.data?.user?.address || "No address available."}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <FaStar className="text-yellow-500" />
                  {userData?.data?.user?.rating || "4.5"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills, Education, and Other Details */}
        <div className="p-6 space-y-4 ">
          <h3 className="text-xl font-semibold">Government Issued ID</h3>
          <div className="flex justify-start gap-8">
            {userData?.data?.kebele_id_front_image_url ? (
              <img
                src={userData?.data?.kebele_id_front_image_url}
                alt="Id Front"
                width={150}
                height={100}
                className="rounded-md"
              />
            ) : (
              "No ID Image Provided"
            )}
            {userData?.data?.kebele_id_back_image_url ? (
              <img
                src={userData?.data?.kebele_id_back_image_url}
                alt="Id Back"
                width={150}
                height={100}
                className="rounded-md"
              />
            ) : (
              ""
            )}
          </div>
          <hr className="w-full" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Skills</h3>
          {userData?.data?.skills && userData.data.skills.length > 0 ? (
            <ul className="pl-4 space-y-2">
              {userData.data.skills.map((skill: any, index: any) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 font-medium hover:text-purple-800 text-lg"
                >
                  <FiCheckCircle className="text-purple-700 mr-3" />
                  {skill.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-lg">No skills provided.</p>
          )}
          <hr className="w-full" />
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          {userData?.data?.educations && userData.data.educations.length > 0 ? (
            <ul className="space-y-4">
              {userData.data.educations.map((education: any, index: any) => (
                <li
                  key={index}
                  className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <FiCheckCircle className="text-purple-700 text-2xl flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {education.degree} in {education.field_of_study}
                    </h4>
                    <p className="text-sm text-gray-600">{education.school}</p>
                    {education.graduation_year && (
                      <p className="text-sm text-gray-500">
                        Graduated: {education.graduation_year}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No education details provided.</p>
          )}

          <hr className="w-full" />
          <h3 className="text-xl font-semibold mb-4">Portfolios</h3>
          {userData?.data?.portfolios && userData.data.portfolios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userData.data.portfolios.map((portfolio: any, index: any) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <img
                    src={portfolio.portfolio_image_url ?? "/images/c1.png"}
                    alt="Portfolio"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                      {portfolio.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {portfolio.description || "No description available."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No portfolio provided.</p>
          )}

          <hr className="w-full" />
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>
          {userData?.data?.certificates &&
            userData.data.certificates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userData.data.certificates.map(
                (certification: any, index: any) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                  >
                    <img
                      src={
                        certification.certificate_image_url ?? "/images/c1.png"
                      }
                      alt="Certification"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {certification.name}
                      </h4>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <p>No certifications provided.</p>
          )}
        </div>

        {/* Admin Actions */}
        <div className="p-6 border-t bg-gray-50 flex flex-col gap-4">
          {!userData?.data?.is_verified && (
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-green-600 font-medium">
                Account is not verified. You can verify this account.
              </p>
              <button
                onClick={() => console.log("Verify Account")}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
              >
                Verify Account
              </button>
            </div>
          )}
          <div className="p-4 bg-gray-100 flex justify-end gap-4">
            <div className="relative group">
              <button
                onClick={handleBlockUser}
                className="bg-blue-100 px-4 py-2 rounded-lg">
                <FaBan className="text-lg" />
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
