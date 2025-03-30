/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useGetCustomerByIdQuery } from "@/store/api/user.api";
import { useRequestProfessionalServiceMutation } from "@/store/api/services.api";
import { useEffect, useState } from "react";
import { getDistanceFromLatLon } from "@/shared/utils";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/app/[locale]/(features)/_components/loader";
import StarRating from "@/app/[locale]/(features)/_components/StarRating";
import MapComponent from "@/app/[locale]/(features)/_components/map";

const job = {
  id: 1,
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

};

export default function ProfessionalDetailsPage() {
  const { id } = useParams();
  const { data: customerData, isLoading } = useGetCustomerByIdQuery(id);
  const { position, getPosition } = useGeolocation();
  const [requestService] = useRequestProfessionalServiceMutation();
  const [requestModal, setRequestModal] = useState(false);
  const [message, setMessage] = useState("");

  const customerInfo = customerData?.data

  console.log(customerInfo);

  useEffect(() => { 
    getPosition();
  }, []); 

  const lat = customerInfo?.customer?.user?.address?.latitude;
  const lng = customerInfo?.customer?.user?.address?.longitude;

  const userLocations = [
    {
      latitude: lat,
      longitude: lng,
      name: customerInfo?.customer?.user?.first_name,
    },
  ];

  const handelRequest = () => {

    const newData = {
      professional_id: customerInfo?.customer?.user?.id,
      detail: message
    }
    requestService({data: newData}).unwrap();
    toast.success("Request sent successfully");
    setMessage("");
    setRequestModal(false);
  }
  if(isLoading) return <Loader/>
  return (
    <div className="flex h-screen items-start justify-between gap-6 px-6 py-6">
      <div className="container mx-auto px-6 py-6 w-1/2 h-[calc(100vh-20px)] overflow-y-auto no-scrollbar">
        {/* Job Details Card */}
        <div className="bg-slate-100 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center mb-2">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                <img
                  src={customerInfo?.customer?.user?.profile_image_url}
                  alt={customerInfo?.customer?.user?.first_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {customerInfo?.customer?.user?.first_name}
                </h2>
                <h3 className="text-lg font-serif mb-4 text-gray-800">
                  {customerInfo?.customer?.user?.user_type}
                </h3>
              </div>
            </div>
            <div>

              <span className="text-gray-800 text-lg">{customerInfo?.customer?.rating}</span>
              <StarRating rating={customerInfo?.customer?.rating}/>
              <p>{customerInfo?.customer?.user?.address?.country}</p>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <div className="flex items-center text-gray-500">
              <FaLocationDot className="text-purple-700 text-lg mr-2" />
              <span className="text-sm">{getDistanceFromLatLon(position?.lat ?? 11.60000000, position?.lng ?? 37.38333330, lat, lng)}</span>
            </div>

          </div>
          <h2 className="tetx-lg text-gray-700 font-medium">Bio</h2>
          <p className="text-gray-600 py-2 ">
            {customerInfo?.customer?.user?.bio}
          </p>

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
          onClick={() => setRequestModal(true)}>
            Request Service
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
        <MapComponent userLocations={userLocations} />
      </div>
     {
      requestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
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
      )
     }
     <ToastContainer position="top-center"/>
    </div>
  );
}
