import {
  FaClipboardList,
  FaHandshake,
  FaMapMarkerAlt,
  FaSearch,
  FaUserPlus,
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FiArrowRight, FiClipboard } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import Image from "next/image";
import React from "react";
import Footer from "../(features)/_components/footer";

const workSamples = [
  {
    id: 1,
    name: "John Doe",
    category: "Home Services",
    location: "2 km",
    addresses: "Addis Ababa",
    title: "Electrician",
    description:
      "Expert in residential and commercial electrical repairs and installations.",
    image: "/images/user.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    category: "Repair and Maintenance",
    title: "Appliance Repair Technician",
    description:
      "Specialist in repairing household appliances like refrigerators and washing machines.",
    image: "/images/user.jpg",
  },
  {
    id: 3,
    name: "John Doe",
    category: "Event Services",
    title: "Photographer",
    description:
      "Professional photographer for weddings, parties, and corporate events.",
    image: "/images/user.jpg",
  },
  {
    id: 4,
    name: "John Doe",
    category: "Technology and IT",
    title: "CCTV Installation Technician",
    description:
      "Secure your home and office with expert CCTV installation services.",
    image: "/images/user.jpg",
  },
  {
    id: 5,
    name: "John Doe",
    category: "Construction and Renovation",
    title: "Painter",
    description: "Professional painting services for homes and offices.",
    image: "/images/user.jpg",
  },
  {
    id: 6,
    name: "John Doe",
    category: "Health and Wellness",
    title: "Personal Trainer",
    description:
      "Customized fitness training programs for individuals and groups.",
    image: "/images/user.jpg",
  },
];

export default function Home() {
  return (
    <div className="bg-gray-100 font-sans no-scrollbar">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">BALEMUYA</h1>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-purple-700">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-700">
              Professionals
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-700">
              Work Post
            </a>
          </nav>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <Image
              src="/images/user.jpg"
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />

            <div className="w-3 h-3 bg-green-500 rounded-full absolute top-0 right-0">
              Abebe
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[30rem] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/ele.png')" }}
      >
        <div className="max-w-2xl text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">
            Welcome to Balemuya <br />
            <span className="font-light text-lg">
              Connecting Professionals and Customers in Ethiopia
            </span>
          </h2>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800">
              Get Started
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100 px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800">FEATURES</h3>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <FaMapMarkerAlt />, text: "Location-Based Search" },
            { icon: <FiClipboard />, text: "Service Registration" },
            { icon: <MdPayment />, text: "Secure Payments" },
            { icon: <HiOutlineBriefcase />, text: "Apply for Work" },
          ].map(({ icon, text }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-purple-700 text-4xl mb-4">{icon}</div>
              <p className="text-gray-800 text-lg font-medium">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Professionals Section */}
      <section className="py-12 bg-white px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800">PROFESSIONALS</h3>
          <p className="text-gray-600">
            Browse available professionals for various services.
          </p>
        </div>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {workSamples.map((work) => (
            <div
              key={work.id}
              className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex justify-center gap-8 items-center">
                  <Image
                    src={work.image}
                    alt={work.title}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <p>{work.name}</p>
                </div>
              </div>

              <h4 className="text-lg font-bold mt-4 text-gray-800">
                {work.title}
              </h4>
              <p className="text-gray-600 mt-2 text-sm">{work.description}</p>
              <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
                Contact Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800">HOW IT WORKS</h3>
        </div>
        <div className="container mx-auto flex items-center justify-evenly">
          {[
            { icon: <FaUserPlus />, text: "Register as a Customer" },
            { icon: <FaClipboardList />, text: "Post Work" },
            { icon: <FaSearch />, text: "Review Applications" },
            { icon: <FaHandshake />, text: "Connect with Professionals" },
          ].map(({ icon, text }, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-purple-700 bg-white flex items-center justify-center text-gray-800">
                  {icon}
                </div>
                <p className="mt-2 text-center text-gray-800">{text}</p>
              </div>
              {/* Add arrow between steps except the last one */}
              {idx < arr.length - 1 && (
                <div className="text-gray-700 text-3xl mx-4">
                  <FiArrowRight />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
