/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useAuth } from "@/contexts/authContext";
import {
  useGoogleLoginMutation,
  useLoginUserMutation,
} from "@/store/api/apiSlice";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
      login(response);
      console.log("Login successful:", response);
      toast.success("Login successful");
      if (response.user.user_type == "admin") {
        router.push("/admin/dashboard");
      } else if (response.user.user_type == "customer") {
        router.push("/customer");
      } else if (response.user.user_type == "professional") {
        router.push("/professional");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    const state = encodeURIComponent(
      JSON.stringify({ user_type: "professional" })
    );

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=552354262058-om4aifoqn3godt2jgdlfpgr7boihdi86.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/google-callback/&response_type=code&scope=email%20profile&state=${state}&access_type=offline&prompt=consent`;

    window.location.href = url;
  };

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
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-purple-800 focus:outline-none focus:ring focus:ring-gray-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" loading={isLoading} size={25} />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="w-full mt-4 flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100 focus:outline-none"
          >
            <img
              src="https://as1.ftcdn.net/v2/jpg/03/88/07/84/1000_F_388078454_mKtbdXYF9cyQovCCTsjqI0gbfu7gCcSp.jpg"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span>Sign in with Google</span>
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Not Registered?{" "}
              <Link
                href="/auth/signup"
                className="text-purple-600 hover:underline"
              >
                Signup
              </Link>
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
      <ToastContainer position="top-center" />
    </div>
  );
}
