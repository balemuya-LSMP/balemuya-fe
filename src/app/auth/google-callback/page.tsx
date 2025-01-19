"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLoginMutation } from "@/store/api/auth.api";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/authContext";
import ClipLoader from "react-spinners/ClipLoader";

const GoogleCallback = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [googleLogin] = useGoogleLoginMutation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
     
    if (code && state) {
      const decodedState = JSON.parse(decodeURIComponent(state as string));
  
      googleLogin({ code: code as string, state: decodedState })
        .then((response) => {
          if (response.data) {
            console.log("Google login successful:", response.data);
            login(response.data);
          }
          toast.success("Google login successful!");

          if (response?.data?.user?.user_type === "admin") {
            router.push("/admin/dashboard");
          } else if (response?.data?.user?.user_type === "customer") {
            router.push("/customer");
          } else if (response?.data?.user?.user_type === "professional") {
            router.push("/professional");
          } else {
            router.push("/");
          }
        })
        .catch((err) => {
          console.error("Google login failed:", err);
          setError("Google login failed. Please try again.");
          toast.error("Google login failed.");
        });
    }
  }, [googleLogin, router, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <div className="flex justify-center mb-4">
          <ClipLoader color="#6B21A8" loading={true} size={40} />
        </div>
        <h2 className="text-2xl text-gray-800 font-semibold mb-2">
          Processing Your Google Login
        </h2>
        <p className="text-gray-600 mb-4">
          We&apos;re securely verifying your account...
        </p>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default GoogleCallback;
