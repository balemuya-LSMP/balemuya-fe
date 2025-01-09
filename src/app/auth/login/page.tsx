"use client";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-md p-8 md:flex">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 bg-white rounded-full border-4 shadow-md"></div>
        </div>
        <div className="mt-12 md:w-1/2">
          <h2 className="text-2xl text-gray-800 font-bold mb-4 text-center ">
            Login
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Not Registered?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Signup
              </a>
            </p>
          </div>
        </div>

        {/* Right Section - Welcome Text */}
        <div className="hidden md:block md:w-1/2 md:pl-8 mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Welcome to Balemuya
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Connecting professionals and customers effortlessly, Balemuya is
            your go-to platform for finding skilled experts or offering your
            services. Whether you&apos;re looking to hire professionals for
            specific tasks or showcase your expertise, our app simplifies the
            process with secure, reliable, and fast solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
