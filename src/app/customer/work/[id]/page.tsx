'use client';

import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { GrStatusGood } from "react-icons/gr";
import { FaLocationDot, FaBusinessTime } from "react-icons/fa6";
import {
  useGetServicePostByIdQuery,
  useUpdateServicePostMutation,
  useDeleteServicePostMutation,
} from '@/store/api/services.api';
import Loader from "@/app/(features)/_components/loader";

export default function WorkDetails() {
  const router = useRouter()
  const { id } = useParams();
  const { data: work, isLoading, error } = useGetServicePostByIdQuery(id);


  const [updateService] = useUpdateServicePostMutation();
  const [deleteService] = useDeleteServicePostMutation();

  if (isLoading) {
    return <Loader/>;
  }


  const handleDelete = async()=>{

    await deleteService(id)

    router.push('/customer/work')

  }
 

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
  <div
    key={work.id}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200 hover:border-purple-600 hover:shadow-xl hover:opacity-90 cursor-pointer max-w-lg w-full"
  >
    <h4 className="text-2xl font-semibold text-gray-900 mb-4 hover:text-purple-600 transition-all">
      {work.title}
    </h4>
    <div className="flex items-center mb-3 space-x-2">
                    <GrStatusGood className="text-purple-600 text-lg transition-all" />
                    <span className="font-medium text-gray-700">{work.urgency}</span>
                </div>
                <div className="flex items-center mb-3 space-x-2">
                    <FaBusinessTime className="text-purple-600 text-lg transition-all" />
                    <span className="font-medium text-gray-700">
                        {format(new Date(work.work_due_date), 'MMM dd, yyyy')}
                    </span>
                </div>
    <p className="text-gray-700 text-base mb-4 line-clamp-3">{work.description}</p>
    <div className="flex justify-end gap-6">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all">
        Edit
      </button>
      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
      onClick={handleDelete}>
        Delete
      </button>
    </div>
  </div>
</div>

  );
}
