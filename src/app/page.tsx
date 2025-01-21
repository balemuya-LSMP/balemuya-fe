/* eslint-disable @next/next/no-img-element */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Footer from "./(features)/_components/footer";
import Header from "./(features)/_components/header";

export default function Landing() {
  const testimonials = [
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "John Doe",
      feedback: "This platform helped me find great professionals quickly!",
    },
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Jane Smith",
      feedback: "A fantastic experience! I found everything I needed!",
    },
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Alice Johnson",
      feedback: "The best platform for connecting with experts!",
    },
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Bob Brown",
      feedback: "I found the perfect professional for my project!",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[url('/images/main.jpg')] bg-cover bg-center py-24 sm:py-32">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-xl mx-auto text-center text-white px-4 sm:px-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Connect Professionals with Customers
          </h1>
          <p className="text-base sm:text-lg mb-6 sm:mb-8">
            Whether you&apos;re a skilled professional seeking clients or a
            customer looking for reliable expertise nearby, we make it simple
            for both.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition">
              Find Professionals
            </button>
            <button className="px-4 py-2 sm:px-6 sm:py-3 border text-white rounded-md hover:bg-purple-800 transition">
              Offer Your Services
            </button>
          </div>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300">
            Simplifying connections for professionals and customers in your
            local area.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 text-center">
          <div className="p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Find Experts
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Browse a wide range of professionals in various fields to meet
              your needs.
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Post Opportunities
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Share your work requirements and let professionals come to you.
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Connect Seamlessly
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Communicate and collaborate with ease on our platform.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Looking for Professionals?
          </h2>
          <p className="text-sm sm:text-base text-gray-800 p-2 sm:p-4">
            Find the right expert for your project or job and get started today.
          </p>
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-700 text-white rounded hover:bg-purple-800">
            Browse Professionals
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-gray-200 text-white py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          What Our Users Say
        </h2>
        <div className="w-full max-w-3xl mx-auto px-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center">
                  <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-sm text-center flex flex-col justify-center items-center">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s avatar`}
                      width={72}
                      height={72}
                      className="rounded-full mb-4 shadow-md"
                    />
                    <p className="text-sm sm:text-base text-gray-800 italic mb-4">{`"${testimonial.feedback}"`}</p>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
