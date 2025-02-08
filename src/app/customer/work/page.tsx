/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Footer from "@/app/(features)/_components/footer";
import Header from "../_components/header";
import { useGetServicePostsQuery, useGetCategoriesQuery, useCreateServicePostMutation } from "@/store/api/services.api";
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
    const { data: categories } = useGetCategoriesQuery();
    const [createServicePost] = useCreateServicePostMutation();
    const [showPostModal, setShowPostModal] = useState(false);
    const [showLocationDialog, setShowLocationDialog] = useState(false);
    const [locationDenied, setLocationDenied] = useState(false);
    const router = useRouter();

    console.log(categories);

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

                    {workPosts?.length === 0 ? (
                        <div className="text-center mt-10 text-gray-600">
                            <p className="text-lg">No work posts available.</p>
                            <button
                                onClick={() => setShowPostModal(true)}
                                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all"
                            >
                                Create a Post
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                            {workPosts.map((work: any) => (
                                <div
                                    key={work.id}
                                    className="bg-white p-7 rounded-xl shadow-xl border border-gray-300 
                    hover:border-purple-600 hover:shadow-2xl hover:scale-105 transition-transform 
                    cursor-pointer"

                                >
                                    <h4 className="text-2xl font-bold text-gray-900 mb-4 hover:text-purple-600 transition-all">
                                        {work.title}
                                    </h4>

                                    <div className="flex items-center gap-3 text-gray-700 text-lg mb-3">
                                        <GrStatusGood className="text-purple-600" />
                                        <span className="font-medium">{work.urgency}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700 text-lg mb-3">
                                        <FaBusinessTime className="text-purple-600" />
                                        <span>{format(new Date(work.work_due_date), 'MMM dd, yyyy')}</span>
                                    </div>

                                    <p className="text-gray-700 text-lg mb-5 line-clamp-2">
                                        {work.description}
                                    </p>

                                    <button
                                        onClick={() => router.push(`/customer/work/${work.id}`)}
                                        className="mt-3 w-full bg-purple-500 text-white px-6 py-3 rounded-lg 
                        hover:bg-purple-600 transition-all font-semibold">
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </div>
            <Footer />

            {/* Modal to create post */}
            {showPostModal && (
                <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 p-4">
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
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-700 cursor-pointer"
                                    required
                                    defaultValue=""
                                >
                                    <option value="" hidden>
                                        Select a category
                                    </option>
                                    {categories?.map((category: { name: string }, index: number) => (
                                        <option key={index} value={category.name} className="text-gray-900">
                                            {category.name}
                                        </option>
                                    ))}
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
