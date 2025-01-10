"use client";
import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";

export default function Register() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-md p-8 my-16">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-white rounded-full border-4 border-gray-100 shadow-md"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mt-8">
          Register
        </h2>

        <form className="mt-8 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              className="text-gray-700 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="First name"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              className="text-gray-700 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="City"
            />
          </div>

          {/* Middle Name */}
          <div>
            <label
              htmlFor="middleName"
              className="block text-sm font-medium text-gray-700"
            >
              Middle name
            </label>
            <input
              type="text"
              id="middleName"
              className="text-gray-700 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Middle name"
            />
          </div>

          {/* Woreda */}
          <div>
            <label
              htmlFor="woreda"
              className="block text-sm font-medium text-gray-700"
            >
              Woreda
            </label>
            <input
              type="text"
              id="woreda"
              className="text-gray-700 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Woreda"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              className="text-gray-700 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Last name"
            />
          </div>

          {/* Field of Expertise */}
          <div>
            <label
              htmlFor="expertise"
              className="block text-sm font-medium text-gray-700"
            >
              Field of expertise
            </label>
            <input
              type="text"
              id="expertise"
              className="text-gray-700 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Field of expertise"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="text-gray-700 mt-2 flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  className="text-blue-600 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  className="text-blue-600 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Female</span>
              </label>
            </div>
          </div>

          {/* Government-issued ID */}
          <div className="relative w-full">
            <label
              htmlFor="idUpload"
              className="block text-sm font-medium text-gray-700"
            >
              Government-issued ID
            </label>
            <div className="relative">
              <input
                type="file"
                id="idUpload"
                name="idUpload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <label
                htmlFor="idUpload"
                className="flex items-center justify-start w-full px-4 py-2 gap-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-400 hover:bg-gray-100 cursor-pointer z-0"
              >
                <MdOutlineFileUpload className="text-xl text-gray-700" />
                Upload ID
              </label>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700"
            >
              Date of birth
            </label>
            <input
              type="date"
              id="birthDate"
              className="text-gray-700 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Certifications */}
          <div className="relative w-full">
            <label
              htmlFor="certifications"
              className="block text-sm font-medium text-gray-700"
            >
              Certifications
            </label>
            <div className="relative">
              <input
                type="file"
                id="certifications"
                name="certifications"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <label
                htmlFor="certifications"
                className="flex items-center justify-start w-full px-4 py-2 gap-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-400 hover:bg-gray-100 cursor-pointer z-0"
              >
                <MdOutlineFileUpload className="text-xl text-gray-700" />
                Upload Certifications
              </label>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              className="text-gray-700 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Phone number"
            />
          </div>

          {/* Region */}
          <div>
            <label
              htmlFor="region"
              className="block text-sm font-medium text-gray-700"
            >
              Region
            </label>
            <input
              type="text"
              id="region"
              className="text-gray-700 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Region"
            />
          </div>
        </form>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 text-lg"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
