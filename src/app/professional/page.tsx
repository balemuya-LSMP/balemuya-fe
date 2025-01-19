/* eslint-disable @next/next/no-img-element */
import { FaUser, FaRegFileAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdVerifiedUser, MdPersonAdd, MdPayment } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { FiClipboard } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";

import Image from "next/image";
import Footer from "../(features)/_components/footer";
import Link from "next/link";
import Header from "./_components/header";

const workSamples = [
  {
    id: 1,
    poster_image: "/images/user.jpg",
    postr_name: "John Doe",
    category: "Home Services",
    title: "Electrician",
    description:
      "Expert in residential and commercial electrical repairs and installations.",
    image: "/images/user.jpg",
  },
  {
    id: 2,
    poster_image: "/images/user.jpg",
    postr_name: "John Doe",
    category: "Repair and Maintenance",
    title: "Appliance Repair Technician",
    description:
      "Specialist in repairing household appliances like refrigerators and washing machines.",
    image: "/images/user.jpg",
  },
  {
    id: 3,
    poster_image: "/images/user.jpg",
    postr_name: "John Doe",
    category: "Event Services",
    title: "Photographer",
    description:
      "Professional photographer for weddings, parties, and corporate events.",
    image: "/images/user.jpg",
  },
  {
    id: 4,
    poster_image: "/images/user.jpg",
    postr_name: "John Doe",
    category: "Technology and IT",
    title: "CCTV Installation Technician",
    description:
      "Secure your home and office with expert CCTV installation services.",
    image: "/images/user.jpg",
  },
  {
    id: 5,
    poster_image: "/images/user.jpg",
    postr_name: "John Doe",
    category: "Construction and Renovation",
    title: "Painter",
    description: "Professional painting services for homes and offices.",
    image: "/images/user.jpg",
  },
  {
    id: 6,
    poster_image: "/images/user.jpg",
    postr_name: "John Doe",
    category: "Health and Wellness",
    title: "Personal Trainer",
    description:
      "Customized fitness training programs for individuals and groups.",
    image: "/images/user.jpg",
  },
  {
    id: 7,
    poster_image: "/images/user.jpg",
    postr_name: "John Doe",
    category: "Health and Wellness",
    title: "Personal Trainer",
    description:
      "Customized fitness training programs for individuals and groups.",
    image: "/images/user.jpg",
  },
];

export default function Home() {
  return (
    <div className="bg-gray-50 font-sans">
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[35rem] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/ele.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-3xl text-center text-white space-y-6">
          <h2 className="text-5xl font-bold">Welcome to Balemuya</h2>
          <p className="text-xl">
            Connecting Professionals and Customers in Ethiopia
          </p>
          <div className="flex justify-center space-x-6">
            <button className="px-8 py-3 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition">
              Get Started
            </button>
            <button className="px-8 py-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-300 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100">
        <div className="text-center mb-10">
          <h3 className="text-4xl font-bold text-gray-800">Features</h3>
        </div>
        <div className="container mx-5 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <FaMapMarkerAlt />, text: "Location-Based Search" },
            { icon: <FiClipboard />, text: "Service Registration" },
            { icon: <MdPayment />, text: "Secure Payments" },
            { icon: <HiOutlineBriefcase />, text: "Apply for Work" },
          ].map(({ icon, text }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-8 bg-white rounded-lg shadow hover:shadow-xl transition"
            >
              <div className="text-purple-700 text-5xl mb-4">{icon}</div>
              <p className="text-gray-800 text-lg font-medium">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work Posts Section */}
      <section className="py-12 bg-gray-100">
        <div className="text-center mb-10">
          <h3 className="text-4xl font-bold text-gray-800">New Jobs</h3>
          <p className="text-gray-600 text-lg">Work Posted by customers.</p>
        </div>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {workSamples.map((work) => (
            <div
              key={work.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <h4 className="text-lg text-gray-800 mb-2">{work.title}</h4>

              <div className="flex items-center text-gray-500">
                <IoIosTime className="text-purple-700 text-lg mr-2" />
                <span className="text-sm">
                  {Math.floor(Math.random() * 24)} hours ago
                </span>
              </div>
              <div className="flex  justify-between  items-center py-4">
                <div className="flex items-center text-gray-500">
                  <GrStatusGood className="text-purple-700 text-lg mr-2" />
                  <span className="text-sm">
                    {Math.random() > 0.5 ? "Urgent" : "Normal"}
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <FaLocationDot className="text-purple-700 text-lg mr-2" />
                  <span className="text-sm">2km Away</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{work.description}</p>
              <div className="flex justify-start mt-6">
                <button className="px-2 py-2 bg-purple-transparent text-purple-700 rounded-lg transition">
                  Apply
                </button>
              </div>
              <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                  <Link href="/professional/profile">
                    <Image
                      src={work.poster_image}
                      alt={work.postr_name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </Link>
                </div>
                <div className="ml-3">
                  <h5 className="text-sm font-medium text-gray-800">
                    <span className="text-purple-700">Post by: </span>
                    {work.postr_name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-200">
        <div className="text-center mb-10">
          <h3 className="text-4xl font-bold text-gray-800">How It Works</h3>
        </div>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <MdPersonAdd />, text: "Register as a Professional" },
            { icon: <FaUser />, text: "Create a Profile" },
            { icon: <MdVerifiedUser />, text: "Verify Your Credentials" },
            { icon: <FaRegFileAlt />, text: "Apply for Job" },
          ].map(({ icon, text }, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-3xl mb-4">
                {icon}
              </div>
              <p className="text-gray-800 text-lg">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
