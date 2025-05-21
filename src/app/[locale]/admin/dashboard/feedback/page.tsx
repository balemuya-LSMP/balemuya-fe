/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useGetFeedbacksQuery } from '@/store/api/user.api';

export default function Feedback() {
    const [page, setPage] = useState(1);
    const { data: feedbackData, isLoading, isError } = useGetFeedbacksQuery({ page });

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-700"></div>
        </div>
    );
    if (isError) return (
        <p className="text-center text-red-600 font-medium text-lg py-12 bg-white rounded-lg shadow-md">
            Failed to load feedback. Please try again later.
        </p>
    );


    console.log('feedbackData', feedbackData);
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
                    User Feedback
                </h1>

                <div className="max-h-[65vh] overflow-y-auto pr-3 space-y-8 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200">
                    {feedbackData?.results?.map((feedback: any) => (
                        <div
                            key={feedback.id}
                            className="relative bg-white shadow-xl rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                        >
                            <FaQuoteLeft className="absolute top-4 left-4 text-indigo-200 text-3xl opacity-50" />
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                                <div className="flex items-center space-x-5">
                                    <img
                                        src={feedback.user?.profile_image_url}
                                        alt={`${feedback.user?.full_name} avatar`}
                                        className="w-14 h-14 rounded-full border-2 border-indigo-300 object-cover shadow-sm"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
                                            {feedback.user?.full_name}
                                        </h3>
                                        <div className="flex items-center space-x-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={i < (feedback.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}
                                                    size={18}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-3 md:mt-0">
                                    {new Date(feedback.created_at).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <p className="text-gray-700 text-base leading-relaxed italic pl-8">
                                {feedback.message}
                            </p>
                        </div>
                    ))}
                    {feedbackData?.results?.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg shadow-md text-gray-500 text-lg">
                            No feedback available yet.
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-10 space-x-6">
                    <button
                        className="flex items-center justify-center w-14 h-14 bg-white shadow-lg rounded-full text-indigo-700 hover:bg-indigo-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setPage(page - 1)}
                        disabled={!feedbackData?.previous}
                        aria-label="Previous Page"
                    >
                        <FaArrowLeft className="text-2xl" />
                    </button>
                    <span className="text-gray-800 font-semibold text-lg">
                        Page {page} of {feedbackData?.total_pages || 1}
                    </span>
                    <button
                        className="flex items-center justify-center w-14 h-14 bg-white shadow-lg rounded-full text-indigo-700 hover:bg-indigo-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setPage(page + 1)}
                        disabled={!feedbackData?.next}
                        aria-label="Next Page"
                    >
                        <FaArrowRight className="text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
}