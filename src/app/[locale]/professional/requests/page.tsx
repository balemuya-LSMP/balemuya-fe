/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {Link} from "@/i18n/navigation";
import Header from "../_components/header";
import { FaLocationDot } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { IoIosTime } from "react-icons/io";
import { useGetServicesQuery, useGetRequestedServicesQuery } from "@/store/api/services.api";
import { getDistanceFromLatLon, timeDifference } from "@/shared/utils";
import { useGeolocation } from "@/hooks/useGeolocation";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../(features)/_components/footer";


export default function JobsPage() {
  const { position, getPosition } = useGeolocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState("");
  const validStatuses = ["accepted", "canceled", "rejected"];




  const { data: serviceRequests } = useGetRequestedServicesQuery(activeTab);



  useEffect(() => {
    getPosition();
  }, []);

  const userLat = position?.lat ?? 11.60000000;
  const userLng = position?.lng ?? 37.38333330;

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} filter={filter} setFilter={setFilter} />
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
                {tab === "" ? "New Request" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <hr className="border-t-2 border-gray-200" />
          {
            serviceRequests?.length === 0 && (
              <div className="flex items-center justify-center h-96">
                <p className="text-gray-500 text-lg">No jobs found</p>
              </div>
            )
          }

          {/* Jobs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {serviceRequests?.map((request: any) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="flex-1">
                  <p className="text-2xl font-semibold text-gray-800 mb-4">{request?.detail}</p>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-500">
                      <GrStatusGood className="text-purple-700 text-lg mr-2" />
                      <span className="text-sm px-2 rounded bg-purple-400">
                        {request?.status && request.status.charAt(0).toUpperCase() + request?.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-500">
                      <div className="flex items-center text-sm">
                        <IoIosTime className="text-purple-700 text-lg mr-2" />
                        <span>{timeDifference(new Date(), new Date(request?.created_at))}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FaLocationDot className="text-purple-700 text-lg mr-2" />
                        <span>{getDistanceFromLatLon(userLat, userLng, request.customer?.user?.address?.latitude, request.customer?.user?.address?.longitude)}</span>
                      </div>
                    </div>
                  </div>
                  {/* poster info */}
                  <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                      <Link href={`/professional/customer/${request.customer?.user?.id}`}>
                        <img
                          src={request.customer.user?.profile_image_url}
                          alt={request.customer.user?.first_name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </Link>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-gray-800">{request.customer?.user?.first_name}</h5>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer position="top-center" />
      </div>
      <Footer />
    </>
  );
}