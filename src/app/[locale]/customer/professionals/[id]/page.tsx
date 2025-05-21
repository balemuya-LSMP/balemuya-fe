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
import { toast, ToastContainer } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import Loader from "@/app/[locale]/(features)/_components/loader";
import MapComponent from "@/app/[locale]/(features)/_components/map";
import { CircularProgress } from "@mui/material";

const job = {
  id: 1,
  title: "Electrician",
  description: "Expert in residential and commercial electrical repairs.",
  poster_name: "John Doe",
  poster_image: "/images/user.jpg",
  reviews: [
    { client: "Jane", rating: 5, comment: "Great work!" },
    { client: "Bob", rating: 4, comment: "Quick and professional." },
    { client: "Bob", rating: 4, comment: "Quick and professional." },
    { client: "Bob", rating: 4, comment: "Quick and professional." },
    { client: "Bob", rating: 4, comment: "Quick and professional." },
  ],
  previous_work: [
    "/images/main.jpg",
    "/images/main.jpg",
    "/images/main.jpg",
    "/images/main.jpg",
  ],
  certifications: [
    "/images/c1.png",
    "/images/c2.jpg",
  ]
};

export default function ProfessionalDetailsPage() {
  const { id } = useParams();
  const { data: professionalData, isLoading } = useGetProfessionalByIdQuery(id);

  const [requestService, {isLoading:isRequestLoading}] = useRequestProfessionalServiceMutation();
  const [requestModal, setRequestModal] = useState(false);
  const [message, setMessage] = useState("");

  const professionalInfo = professionalData?.data

  console.log(professionalInfo);

  const lat = professionalInfo?.professional?.user?.address?.latitude;
  const lng = professionalInfo?.professional?.user?.address?.longitude;

  const userLocations = [
    {
      latitude: lat,
      longitude: lng,
      name: professionalInfo?.professional?.user?.first_name,
    },
  ];

  if (isLoading) return <Loader />

  const handelRequest = async () => {

    const newData = {
      professional: professionalInfo?.professional?.user?.id,
      detail: message
    }
    await requestService({ data: newData }).unwrap();
    toast.success("Request sent successfully");
    setMessage("");
    setRequestModal(false);
  }

  return (
    <div className="flex h-screen items-start justify-between gap-6 px-6 py-6">
      <div className="container mx-auto px-6 py-6 w-1/2 h-[calc(100vh-20px)] overflow-y-auto no-scrollbar">
        {/* Job Details Card */}
        <div className="bg-slate-100 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center mb-2">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                <img
                  src={professionalInfo?.professional?.user?.profile_image_url}
                  alt={professionalInfo?.professional?.user?.first_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {professionalInfo?.professional?.user?.first_name}
                </h2>
                <h3 className="text-lg font-serif mb-4 text-gray-800">
                  {professionalInfo?.professional?.user?.user_type}
                </h3>
              </div>
            </div>
            <div>

              <span className="text-yellow-500 text-lg">★★★★★</span>
              <p>{professionalInfo?.professional?.user?.address?.country}</p>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <div className="flex items-center text-gray-500">
              <FaLocationDot className="text-purple-700 text-lg mr-2" />
              <span className="text-sm">2km Away</span>
            </div>

          </div>
          <h2 className="tetx-lg text-gray-700 font-medium">Bio</h2>
          <p className="text-gray-600 py-2 ">
            {professionalInfo?.professional?.user?.bio}
          </p>

        </div>
        {/* Eduction */}
        <div className="bg-slate-100 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Education</h3>
          <div className="space-y-4">
            {professionalInfo?.professional?.educations?.map((education: any, index: any) => (
              <div key={index} className="p-4 rounded-lg shadow-md bg-white text-gray-800 border border-gray-200">
                <p className="text-lg font-semibold">{education?.degree}</p>
                <p className="text-sm text-gray-600">{education?.field_of_study}</p>
                <p className="text-sm font-medium">{education?.school}</p>
              </div>
            ))}
          </div>
        </div>
        {/* skills */}
        <div className="bg-slate-100 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {professionalInfo?.professional?.skills?.map((skill: any, index: any) => (
              <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {skill?.name}
              </span>
            ))}
          </div>
        </div>
        {/* Certifications */}
        <div className="bg-slate-100 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {professionalInfo?.professional?.certificates?.map((certificate: any, index: any) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-sm">
                <img
                  src={certificate?.certificate_image_url}
                  alt={`Previous work ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Portifoilios */}
        <div className="bg-slate-100 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Portfolios</h3>
          <div className="grid grid-cols-3 gap-6">
            {professionalInfo?.professional?.portfolios?.map((portfolio: any, index: any) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-sm bg-white">
                <h3 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-200">
                  {portfolio?.title}
                </h3>
                <img
                  src={portfolio?.portfolio_image_url}
                  alt={`Previous work ${index + 1}`}
                  className="object-cover w-full h-48"
                />
                <p className="text-gray-600 p-4">
                  {portfolio?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Previous Work Section */}
        <div className="bg-slate-100 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Previous Work</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {job.previous_work.map((photo, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={photo}
                  alt={`Previous work ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-slate-100 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Customer Reviews
          </h3>
          <ul className="overflow-y-auto max-h-[300px] space-y-4 no-scrollbar">
            {job.reviews.map((review, index) => (
              <li
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <span className="text-gray-800 font-semibold mr-2">
                    {review.client}:
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
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center">
          <button className="w-full px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition mt-6"
            onClick={() => setRequestModal(true)}
            disabled={isRequestLoading}
          >
            Request Service
          </button>
        </div>
      </div>
      {
        requestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative">
              {/* Cancel Icon */}
              <FaTimes
                className="absolute top-2 right-2 text-gray-500 text-xl cursor-pointer"
                onClick={() => setRequestModal(false)}
              />

              <h3 className="text-xl font-bold text-gray-800 mb-4">Request Service</h3>
              <textarea
                className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-600 transition"
                onClick={handelRequest}
              >
                Send Request
              </button>
            </div>
          </div>
        )},

      <div className="w-1/2 bg-white rounded-lg shadow-md p-6 relative z-10">
        <MapComponent userLocations={userLocations} />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
