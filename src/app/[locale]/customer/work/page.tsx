/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

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
import { usePaymentServiceMutation } from "@/store/api/userProfile.api";
import { useState, useEffect } from "react";
import { IoIosTime } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { CheckCircle, MessageSquare, Flag, XCircle } from "lucide-react";
import { FaLocationDot, FaBusinessTime } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { format, set } from "date-fns";
import { toast } from "react-toastify";
import Footer from "../../(features)/_components/footer";
import Loader from "../../(features)/_components/loader";
import { Box, Tab, Tabs, Button, Card, CardActions, Divider, IconButton, Paper, Typography, Tooltip } from "@mui/material";

export default function WorkPage() {
    const params = useParams();
    const locale = params.locale;
    const { position, getPosition } = useGeolocation();
    // const { data: workPosts } = useGetServicePostsQuery({});
    const { data: categories } = useGetCategoriesQuery();
    const [paymentService] = usePaymentServiceMutation();
    const [createServicePost] = useCreateServicePostMutation();
    const [reviewService] = useReviewServiceMutation();
    const [giveComplaint] = useGiveComplaintMutation();
    const [cancelBooking] = useCancelBookingMutation();
    const [completeBooking] = useCompleteBookingMutation();

    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [currentBookingId, setCurrentBookingId] = useState('');
    const [currentProfessionalId, setCurrentProfessionalId] = useState('');


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



    const handlePaymentClick = (bookingId: string, professionalId: string) => {
        setCurrentBookingId(bookingId);
        setCurrentProfessionalId(professionalId);
        setPaymentModalOpen(true);
    };
    const handlePayment = async () => {
        try {
            if (!paymentAmount || isNaN(Number(paymentAmount))) {
                toast.error("Please enter a valid amount");
                return;
            }

            const response = await paymentService({
                professional: currentProfessionalId,
                amount: Number(paymentAmount),
                booking: currentBookingId,
                payment_type:"job_post",
                return_url: `${window.location.origin}/${locale}/customer/check`
            }).unwrap();

            if (response?.data?.payment_url) {
                window.location.href = response.data.payment_url;
            } else {
                throw new Error("Payment URL not found in response");
            }
        } catch (error) {
            console.error("Payment failed:", error);
            toast.error("Payment failed. Please try again.");
        } finally {
            setPaymentModalOpen(false);
            setPaymentAmount('');
        }
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
        toast.success("Work post created successfully");
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
            }} />
            <Box
                sx={{
                    bgcolor: "background.default",
                    minHeight: "100vh",
                }} >
                <Box
                    sx={{
                        mx: "auto",
                        px: 6,
                        py: 6,
                    }}
                >
                    {" "}
                    <Box sx={{ width: '100%', mb: 4 }}>
                        <Tabs
                            value={activeTab}
                            onChange={(event, newValue) => setActiveTab(newValue)}
                            centered
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'purple.700',
                                    height: 2,
                                },
                            }}
                        >
                            <Tab
                                value=""
                                label="All Posts"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    gap: 2,
                                    color: activeTab === '' ? 'purple.700' : 'grey.700',
                                    '&:hover': {
                                        color: 'purple.700',
                                    },
                                }}
                            />
                            {validStatuses.map((tab) => (
                                <Tab
                                    key={tab}
                                    value={tab}
                                    label={tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: activeTab === tab ? 'purple.700' : 'grey.700',
                                        '&:hover': {
                                            color: 'purple.700',
                                        },
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Box>
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
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                                gap: 8,
                                mt: 6,
                            }}
                        >
                            {customerServices?.map((work: any) => (
                                <Card
                                    key={work.id}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                        p: 4,
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        bgcolor: "background.paper",
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color="text.primary"
                                        sx={{ mb: 2, cursor: "pointer", transition: "color 0.3s", '&:hover': { color: 'purple' } }}
                                    >
                                        {work?.title ?? work?.service?.title}
                                    </Typography>

                                    <Box display="flex" alignItems="center" gap={2} color="text.secondary" sx={{ mb: 1 }}>
                                        <GrStatusGood color="purple" />
                                        <Typography variant="body1" fontWeight="medium">
                                            {work?.status ?? work?.service?.status}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={2} color="text.secondary" sx={{ mb: 1 }}>
                                        <GrStatusGood color="purple" />
                                        <Typography variant="body1" fontWeight="medium">
                                            {work?.urgency ?? work?.service?.urgency}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={2} color="text.secondary" sx={{ mb: 1 }}>
                                        <FaBusinessTime color="purple" />
                                        <Typography variant="body1">
                                            {(work?.work_due_date || work?.service?.work_due_date) ? (
                                                format(new Date(work?.work_due_date ?? work?.service?.work_due_date), "MM dd, yyyy")
                                            ) : (
                                                "N/A"
                                            )}
                                        </Typography>
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", WebkitLineClamp: 2 }}>
                                        {work?.description ?? work?.service?.description}
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    <CardActions sx={{ justifyContent: "space-between", pt: 2 }}>
                                        {work?.status === "active" && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => router.push(`/customer/work/${work.id}`)}
                                                sx={{ flex: 1 }}
                                            >
                                                View Details
                                            </Button>
                                        )}

                                        {work?.service?.status === "booked" && (
                                            <Box display="flex" justifyContent="space-around" gap={2} width="100%">

                                                <Tooltip title="Review">

                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => {
                                                            setBookId(work.id);
                                                            setReviewModalOpen(true);
                                                        }}
                                                    >
                                                        <MessageSquare size={24} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Report">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => {
                                                            setBookId(work.id);
                                                            setReportModalOpen(true);
                                                        }}
                                                    >
                                                        <Flag size={24} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Cancel">
                                                    <IconButton
                                                        color="default"
                                                        onClick={() => handleCancel(work.id)}
                                                    >
                                                        <XCircle size={24} />
                                                    </IconButton>
                                                </Tooltip>


                                                <Tooltip title="Complete">
                                                    <IconButton
                                                        color="success"
                                                        onClick={() => handleComplete(work.id)}
                                                    >
                                                        <CheckCircle size={24} />
                                                    </IconButton>

                                                </Tooltip>

                                            </Box>
                                        )}
                                        {work?.status === "completed" && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handlePaymentClick(work.id, work.professional.professional_id)}
                                                sx={{ flex: 1, bgcolor: 'green.600', '&:hover': { bgcolor: 'green.700' } }}
                                            >
                                                Pay Now
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
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

            {paymentModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-96 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => {
                                setPaymentModalOpen(false);
                                setPaymentAmount('');
                            }}
                        >
                            &times;
                        </button>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Enter Amount
                        </h3>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Amount (Birr)
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 transition-all"
                                placeholder="Enter amount"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                min="1"
                                step="0.01"
                            />
                        </div>

                        <div className="flex justify-end space-x-3 mt-5">
                            <button
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
                                onClick={handlePayment}
                            >
                                Pay Now
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all"
                                onClick={() => {
                                    setPaymentModalOpen(false);
                                    setPaymentAmount('');
                                }}
                            >
                                Cancel
                            </button>
                        </div>
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
        </>
    );
}
