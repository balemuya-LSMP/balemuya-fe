/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useGoogleLoginMutation, useGoogleSignupMutation } from "@/store/api/auth.api";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/authContext";
import ClipLoader from "react-spinners/ClipLoader";

const GoogleCallback = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [googleLogin] = useGoogleLoginMutation();
  const [googleSignup] = useGoogleSignupMutation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const encodedCode = code ? code.replaceAll("/", "%2F") : null;



    const entityType = localStorage.getItem("entityType");
    const userType = localStorage.getItem("userType");
    const redirect_uri = localStorage.getItem("redirect_uri");
     
    console.log("redrict_uri", redirect_uri)
    if (entityType && userType && encodedCode && redirect_uri) {
      googleSignup({ code: encodedCode, redirect_uri: redirect_uri, entity_type: entityType, user_type: userType })
        .then((response: any) => {
          console.log("Google signup response:", response);
          if (response?.data) {
            const signupData = {
              message: "Google signup successful",
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

            console.log("Google signup successful:", signupData);
            login(signupData);
            toast.success("Google signup successful!");

            const { user_type } = signupData.user;
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
          console.error("Google signup failed:", err);
          toast.error("Google signup failed.");
        });
      return;
    }

    if (encodedCode && redirect_uri) {
      googleLogin({ code: encodedCode, redirect_uri: redirect_uri })
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
  }, [googleLogin, router, login, googleSignup]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <ClipLoader color="#4285F4" loading={true} size={50} />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-1">
          <svg className="w-10 h-10 mx-auto" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        </div>

        <h2 className="text-xl font-medium text-gray-800 mb-2">
          Authenticating with Google
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Please wait while we verify your credentials securely
        </p>

        <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Encrypted connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
