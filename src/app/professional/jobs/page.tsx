/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/(features)/_components/footer";
import Header from "../_components/header";
import { FaLocationDot } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoIosTime } from "react-icons/io";
import { useGetServicesQuery } from "@/store/api/services.api";
import { getDistanceFromLatLon, timeDifference } from "@/shared/utils";
import { useGeolocation } from "@/hooks/useGeolocation";


export default function JobsPage() {
  const { position, getPosition } = useGeolocation();
  const [activeTab, setActiveTab] = useState("");
 
  // Define valid statuses
  const validStatuses = ["pending", "accepted", "rejected", "booked", "canceled"];

  const { data: servicesData } = useGetServicesQuery(activeTab);


  useEffect(() => {
    getPosition();
  }, []);


  const userLat = position?.lat ?? 11.60000000;
  const userLng = position?.lng ?? 37.38333330;

  const services = servicesData?.data

  console.log(servicesData);

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Tabs Section */}
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-center space-x-4 mb-4">
            {["", "pending", "accepted", "rejected", "booked", "canceled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab
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
            {services?.map((job:any, index:any) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between"
              >
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h4>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-500">
                        <GrStatusGood className="text-purple-700 text-lg mr-2" />
                        <span className="text-sm">{job?.status}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <AiOutlineExclamationCircle className="text-purple-700 text-lg mr-2" />
                        <span className="text-sm">{job?.urgency}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center text-gray-500">
                          <IoIosTime className="text-purple-700 text-lg mr-2" />
                          <span className="text-sm">{timeDifference(new Date(), new Date(job?.created_at))}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <FaLocationDot className="text-purple-700 text-lg mr-2" />
                          <span className="text-sm">{getDistanceFromLatLon(userLat, userLng, job?.location.latitude, job?.location.longitude)}</span>
                        </div>
                      </div>
                    </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                </div>
                <div className="flex justify-end items-center">
                  <button className="px-4 py-2 w-1/4 bg-transparent font-bold text-purple-700 rounded-lg transition">
                    Apply
                  </button>
                </div>
                <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                    <Link href={`/professional/customer/${job.customer_id}`}>
                      <img
                        src={job?.customer_profile_image}
                        alt={job.postr_name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </Link>
                  </div>

                  <div className="ml-3">
                    <h5 className="text-sm font-medium text-gray-800">{job?.customer_first_name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
