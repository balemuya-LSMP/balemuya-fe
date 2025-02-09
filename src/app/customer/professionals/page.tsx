"use client";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Header from "../_components/header";

/* eslint-disable @next/next/no-img-element */
const professionalsData = [
  { id: 1, name: "John Doe", title: "Plumber", description: "Lorem ipsum dolor sit amet.", image: "/images/user.jpg" },
  { id: 2, name: "Jane Doe", title: "Electrician", description: "Lorem ipsum dolor sit amet.", image: "/images/user.jpg" },
  { id: 3, name: "James Doe", title: "Carpenter", description: "Lorem ipsum dolor sit amet.", image: "/images/user.jpg" },
  { id: 4, name: "Jenny Doe", title: "Painter", description: "Lorem ipsum dolor sit amet.", image: "/images/user.jpg" },
];

export default function Professionals() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Filter professionals by search & category
  const filteredProfessionals = professionalsData.filter((professional) =>
    (category === "All" || professional.title === category) &&
    (professional.name.toLowerCase().includes(search.toLowerCase()) ||
      professional.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar - Filters */}
        <aside className="md:w-1/4 w-full bg-white shadow-lg p-4 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or title"
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Category Filter */}
          <select
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Painter">Painter</option>
          </select>
        </aside>

        {/* Professionals Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:w-3/4 w-full">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => (
              <div
                key={professional.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex justify-between items-center mx-4 mt-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={professional.image}
                      alt={professional.title}
                      className="w-20 h-20 object-cover rounded-full border-2 border-purple-500"
                    />
                    <p className="text-lg font-semibold">{professional.name}</p>
                  </div>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
                <div className="flex items-center ml-8 mt-2 gap-2 text-gray-600">
                  <FaLocationDot className="text-purple-700" />
                  <p>2km Away</p>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{professional.title}</h2>
                  <p className="text-gray-700 mt-2">{professional.description}</p>
                  <button className="mt-4 bg-purple-700 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-600 transition">
                    Hire
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg col-span-full text-center">No professionals found.</p>
          )}
        </section>
      </div>
    </>
  );
}
