/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/app/(features)/_components/footer";
import Header from "../_components/header";
import { FaLocationDot } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CheckCircle, MessageSquare, Flag, XCircle } from "lucide-react";
import { IoIosTime } from "react-icons/io";
import { useGetServicesQuery, useCreateApplicationMutation, useReviewServiceMutation, useGiveComplaintMutation, useCancelBookingMutation, useCompleteBookingMutation, useServiceFilterMutation, useSearchServicesQuery } from "@/store/api/services.api";
import { getDistanceFromLatLon, timeDifference } from "@/shared/utils";
import { useGeolocation } from "@/hooks/useGeolocation";
import { toast, ToastContainer } from "react-toastify";

export default function JobsPage() {
  const { position, getPosition } = useGeolocation();
  const [createApplication] = useCreateApplicationMutation();
  const [reviewService] = useReviewServiceMutation();
  const [giveComplaint] = useGiveComplaintMutation();
  const [cancelBooking] = useCancelBookingMutation();
  const [completeBooking] = useCompleteBookingMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string[]>([]);


  const [activeTab, setActiveTab] = useState("");
  const validStatuses = ["pending", "rejected", "booked", "canceled"];

  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedWorkId, setSelectedWorkId] = useState("")
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const [bookId, setBookId] = useState("")
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [complaint, setComplaint] = useState("");

  const { data: servicesData } = useGetServicesQuery(activeTab);

  const { data: searchResults } = useSearchServicesQuery(searchQuery);
  const [filterServices, { data: filteredResults }] = useServiceFilterMutation();



  const handleFilter = async (updatedFilter: string[]) => {
    const newData = {
      categories: updatedFilter,
    }
    await filterServices({ data: newData }).unwrap();
  };

  useEffect(() => {
    getPosition();
  }, []);

  const userLat = position?.lat ?? 11.60000000;
  const userLng = position?.lng ?? 37.38333330;

  const services = servicesData?.data || [];


  const handleApply = async (id: string) => {
    await createApplication({ service_id: id, message: message }).unwrap();
  };

  const handleReview = async () => {
    const reviewData = {
      booking: bookId,
      rating: rating,
      comment: review
    }
    await reviewService({ data: reviewData }).unwrap();
    toast.success("Review submitted successfully");
    setRating(0);
    setReview("");

    setReviewModalOpen(false);
  };

  const handleComplaint = async () => {
    const complaintData = {
      booking: bookId,
      message: complaint
    }
    await giveComplaint({ data: complaintData }).unwrap();
    toast.success("Complaint submitted successfully");
    setComplaint("");
    setReportModalOpen(false);
  };

  const handleCancel = async (id: string) => {
    await cancelBooking(id).unwrap();
    toast.success("Booking canceled successfully");
  }

  const handleComplete = async (id: string) => {
    await completeBooking(id).unwrap();
    toast.success("Booking completed successfully");
  }


  return (
    <>
      <Header searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        handleFilter={handleFilter}
      />
      <div className="bg-gray-50 min-h-screen">
        {/* Tabs Section */}
        <div className="container mx-auto px-6 py-6">
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
                {tab === "" ? "New Jobs" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <hr className="border-t-2 border-gray-200" />

          {/* Jobs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {services?.map((job: any) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold text-gray-800 mb-4">{job.title ?? job?.service?.title}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-500">
                      <GrStatusGood className="text-purple-700 text-lg mr-2" />
                      <span className="text-sm px-2 rounded bg-purple-400">
                        {job?.status && job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <AiOutlineExclamationCircle className="text-purple-700 text-lg mr-2" />
                      <span className="text-sm">{job.urgency ?? job.service.urgency}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-500">
                      <div className="flex items-center text-sm">
                        <IoIosTime className="text-purple-700 text-lg mr-2" />
                        <span>{timeDifference(new Date(), new Date(job?.created_at ?? job?.service?.created_at))}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FaLocationDot className="text-purple-700 text-lg mr-2" />
                        <span>{getDistanceFromLatLon(userLat, userLng, job.location?.latitude ?? job?.service?.location?.latitude, job?.location?.longitude ?? job?.service?.location?.longitude)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">{job?.description ?? job?.service?.description}</p>
                </div>

                <div className="flex justify-end items-center">

                  {
                    job?.status == "active" && (
                      <button className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition mt-6"
                        onClick={() => {
                          setSelectedWorkId(job?.id)
                          setModalOpen(true)
                        }}>
                        Apply
                      </button>
                    )},
                  {job?.service?.status === "booked" && (
                    <div className="flex justify-between items-center border-t pt-4 mt-6 gap-4">
                      {/* Review Button */}
                      <button
                        className="text-purple-700 hover:text-purple-900 transition"
                        onClick={() => {
                          setBookId(job.id);
                          setReviewModalOpen(true);
                        }}
                      >
                        <MessageSquare size={24} />
                      </button>

                      {/* Report Button */}
                      <button
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => {
                          setBookId(job.id);
                          setReportModalOpen(true);
                        }}
                      >
                        <Flag size={24} />
                      </button>

                      {/* Cancel Button */}
                      <button
                        className="text-gray-600 hover:text-gray-800 transition"
                        onClick={() => handleCancel(job.id)}
                      >
                        <XCircle size={24} />
                      </button>

                      {/* Complete Button */}
                      <button
                        className="text-green-600 hover:text-green-800 transition"
                        onClick={() => handleComplete(job.id)}
                      >
                        <CheckCircle size={24} />
                      </button>
                    </div>
                  )}

                </div>
                {job.customer && (
                  <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                      <Link href={`/professional/customer/${job.customer?.user?.id ?? job?.customer?.customer_id}`}>
                        <img
                          src={job.customer.user?.profile_image_url ?? job.customer.customer_profile_image}
                          alt={job.customer.customer_name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </Link>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-gray-800">{job.customer?.user?.first_name ?? job.customer.customer_name}</h5>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-96 relative">
              {/* Close Button (Top Right) */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Apply for Job</h3>
              <p className="text-gray-600 mb-4">Write a message to the customer</p>

              <textarea
                className="w-full h-22 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              {/* Button Container */}
              <div className="flex justify-end space-x-3 mt-5">
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
                  onClick={() => {
                    if (selectedWorkId !== null) {
                      handleApply(selectedWorkId);
                      setModalOpen(false);
                    }
                  }}
                >
                  Submit
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
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

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Review Service</h3>

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
                    className={`cursor-pointer text-xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
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
        {
          reportModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-96 relative">
                {/* Close Button (Top Right) */}
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                  onClick={() => setReportModalOpen(false)}
                >
                  &times;
                </button>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Report Compliant</h3>

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

          )
        }
        <ToastContainer position="top-center" />
      </div>
      <Footer />
    </>
  );
}