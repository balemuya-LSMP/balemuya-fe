/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useGetProfessionalByIdQuery } from "@/store/api/user.api";
import { useRequestProfessionalServiceMutation } from "@/store/api/services.api";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import Loader from "@/app/[locale]/(features)/_components/loader";
import MapComponent from "@/app/[locale]/(features)/_components/map";
import { CircularProgress } from "@mui/material";
import { CheckCircle, XCircle } from "lucide-react";
import Footer from "@/app/[locale]/(features)/_components/footer";
import Header from "../../_components/header";

export default function ProfessionalDetailsPage() {
  const { id } = useParams();
  const { data: professionalData, isLoading } = useGetProfessionalByIdQuery(id);

  const [requestService, { isLoading: isRequestLoading }] = useRequestProfessionalServiceMutation();
  const [requestModal, setRequestModal] = useState(false);
  const [message, setMessage] = useState("");

  const professionalInfo = professionalData?.data?.professional;
  const reviews = professionalData?.data?.reviews || [];
  const completedJobs = professionalData?.data?.completed_jobs || [];

  const lat = professionalInfo?.user?.address?.latitude;
  const lng = professionalInfo?.user?.address?.longitude;

  const userLocations = [
    {
      latitude: lat,
      longitude: lng,
      name: professionalInfo?.user?.full_name,
    },
  ];

  if (isLoading) return <Loader />

  const handelRequest = async () => {
    const newData = {
      professional: professionalInfo?.user?.id,
      detail: message
    }
    await requestService({ data: newData }).unwrap();
    toast.success("Request sent successfully");
    setMessage("");
    setRequestModal(false);
  }

  return (
    <>
      <Header searchQuery={""} setSearchQuery={function (query: string): void {
        throw new Error("Function not implemented.");
      }} />
      <div className="flex flex-col lg:flex-row h-screen items-start justify-between gap-6 px-4 md:px-6 py-6">
        {/* Left Column - Professional Details */}
        <div className="w-full lg:w-1/2 h-[calc(100vh-20px)] overflow-y-auto no-scrollbar pr-2">
          {/* Professional Profile Card */}
          <div className="bg-slate-100 rounded-lg shadow-md p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                  <img
                    src={professionalInfo?.user?.profile_image_url || "/images/user.jpg"}
                    alt={professionalInfo?.user?.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {professionalInfo?.user?.full_name}
                  </h2>
                  <h3 className="text-sm md:text-lg font-serif text-gray-800 capitalize">
                    {professionalInfo?.user?.user_type}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-yellow-500 text-lg">
                  {professionalInfo?.rating ? '★'.repeat(Math.round(parseFloat(professionalInfo.rating))) : 'No ratings'}
                </span>
                <p className="text-sm">{professionalInfo?.user?.address?.city || professionalInfo?.user?.address?.country}</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <div className="flex items-center text-gray-500">
                <FaLocationDot className="text-purple-700 text-lg mr-2" />
                <span className="text-sm">{professionalInfo?.user?.address?.city}, {professionalInfo?.user?.address?.country}</span>
              </div>
            </div>

            <h2 className="text-lg text-gray-700 font-medium">Bio</h2>
            <p className="text-gray-600 py-2">
              {professionalInfo?.user?.bio || "No bio provided"}
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">About</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{professionalInfo?.years_of_experience || 0} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">{professionalInfo?.is_available ? 'Available' : 'Not Available'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Verified</p>
                  <p className="font-medium capitalize">
                    {professionalInfo?.is_verified ? (
                      <CheckCircle className="text-green-600" />
                    ) : (
                      <XCircle className="text-red-600" />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          {professionalInfo?.skills?.length > 0 && (
            <div className="bg-slate-100 rounded-lg shadow-md p-4 md:p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {professionalInfo.skills.map((skill: any, index: any) => (
                  skill.name && (
                    <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
                      {skill.name}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {professionalInfo?.categories?.length > 0 && (
            <div className="bg-slate-100 rounded-lg shadow-md p-4 md:p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {professionalInfo.categories.map((category: any, index: any) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {professionalInfo?.certificates?.length > 0 && (
            <div className="bg-slate-100 rounded-lg shadow-md p-4 md:p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Certifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {professionalInfo.certificates.map((certificate: any, index: any) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={certificate?.certificate_image_url}
                      alt={`Certificate ${index + 1}`}
                      className="object-cover w-full h-32"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolios */}
          {professionalInfo?.portfolios?.length > 0 && (
            <div className="bg-slate-100 rounded-lg shadow-md p-4 md:p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Portfolios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {professionalInfo.portfolios.map((portfolio: any, index: any) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-sm bg-white">
                    {portfolio?.portfolio_image_url && (
                      <img
                        src={portfolio.portfolio_image_url}
                        alt={`Portfolio ${index + 1}`}
                        className="object-cover w-full h-48"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {portfolio?.title || `Portfolio ${index + 1}`}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {portfolio?.description || "No description provided"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Jobs */}
          {completedJobs.length > 0 && (
            <div className="bg-slate-100 rounded-lg shadow-md p-4 md:p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Completed Jobs</h3>
              <div className="space-y-4">
                {completedJobs.map((job: any, index: any) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                    <h4 className="font-semibold">{job.service.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{job.service.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">
                        {new Date(job.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-sm font-medium capitalize">{job.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {reviews.length > 0 && (
            <div className="bg-slate-100 rounded-lg shadow-md p-4 md:p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Customer Reviews</h3>
              <ul className="overflow-y-auto max-h-[300px] space-y-4 no-scrollbar">
                {reviews.map((review: any, index: any) => (
                  <li key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                    <div className="flex items-center mb-2">
                      <span className="text-gray-800 font-semibold mr-2">
                        {review.user.full_name}:
                      </span>
                      <span className="text-sm text-gray-600">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-500">
                            ★
                          </span>
                        ))}
                        {Array.from({ length: 5 - review.rating }).map((_, i) => (
                          <span key={i} className="text-gray-300">
                            ★
                          </span>
                        ))}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Button */}
          <div className="flex justify-center sticky bottom-0 bg-white py-4">
            <button
              className="w-full max-w-md px-4 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
              onClick={() => setRequestModal(true)}
              disabled={isRequestLoading}
            >
              Request Service
            </button>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-4 md:p-6 h-[400px] lg:h-[calc(100vh-20px)] sticky top-0">
          <MapComponent userLocations={userLocations} />
        </div>

        {/* Request Service Modal */}
        {requestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative">
              <FaTimes
                className="absolute top-4 right-4 text-gray-500 text-xl cursor-pointer"
                onClick={() => setRequestModal(false)}
              />

              <h3 className="text-xl font-bold text-gray-800 mb-4">Request Service</h3>
              <textarea
                className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the service you need..."
                rows={5}
              />
              <button
                className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-600 transition flex justify-center items-center"
                onClick={handelRequest}
                disabled={isRequestLoading}
              >
                {isRequestLoading ? <CircularProgress size={20} color="inherit" /> : 'Send Request'}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}