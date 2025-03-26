/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

export default function ProfileSettings() {
  const [adminInfo, setAdminInfo] = useState({
    fullName: 'Admin User',
    email: 'admin@example.com',
    avatar: '/images/user.jpg', // Example placeholder
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updated Admin Info:', adminInfo);
    alert('Profile updated successfully!');
    // Replace this with an API call to update the profile
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Profile Settings</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <img
            src={adminInfo.avatar}
            alt="Admin Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover mb-4"
          />
          <button className="text-purple-700 font-medium hover:underline">
            Change Avatar
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={adminInfo.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={adminInfo.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
