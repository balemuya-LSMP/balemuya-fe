/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { FaCommentDots, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useGetFeedbacksQuery } from '@/store/api/user.api';

export default function Feedback() {
    const [page, setPage] = useState(1);
    const { data: feedbackData, isLoading, isError } = useGetFeedbacksQuery({ page });

    if (isLoading) return <p className="text-center text-gray-500">Loading feedback...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load feedback.</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-indigo-50 via-gray-100 to-white">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">User Feedback</h1>

            <div className="space-y-6">
                {feedbackData?.results?.map((feedback: any) => (
                    <div
                        key={feedback.id}
                        className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <FaCommentDots className="text-indigo-600 text-2xl" />
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {feedback.user?.first_name} {feedback.user?.last_name}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-500">
                                {new Date(feedback.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <p className="text-gray-700 text-base mb-2 leading-relaxed overflow-auto max-h-48">
                            {feedback.message}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6 space-x-4 bg-white">
                <button
                    className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-full text-indigo-600 hover:bg-indigo-100 transition-all duration-300 disabled:opacity-50"
                    onClick={() => setPage(page - 1)}
                    disabled={!feedbackData?.previous}
                    aria-label="Previous Page"
                >
                    <FaArrowLeft className="text-2xl" />
                </button>
                <button
                    className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-full text-indigo-600 hover:bg-indigo-100 transition-all duration-300 disabled:opacity-50"
                    onClick={() => setPage(page + 1)}
                    disabled={!feedbackData?.next}
                    aria-label="Next Page"
                >
                    <FaArrowRight className="text-2xl" />
                </button>
            </div>
        </div>
    );
}
