/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";
import {Link} from "@/i18n/navigation";
import { FaEye } from "react-icons/fa";
import { useListRequestsQuery } from "@/store/api/user.api";
import Loader from "@/app/[locale]/(features)/_components/loader";

const PendingRequests = () => {
    const { data, isLoading, error } = useListRequestsQuery({});

    const requests = data?.data || [];
    console.log(requests);
    if (isLoading) return <Loader />;


    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
                Pending Requests
            </h2>

            {requests?.length === 0 ? (
                <p className="text-gray-600 text-center italic">No pending requests.</p>
            ) : (
                <div className="space-y-4">
                    {requests?.map((request: any) => (
                        <div
                            key={request.id}
                            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-300 transition-all duration-200 hover:shadow-md hover:bg-gray-200"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={request.user.profile_image_url}
                                    alt={request.user.first_name}
                                    className="w-14 h-14 rounded-full border border-gray-400"
                                />
                                <div>
                                    <p className="text-gray-800 font-medium">
                                        {request.user.first_name} {request.user.middle_name} {request.user.last_name}
                                    </p>
                                    <p className="text-gray-500 text-sm">{request.user.user_type}</p>
                                </div>
                            </div>

                            {/* Profile View Button */}
                            <Link href={`/admin/dashboard/users/professionals/${request.user.id}?requestId=${request.id}`} className="text-gray-500 hover:text-blue-300">
                                <FaEye className="w-6 h-6" />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PendingRequests;
