/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';
import { FaUser, FaRegFileAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdVerifiedUser, MdPersonAdd, MdPayment } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { FiClipboard } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { useGeolocation } from "@/hooks/useGeolocation";
import Footer from "../(features)/_components/footer";
import Link from "next/link";
import Header from "./_components/header";
import { useGetServicePostsQuery, useCreateApplicationMutation, useSearchServicesQuery, useServiceFilterMutation } from "@/store/api/services.api";
import { useUserProfileQuery } from "@/store/api/userProfile.api";
import Loader from "../(features)/_components/loader";
import { useEffect, useState } from "react";
import { getDistanceFromLatLon, timeDifference } from "@/shared/utils";
import {toast, ToastContainer} from "react-toastify";


export default function Home() {
  const { data: workPosts, error, isLoading } = useGetServicePostsQuery({});
  const { data: userProfile } = useUserProfileQuery({});
  const { position, getPosition } = useGeolocation();
  const [createApplication] = useCreateApplicationMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedWorkId, setSelectedWorkId] = useState("")
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string[]>([]);


  const { data: searchResults } = useSearchServicesQuery(searchQuery);
  const [filterServices, { data: filteredResults }] = useServiceFilterMutation();



  const handleFilter = async (updatedFilter: string[]) => {
    const newData = {
      categories: updatedFilter,
    }
    await filterServices({ data: newData }).unwrap();
  };

  // it sends  the id and message to the server 
  const handleApply = async (id: string) => {
    try{
     await createApplication({ service_id: id, message: message }).unwrap();
      toast.success("Application Sent Successfully");
      setMessage("");
      setModalOpen(false);
    }catch(err){
      console.log(err);
      toast.error("Please update your subscription plan to apply for this job");
    }
  };

  useEffect(() => {
    getPosition();
  }, []);


  const userLat = position?.lat ?? userProfile?.user?.user?.address.latitude;
  const userLng = position?.lng ?? userProfile?.user?.user?.address.longitude;


  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 font-sans">
      <Header searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        handleFilter={handleFilter}
      />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[35rem] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/main.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-3xl text-center text-white space-y-6">
          <h2 className="text-5xl font-bold">Welcome to Balemuya</h2>
          <p className="text-xl">
            Connecting Professionals and Customers in Ethiopia
          </p>

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
      <section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h3 className="text-5xl font-extrabold text-gray-800">New Jobs</h3>
          <p className="text-gray-600 text-lg mt-2">Work Posted by Customers</p>
        </div>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {(searchQuery && searchResults?.length > 0
            ? searchResults
            : filter.length > 0
              ? filteredResults
              : workPosts
          )?.map((work: any) => (
            <div key={work.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 relative">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{work.title}</h4>
              <div className="flex items-center text-gray-600 text-sm">
                <IoIosTime className="text-purple-700 text-xl mr-2" />
                <span>{timeDifference(new Date(), new Date(work.created_at))}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <div className="flex items-center text-gray-600 text-sm">
                  <GrStatusGood className="text-purple-700 text-xl mr-2" />
                  <span>{work.urgency}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <FaLocationDot className="text-purple-700 text-xl mr-2" />
                  <span>{getDistanceFromLatLon(userLat, userLng, work.location.latitude, work.location.longitude)}</span>
                </div>
              </div>
              <p className="text-gray-700 mt-4">{work.description}</p>
              <div className="mt-6">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
                  onClick={() => {
                    setSelectedWorkId(work.id)
                    setModalOpen(true)
                  }}>
                  Apply Now
                </button>
              </div>

              <div className="flex items-center mt-6 pt-4 border-t border-gray-200">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-600 shadow-md">
                  <Link href={`/professional/customer/${work.customer?.user?.id}`}>
                    <img
                      src={work.customer_profile_image}
                      alt={work.customer_first_name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </Link>
                </div>
                <div className="ml-3">
                  <h5 className="text-sm font-medium text-gray-900">
                    <span className="text-purple-700">Posted by:</span> {work.customer?.user?.first_name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-96 relative">
              {/* Close Button (Top Right) */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Apply for Job</h3>
              <p className="text-gray-600 mb-4">Write a message to the customer</p>

              <textarea
                className="w-full h-22 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              {/* Button Container */}
              <div className="flex justify-end space-x-3 mt-5">
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
                  onClick={() => {
                    if (selectedWorkId !== null) {
                      handleApply(selectedWorkId);
                      setModalOpen(false);
                    }
                  }}
                >
                  Submit
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
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
