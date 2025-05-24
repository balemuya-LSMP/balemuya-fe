/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useGoogleLoginMutation } from "@/store/api/auth.api";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/authContext";
import ClipLoader from "react-spinners/ClipLoader";

const GoogleCallback = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [googleLogin] = useGoogleLoginMutation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const encodedCode = code ? code.replaceAll("/", "%2F") : null;

    if (encodedCode) {
      googleLogin({ code: encodedCode })
        .then((response: any) => {
          console.log("Google login response:", response);
          if (response?.data) {
            const loginData = {
              message: "Google login successful",
              user: {
                id: response.data.id,
                email: response.data.email,
                user_type: response.data.user_type,
                entity_type: response.data.entity_type,
                access: response.data.access,
                refresh: response.data.refresh,
                username: response.data.username, 
              }
            };

            console.log("Google login successful:", loginData);
            login(loginData);
            toast.success("Google login successful!");

            const { user_type } = loginData.user;
            if (user_type === "admin") {
              router.push("/admin/dashboard");
            } else if (user_type === "customer") {
              router.push("/customer");
            } else if (user_type === "professional") {
              router.push("/professional");
            } else {
              router.push("/");
            }
          } else {
            throw new Error("Invalid response from server.");
          }
        })
        .catch((err) => {
          console.error("Google login failed:", err);
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
          We're securely verifying your account...
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
