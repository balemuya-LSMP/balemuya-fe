"use client";

import { useState, useEffect } from "react"; // Import useEffect
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/(features)/_components/footer";
import Header from "../_components/header";
import { FaLocationDot } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { IoIosTime } from "react-icons/io";

const workSamples = [
  {
    id: 1,
    poster_image: "/images/user.jpg",
    postr_name: "John Doe",
    category: "Home Services",
    title: "Electrician",
    description: "Expert in residential and commercial electrical repairs.",
    status: "Pending",
  },
  {
    id: 2,
    poster_image: "/images/user.jpg",
    postr_name: "Jane Smith",
    category: "Repair and Maintenance",
    title: "Appliance Repair Technician",
    description: "Specialist in repairing household appliances.",
    status: "Completed",
  },
  {
    id: 3,
    poster_image: "/images/user.jpg",
    postr_name: "Emily Johnson",
    category: "Event Services",
    title: "Photographer",
    description: "Professional photographer for events.",
    status: "Pending",
  },
  {
    id: 4,
    poster_image: "/images/user.jpg",
    postr_name: "Mark Lee",
    category: "Technology and IT",
    title: "CCTV Installation Technician",
    description: "Secure your home and office with CCTV installation.",
    status: "New Jobs",
  },
  // Added more job samples
  {
    id: 5,
    poster_image: "/images/user.jpg",
    postr_name: "Anna Taylor",
    category: "Education",
    title: "Tutor",
    description: "Experienced tutor for math and science subjects.",
    status: "Completed",
  },
  {
    id: 6,
    poster_image: "/images/user.jpg",
    postr_name: "Chris Evans",
    category: "Creative Services",
    title: "Graphic Designer",
    description: "Expert in graphic design and digital arts.",
    status: "New Jobs",
  },
  {
    id: 7,
    poster_image: "/images/user.jpg",
    postr_name: "Sarah Williams",
    category: "Healthcare",
    title: "Nurse",
    description: "Experienced nurse available for home visits.",
    status: "Pending",
  },
];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("New Jobs");
  const [randomValues, setRandomValues] = useState<{
    randomStatus: string[];
    randomTime: number[];
  }>({ randomStatus: [], randomTime: [] });

  const filteredJobs = workSamples.filter((job) => job.status === activeTab);

  // Generate random values on the client side
  useEffect(() => {
    const randomStatus = workSamples.map(() =>
      Math.random() > 0.5 ? "Urgent" : "Normal"
    );
    const randomTime = workSamples.map(() => Math.floor(Math.random() * 24));
    setRandomValues({ randomStatus, randomTime });
  }, []);

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Tabs Section */}
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-center space-x-4 mb-4">
            {["New Jobs", "Applied", "Pending", "Completed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-medium transition-colors duration-300 ${activeTab === tab
                    ? "text-purple-700 border-b-2 border-purple-700"
                    : "text-gray-700 hover:text-purple-700"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <hr className="border-t-2 border-gray-200" />

          {/* Jobs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between"
              >
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {job.title}
                  </h4>
                  {randomValues.randomStatus && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-500">
                        <GrStatusGood className="text-purple-700 text-lg mr-2" />
                        <span className="text-sm">
                          {randomValues.randomStatus[index]}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">

                        <div className="flex items-center text-gray-500">
                          <IoIosTime className="text-purple-700 text-lg mr-2" />
                          <span className="text-sm">
                            {randomValues.randomTime[index]} hours ago
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <FaLocationDot className="text-purple-700 text-lg mr-2" />
                          <span className="text-sm">2km away</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-gray-600 mb-4">{job.description}</p>
                </div>
                <div className="flex justify-end items-center">
                  <button className="px-4 py-2 w-1/4 bg-transparent font-bold text-purple-700 rounded-lg transition">
                    Apply
                  </button>
                </div>
                <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                    <Link href="/professional/profile">
                      <Image
                        src={job.poster_image}
                        alt={job.postr_name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </Link>
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-medium text-gray-800">
                      {job.postr_name}
                    </h5>
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
