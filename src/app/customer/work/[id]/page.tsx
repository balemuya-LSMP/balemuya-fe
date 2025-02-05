/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const router = useRouter();
  const { id } = useParams();
  const { data: work, isLoading, error } = useGetServicePostByIdQuery(id as string);

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
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
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
                  required
                />
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
                  <option value="Web Development">Web Development</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Writing">Writing</option>
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
                  required
                />
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
    </div>
  );
}
