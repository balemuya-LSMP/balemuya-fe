/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useGetCategoriesQuery } from '@/store/api/services.api';
import { GrStatusGood } from "react-icons/gr";
import { FaLocationDot, FaBusinessTime, FaStar, FaUser } from "react-icons/fa6";
import {
  useGetServicePostByIdQuery,
  useUpdateServicePostMutation,
  useDeleteServicePostMutation,
  useGetApplicationforServicePostQuery,
  useAcceptApplicationMutation,
} from '@/store/api/services.api';
import Loader from "@/app/(features)/_components/loader";
import Header from '../../_components/header';
import Footer from '@/app/(features)/_components/footer';
import { toast, ToastContainer } from 'react-toastify';


export default function WorkDetails() {
  const router = useRouter();
  const { id } = useParams();
  const { data: applicationsData } = useGetApplicationforServicePostQuery(id as string);
  const { data: work, isLoading, error } = useGetServicePostByIdQuery(id as string);
  const { data: categories } = useGetCategoriesQuery();
  const [acceptApplication] = useAcceptApplicationMutation();
  const [updateService] = useUpdateServicePostMutation();
  const [deleteService] = useDeleteServicePostMutation();

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: '',
    work_due_date: '',
  });

  if (isLoading) {
    return <Loader />;
  }

  const applications = applicationsData?.data;
  console.log(applications);

  const handleEditClick = () => {
    setFormData({
      title: work.title,
      description: work.description,
      category: work.category,
      urgency: work.urgency,
      work_due_date: work.work_due_date.split('T')[0],
    });
    setShowEditModal(true);
  };

  const handleAcceptApplication = async (id: string) => {
    await acceptApplication(id);
    toast.success('Application accepted successfully');
  }
  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof id === 'string') {
      await updateService({ id, data: formData });
    }

    setShowEditModal(false);
  };

  const handleDelete = async () => {
    if (typeof id === 'string') {
      await deleteService(id);
    }
    router.push('/customer/work');
  };

  return (
    <>
      <Header />
      <div className="flex justify-start items-center min-h-screen  bg-gray-100 p-4">
        <div
          key={work.id}
          className="bg-white p-12 rounded-xl shadow-xl transition-all transform hover:scale-105 border border-gray-200 hover:border-purple-600 hover:shadow-2xl hover:opacity-95 cursor-pointer max-w-2xl w-full"
        >
          <div className="flex items-center mb-6 space-x-4">
            <img
              src={work.customer_profile_image}
              alt="Customer Profile"
              className="w-16 h-16 rounded-full border-2 border-purple-500 shadow-md" />
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-1 hover:text-purple-600 transition-all">
                {work.title}
              </h4>
              <div className="flex items-center space-x-2 text-gray-700">
                <FaUser className="text-purple-600" />
                <span className="font-medium">Customer ID: {work.customer_id}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <GrStatusGood className="text-green-500 text-lg" />
              <span className="font-medium text-gray-700">{work.urgency}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBusinessTime className="text-purple-600 text-lg" />
              <span className="font-medium text-gray-700">
                Due: {format(new Date(work.work_due_date), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaLocationDot className="text-blue-600 text-lg" />
              <span className="font-medium text-gray-700">
                {work.location.city}, {work.location.region}, {work.location.country}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-500 text-lg" />
              <span className="font-medium text-gray-700">Rating: {work.customer_rating}</span>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">{work.description}</p>

          <div className="flex justify-end gap-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
              onClick={handleEditClick}
            >
              <MdEdit />
              <span>Edit</span>
            </button>
            <button
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center space-x-2"
              onClick={handleDelete}
            >
              <MdDelete />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {showEditModal && (
          <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-5 rounded-lg w-full max-w-xs shadow-3xl relative mt-16 overflow-auto max-h-[90vh]">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>

              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Edit Job</h3>

              <form onSubmit={handleUpdatePost} className="space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    required />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                    rows={1}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    required
                  >
                    {categories?.map((category: { name: string }, index: number) => (
                      <option key={index} value={category.name} className="text-gray-900">
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium">Urgency</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    required
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium">Work Due Date</label>
                  <input
                    type="date"
                    name="work_due_date"
                    value={formData.work_due_date}
                    onChange={(e) => setFormData({ ...formData, work_due_date: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    required />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-all"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-3 py-2 rounded-lg hover:bg-gray-500 transition-all"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* List of application card */}
        <div className="mt-6 p-6">
          <div className="flex flex-col space-y-4">
            {applications?.map((application: any) => (
              <div
                key={application.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all w-full max-w-2xl mx-auto"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={application.professional_profile_image}
                    alt="Applicant Profile"
                    className="w-16 h-16 rounded-full border-2 border-purple-500 shadow-md"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {application.professional_name}
                    </h4>
                    <p className="text-gray-600 text-sm">Rating: ⭐ {application.rating}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 text-lg leading-relaxed">{application.message}</p>
                  <p className="text-sm text-gray-500 mt-2">Status: {application.status}</p>
                  <p className="text-sm text-gray-500">Applied on: {new Date(application.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleAcceptApplication(application.id)}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer position='top-center'/>
      </div>
      <Footer />
    </>
  );
}
