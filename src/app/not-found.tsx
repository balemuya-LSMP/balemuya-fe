/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-md">
                <div className="flex justify-center mb-6">
                    <FiAlertTriangle size={48} className="text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    404 - Page Not Found
                </h1>
                <p className="text-gray-600 mb-6">
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>
                
                <button
                    className="text-white bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-md font-medium"
                    onClick={() => router.push("/")}
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}
