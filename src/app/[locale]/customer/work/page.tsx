/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Footer from "@/app/(features)/_components/footer";
import Header from "../_components/header";
import {
    useGetCategoriesQuery,
    useCreateServicePostMutation,
    useGetCustomerServicesQuery,
    useReviewServiceMutation,
    useGiveComplaintMutation,
    useCancelBookingMutation,
    useCompleteBookingMutation,
} from "@/store/api/services.api";
import { useState, useEffect } from "react";
import { IoIosTime } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { CheckCircle, MessageSquare, Flag, XCircle } from "lucide-react";
import { FaLocationDot, FaBusinessTime } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import Loader from "@/app/(features)/_components/loader";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useRouter } from "next/navigation";
import { format, set } from "date-fns";
import { toast, ToastContainer } from "react-toastify";

export default function WorkPage() {
    const { position, getPosition } = useGeolocation();
    // const { data: workPosts, error, isLoading } = useGetServicePostsQuery({});
    const { data: categories } = useGetCategoriesQuery();

    const [createServicePost] = useCreateServicePostMutation();
    const [reviewService] = useReviewServiceMutation();
    const [giveComplaint] = useGiveComplaintMutation();
    const [cancelBooking] = useCancelBookingMutation();
    const [completeBooking] = useCompleteBookingMutation();

    const [showPostModal, setShowPostModal] = useState(false);
    const [showLocationDialog, setShowLocationDialog] = useState(false);
    const [locationDenied, setLocationDenied] = useState(false);
    const router = useRouter();

    const [selectedWorkId, setSelectedWorkId] = useState("");
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);

    const [bookId, setBookId] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [complaint, setComplaint] = useState("");

    const [activeTab, setActiveTab] = useState("");
    const validStatuses = ["booked", "completed", "canceled"];

    const {
        data: customerServicesData,
        error,
        isLoading,
    } = useGetCustomerServicesQuery(activeTab);

    const customerServices = customerServicesData?.data;


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
    if (error)
        return (
            <p className="text-center mt-6 text-red-500">Error fetching work posts</p>
        );

    const handleReview = async () => {
        const reviewData = {
            booking: bookId,
            rating: rating,
            comment: review,
        };
        await reviewService({ data: reviewData }).unwrap();
        toast.success("Review submitted successfully");
        setReview("");
        setRating(0);
        setReviewModalOpen(false);
    };

    const handleComplaint = async () => {
        const complaintData = {
            booking: bookId,
            message: complaint,
        };
        await giveComplaint({ data: complaintData }).unwrap();
        toast.success("Complaint submitted successfully");
        setComplaint("");
        setReportModalOpen(false);
    };

    const handleCancel = async (id: string) => {
        await cancelBooking(id).unwrap();
        toast.success("Booking canceled successfully");
    };

    const handleComplete = async (id: string) => {
        await completeBooking(id).unwrap();
        toast.success("Booking completed successfully");
    };

    return (
        <>
            <Header searchQuery={""} setSearchQuery={function (query: string): void {
                throw new Error("Function not implemented.");
            } } />
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-6 py-6">
                    {" "}
                    <div className="flex justify-center space-x-4 mb-4">
                        {["", ...validStatuses].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 text-sm font-medium transition-colors duration-300 ${activeTab === tab
                                        ? "text-purple-700 border-b-2 border-purple-700"
                                        : "text-gray-700 hover:text-purple-700"
                                    }`}
                            >
                                {tab === ""
                                    ? "All Post"
                                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <hr className="border-t-2 border-gray-200" />
                    <button
                        onClick={() => setShowPostModal(true)}
                        className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow-md mt-2 hover:bg-purple-700 transition-all font-semibold flex items-center space-x-2"
                    >
                        <MdAdd className="text-white text-lg" />
                        <span>Post work</span>
                    </button>
                    {customerServices?.length === 0 ? (
                        <div className="text-center mt-10 text-gray-600">
                            <p className="text-lg">No available service in this status.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                            {customerServices?.map((work: any) => (
                                <div
                                    key={work.id}
                                    className="bg-white p-7 rounded-xl shadow-xl border border-gray-300 
                    hover:border-purple-600 hover:shadow-2xl hover:scale-105 transition-transform 
                    cursor-pointer"
                                >
                                    <h4 className="text-2xl font-bold text-gray-900 mb-4 hover:text-purple-600 transition-all">
                                        {work?.title ?? work?.service?.title}
                                    </h4>
                                    <div className="flex items-center gap-3 text-gray-700 text-lg mb-3">
                                        <GrStatusGood className="text-purple-600" />
                                        <span className="font-medium">
                                            {work?.status ?? work?.service?.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 text-lg mb-3">
                                        <GrStatusGood className="text-purple-600" />
                                        <span className="font-medium">
                                            {work?.urgency ?? work?.service?.urgency}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 text-lg mb-3">
                                        <FaBusinessTime className="text-purple-600" />
                                        <span>
                                            {format(
                                                new Date(
                                                    work?.work_due_date ?? work?.service?.work_due_date
                                                ),
                                                "MMM dd, yyyy"
                                            )}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-lg mb-5 line-clamp-2">
                                        {work?.description ?? work?.service?.description}
                                    </p><div className="flex justify-between items-center border-t pt-4 mt-6">
                                        {work?.status === "active" && (
                                            <button
                                                onClick={() => router.push(`/customer/work/${work.id}`)}
                                                className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-all font-semibold"
                                            >
                                                View Details
                                            </button>
                                        )}

                                        {work?.service?.status === "booked" && (
                                            <div className="flex w-full justify-around gap-4">
                                                {/* Review Button */}
                                                <button
                                                    className="text-purple-700 hover:text-purple-900 transition"
                                                    onClick={() => {
                                                        setBookId(work.id);
                                                        setReviewModalOpen(true);
                                                    }}
                                                >
                                                    <MessageSquare size={24} />
                                                </button>

                                                {/* Report Button */}
                                                <button
                                                    className="text-red-500 hover:text-red-700 transition"
                                                    onClick={() => {
                                                        setBookId(work.id);
                                                        setReportModalOpen(true);
                                                    }}
                                                >
                                                    <Flag size={24} />
                                                </button>

                                                {/* Cancel Button */}
                                                <button
                                                    className="text-gray-600 hover:text-gray-800 transition"
                                                    onClick={() => handleCancel(work.id)}
                                                >
                                                    <XCircle size={24} />
                                                </button>

                                                {/* Complete Button */}
                                                <button
                                                    className="text-green-600 hover:text-green-800 transition"
                                                  onClick={() => handleComplete(work.id)}
                                                >
                                                    <CheckCircle size={24} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

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
                    <div className="bg-white p-5 rounded-lg w-full max-w-xs shadow-3xl relative mt-24 overflow-auto max-h-[90vh]">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
                            onClick={() => setShowPostModal(false)}
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                            Post a Job
                        </h3>

                        <form onSubmit={handleCreatePost} className="space-y-3">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                                    rows={1}
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-700 cursor-pointer"
                                    required
                                    defaultValue=""
                                >
                                    <option value="" hidden>
                                        Select a category
                                    </option>
                                    {categories?.map(
                                        (category: { name: string }, index: number) => (
                                            <option
                                                key={index}
                                                value={category.name}
                                                className="text-gray-900"
                                            >
                                                {category.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium">
                                    Urgency
                                </label>
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
                                <label className="block text-gray-700 text-sm font-medium">
                                    Work Due Date
                                </label>
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
                        <h4 className="text-lg font-semibold mb-4">
                            Allow Access to Your Location?
                        </h4>
                        <p className="text-gray-700 mb-4">
                            To create a work post, we need your current location. Do you want
                            to allow it?
                        </p>
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
            {reviewModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-96 relative">
                        {/* Close Button (Top Right) */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setReviewModalOpen(false)}
                        >
                            &times;
                        </button>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Review Service
                        </h3>

                        {/* Review Input */}
                        <input
                            className="w-full h-22 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="Write a review..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />

                        {/* Rating Stars */}
                        <div className="flex space-x-2 my-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`cursor-pointer text-xl ${rating >= star ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* Button Container */}
                        <div className="flex justify-end space-x-3 mt-5">
                            <button
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
                                onClick={handleReview}
                            >
                                Submit
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all"
                                onClick={() => setReviewModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {reportModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-96 relative">
                        {/* Close Button (Top Right) */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setReportModalOpen(false)}
                        >
                            &times;
                        </button>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Report Compliant
                        </h3>

                        {/* Report Input */}
                        <input
                            className="w-full h-22 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="Write a report..."
                            value={complaint}
                            onChange={(e) => setComplaint(e.target.value)}
                        />

                        {/* Button Container */}
                        <div className="flex justify-end space-x-3 mt-5">
                            <button
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
                                onClick={handleComplaint}
                            >
                                Submit
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all"
                                onClick={() => setReportModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-center" />
        </>
    );
}
