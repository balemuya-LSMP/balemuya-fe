"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/store/usetSchema";
import { useRegisterUserMutation } from "@/store/api/apiSlice";
import { User } from "@/store/types";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isPasswordMatch = password === confirmPassword;

  const onSubmit = async (data: User) => {
    try {
      const result = await registerUser(data).unwrap();
      console.log("Registration success:", result);
    } catch (err) {
      console.error("Registration failed:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 my-8">
        <div className="relative -top-14 mx-auto w-16 h-16 bg-white rounded-full border-4 shadow-md"></div>
        <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              {...register("first_name")}
              className="mt-1 block w-full px-4 py-2 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
              placeholder="Enter your first name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="middle_name"
              className="block text-sm font-medium text-gray-700"
            >
              Middle Name
            </label>
            <input
              type="text"
              id="middle_name"
              {...register("middle_name")}
              className="mt-1 block w-full px-4 py-2 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
              placeholder="Enter your middle name"
            />
            {errors.middle_name && (
              <p className="text-red-500 text-xs">
                {errors.middle_name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              {...register("last_name")}
              className="mt-1 block w-full px-4 py-2 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
              placeholder="Enter your last name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs">{errors.last_name.message}</p>
            )}
          </div>
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
              {...register("email")}
              className="mt-1 block w-full px-4 py-2 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              {...register("phone_number")}
              className="mt-1 block w-full px-4 py-2 border border-gray-500 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
              placeholder="Enter your phone number"
            />
            {errors.phone_number && (
              <p className="text-red-500 text-xs">
                {errors.phone_number.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="flex items-center space-x-6">
              <div>
                <input
                  type="radio"
                  id="genderMale"
                  {...register("gender")}
                  value="male"
                  className="mr-2"
                />
                <label htmlFor="genderMale" className="text-sm text-gray-700">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="genderFemale"
                  {...register("gender")}
                  value="female"
                  className="mr-2"
                />
                <label htmlFor="genderFemale" className="text-sm text-gray-700">
                  Female
                </label>
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="user_type"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="user_type"
              {...register("user_type")}
              className="mt-1 block w-full px-4 py-2 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
            >
              <option value="student">Customer</option>
              <option value="professional">Professional</option>
            </select>
            {errors.user_type && (
              <p className="text-red-500 text-xs">{errors.user_type.message}</p>
            )}
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
                {...register("password")}
                className="mt-1 block w-full px-4 py-2 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
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
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword")}
                className={`mt-1 block w-full px-4 py-2 border ${
                  isPasswordMatch ? "border-gray-400" : "border-red-500"
                } text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 text-gray-500 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {!isPasswordMatch && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:ring focus:ring-purple-500"
            disabled={!isPasswordMatch || isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {isError && (
          <div className="text-red-500 mt-4 text-center">
            <p>
              {error && typeof error === "object" && "data" in error
                ? JSON.stringify(error.data)
                : "error" in error ? error.error : "An unknown error occurred"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
