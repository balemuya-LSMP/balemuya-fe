/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import Loader from "@/app/(features)/_components/loader";
import { useUserProfileQuery } from "@/store/api/userProfile.api";
import { useState } from "react";
import {
  FaCheckCircle,
  FaEdit,
  FaMailBulk,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { MdAdd, MdEdit, MdMail } from "react-icons/md";
import {
  UserModal,
  EducationModal,
  PortfolioModal,
  SkillModal,
  GovernmentIdModal,
  CertificateModal,
  AddressModal,
} from "../_components/modals";

export default function Profile() {
  const { data: userPofile, isLoading, error } = useUserProfileQuery({});

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isSkillModalOpen, setSkillModalOpen] = useState(false);
  const [isEducationModalOpen, setEducationModalOpen] = useState(false);
  const [isCertificateModalOpen, setCertificateModalOpen] = useState(false);
  const [isGovernmentIdModalOpen, setGovernmentIdModalOpen] = useState(false);
  const [isPortfolioModalOpen, setPortfolioModalOpen] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        An error occurred while fetching the profile.
      </p>
    );
  }

  const {
    id,
    user: {
      id: userId,
      first_name,
      middle_name,
      last_name,
      gender,
      email,
      phone_number,
      user_type,
      is_active,
      is_blocked,
      created_at,
      addresses = [],
    } = {},
    skills = [],
    educations = [],
    portfolios = [],
    certificates = [],
    profile_image_url,
    kebele_id_front_image_url,
    kebele_id_back_image_url,
    rating,
    bio,
  } = userPofile.user || {};

  return (
    <div className="container mx-auto py-12 px-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto md:flex md:items-start md:space-x-8">
        {/* Profile Details */}
        <div className="flex-1 text-center md:text-left">
          <div className="relative">
            <button
              className="absolute top-2 right-1 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-md"
              onClick={()=>setUserModalOpen(true)}
            >
              <MdEdit className="text-gray-600" />
            </button>
            <div className="flex flex-col items-center md:items-center md:ml-10">
              <div className="flex justify-center items-center mb-6 md:mb-0 w-32 md:w-40">
                <img
                  src={profile_image_url}
                  alt={`${first_name}'s Profile Picture`}
                  className="rounded-full object-cover h-32 w-32 md:h-40 md:w-40 shadow-lg"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mt-2 md:ml-10">
                {first_name} {middle_name}
              </h1>
              <p className="text-purple-700 font-semibold md:ml-10">{}</p>
              <p className="text-gray-600 text-sm mt-2 md:ml-10">{bio}</p>
              <div className="flex items-center gap-2 mt-2 md:ml-10">
                <FaPhone className="text-purple-700" />
                <a
                  href={`tel:${phone_number}`}
                  className="text-gray-700 hover:underline"
                >
                  {phone_number}
                </a>
              </div>
              <div className="flex items-center gap-2 md:ml-10">
                <MdMail className="text-purple-700" />
                <a
                  href={`mailto:${email}`}
                  className="text-gray-700 hover:underline"
                >
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2 md:ml-10">
                <FaUser className="text-purple-700" />
                <p className="text-gray-800">
                  {user_type
                    ? user_type.charAt(0).toUpperCase() + user_type.slice(1)
                    : "Unknown"}
                </p>
              </div>
            </div>
            {
              isUserModalOpen && (
                <UserModal
                  isOpen={isUserModalOpen}
                  onClose={() => setUserModalOpen(false)}
                />
              )
            }
          </div>

          <hr className="my-6 border-t border-gray-300" />
          <div className="mt-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
              <button
                onClick={() => setAddressModalOpen(true)}
                className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200"
              >
                <MdAdd />
              </button>
            </div>

            {addresses?.map((address: any, index: any) => (
              <div key={index} className="mt-4">
                <h3 className="text-gray-800 font-medium">
                  {address.country ?? "Ethiopia"}
                </h3>
                <p className="text-gray-600">
                  {address.region ?? "Addis Ababa"}
                </p>
                <p className="text-gray-600">{address.city ?? "AA"}</p>
              </div>
            ))}

            {isAddressModalOpen && (
              <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setAddressModalOpen(false)}
              />
            )}
          </div>
          <hr className="my-6 border-t border-gray-300" />
          {/* Skills */}
          <div className="mt-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-800 m-2">Skills</h2>
              <button
                onClick={() => setSkillModalOpen(true)}
                className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200"
              >
                <MdAdd />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {skills.map((skill: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
                >
                  <FaCheckCircle className="text-blue-500 text-lg mr-3" />
                  <span className="text-gray-700 font-medium">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
            {isSkillModalOpen && (
              <SkillModal
                isOpen={isSkillModalOpen}
                onClose={() => setSkillModalOpen(false)}
              />
            )}
          </div>
          <hr className="my-6 border-t border-gray-300" />
          {/* Education */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Education
            </h2>
            {educations && educations.length > 0 ? (
              <ul className="space-y-4">
                {educations.map((education: any, index: any) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <FiCheckCircle className="text-purple-700 text-2xl flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {education.degree} in {education.field_of_study}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {education.school}
                      </p>
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
          </div>
          <hr className="my-6 border-t border-gray-300" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Portfolios
          </h2>
          {portfolios && portfolios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {portfolios.map((portfolio: any, index: any) => (
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
          <hr className="my-6 border-t border-gray-300" />
          {/* Certificates */}
          <div className="mt-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Certification
              </h2>
              <button className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200">
                <MdAdd />
              </button>
            </div>

            {certificates && certificates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {certificates.map((certification: any, index: any) => (
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
                      <p className="text-sm text-gray-600">
                        {certification.issuer ||
                          "No issuer information available."}
                      </p>
                      <p className="text-sm text-gray-600">
                        {certification.issue_date || "Issue date not provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No certifications provided.</p>
            )}
          </div>
          <hr className="my-6 border-t border-gray-300" />
          {/* Government Issued ID */}
          <div className="mt-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Government Issued ID
              </h2>
              <button className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200">
                <MdAdd />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <img
                src={kebele_id_front_image_url}
                alt="Front of Government ID"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <img
                src={kebele_id_back_image_url}
                alt="Back of Government ID"
                className="w-full h-48 object-cover rounded mb-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
