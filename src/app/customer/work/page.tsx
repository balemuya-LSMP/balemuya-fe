/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Footer from "@/app/(features)/_components/footer";
import Header from "../_components/header";
import { useGetServicePostsQuery, useCreateServicePostMutation } from "@/store/api/services.api";
import { useState, useEffect } from "react";
import { IoIosTime } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { FaLocationDot, FaBusinessTime } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import Loader from "@/app/(features)/_components/loader";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';

export default function WorkPage() {
    const { position, getPosition } = useGeolocation();
    const { data: workPosts, error, isLoading } = useGetServicePostsQuery({});
    const [createServicePost] = useCreateServicePostMutation();
    const [showPostModal, setShowPostModal] = useState(false);
    const [showLocationDialog, setShowLocationDialog] = useState(false);
    const [locationDenied, setLocationDenied] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (showPostModal && !position && !showLocationDialog && !locationDenied) {
            setShowLocationDialog(true);
        }
    }, [showPostModal, position, locationDenied]);

    const handleLocationPermission = (allowLocation: boolean) => {
        if (allowLocation) {
            getPosition();
        } else {
            setLocationDenied(true);
        }
        setShowLocationDialog(false);
    };

    const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newPost = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            status: "active",
            urgency: formData.get("urgency") as string,
            work_due_date: formData.get("work_due_date") as string,
            location: position
                ? {
                    latitude: position.lat,
                    longitude: position.lng,
                }
                : null,
        };

        await createServicePost(newPost);
        setShowPostModal(false);
    };

    if (isLoading) return <Loader />;
    if (error) return <p className="text-center mt-6 text-red-500">Error fetching work posts</p>;

    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-6 py-6">
                    <button
                        onClick={() => setShowPostModal(true)}
                        className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-all font-semibold flex items-center space-x-2"
                    >
                        <MdAdd className="text-white text-lg" />
                        <span>Post work</span>
                    </button>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {workPosts?.map((work: any) => (
                                <div
                                    key={work.id}
                                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200 hover:border-purple-600 hover:shadow-xl hover:opacity-90 cursor-pointer"
                                    onClick={() => router.push(`/customer/work/${work.id}`)}
                                >
                                    <h4 className="text-2xl font-semibold text-gray-900 mb-4 hover:text-purple-600 transition-all">
                                        {work.title}
                                    </h4>
                                    <div className="flex items-center mb-3 space-x-2">
                                        <GrStatusGood className="text-purple-600 text-lg transition-all" />
                                        <span className="font-medium text-gray-700">{work.urgency}</span>
                                    </div>
                                    <div className="flex items-center mb-3 space-x-2">
                                        <FaBusinessTime className="text-purple-600 text-lg transition-all" />
                                        <span className="font-medium text-gray-700">
                                            {format(new Date(work.work_due_date), 'MMM dd, yyyy')}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-base mb-4 line-clamp-3">{work.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Modal to create post */}
            {showPostModal && (
                <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
                    <div className="bg-white p-5 rounded-lg w-full max-w-xs shadow-3xl relative mt-16 overflow-auto max-h-[90vh]">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
                            onClick={() => setShowPostModal(false)}
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Post a Job</h3>

                        <form onSubmit={handleCreatePost} className="space-y-3">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                                    rows={1}
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium">Category</label>
                                <select
                                    name="category"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    required
                                >
                                    <option value="Web Development">Web Development</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Writing">Writing</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium">Urgency</label>
                                <select
                                    name="urgency"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    required
                                >
                                    <option value="normal">Normal</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium">Work Due Date</label>
                                <input
                                    type="date"
                                    name="work_due_date"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-all"
                                >
                                    Post
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-3 py-2 rounded-lg hover:bg-gray-500 transition-all"
                                    onClick={() => setShowPostModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Location permission dialog */}
            {showLocationDialog && !locationDenied && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
                    <div className="bg-white p-5 rounded-lg w-full max-w-xs shadow-3xl text-center">
                        <h4 className="text-lg font-semibold mb-4">Allow Access to Your Location?</h4>
                        <p className="text-gray-700 mb-4">To create a work post, we need your current location. Do you want to allow it?</p>
                        <div className="flex justify-end gap-6">
                            <button
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
                                onClick={() => handleLocationPermission(true)}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
                                onClick={() => handleLocationPermission(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
