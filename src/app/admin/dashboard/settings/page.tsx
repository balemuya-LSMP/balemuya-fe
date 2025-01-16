'use client';

import { FaUser, FaBell, FaLock, FaCogs } from 'react-icons/fa';
import Link from 'next/link';

export default function Setting() {
  const settingsOptions = [
    {
      icon: <FaUser className="text-2xl text-purple-700" />,
      title: 'Profile Settings',
      description: 'Update your personal information and manage your account.',
      link: '/dashboard/settings/profile',
    },
    {
      icon: <FaBell className="text-2xl text-green-600" />,
      title: 'Notifications',
      description: 'Manage notification preferences and alerts.',
      link: '/dashboard/settings/notifications',
    },
    {
      icon: <FaLock className="text-2xl text-blue-600" />,
      title: 'Privacy',
      description: 'Adjust privacy settings to control data visibility.',
      link: '/dashboard/settings/privacy',
    },
    {
      icon: <FaCogs className="text-2xl text-orange-500" />,
      title: 'General Settings',
      description: 'Configure app preferences and general settings.',
      link: '/dashboard/settings/general',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        App Settings
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
        {settingsOptions.map((option, index) => (
          <Link href={option.link} key={index}>
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <div className="p-4 bg-gray-100 rounded-full">{option.icon}</div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {option.title}
                </h2>
                <p className="text-gray-600">{option.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
