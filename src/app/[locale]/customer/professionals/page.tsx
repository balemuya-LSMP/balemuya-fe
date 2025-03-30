/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from "@/i18n/navigation";
import Header from "../_components/header";
import { useFilterProfessionalsQuery } from "@/store/api/user.api";
import { useGetCategoriesQuery } from "@/store/api/services.api";
import StarRating from "../../(features)/_components/StarRating";

export default function Professionals() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  const { data: categories } = useGetCategoriesQuery();

  const [rating, setRating] = useState<number>();
  const [distance, setDistance] = useState<number>();

  // Fetch professionals based on filters
  const { data: professionalsData, error, isLoading } = useFilterProfessionalsQuery({
    category: category || undefined,
    rating: rating || undefined,
    distance: distance || undefined,
  });

  const professionalsInfo = professionalsData?.professionals || [];

  console.log(professionalsInfo);

  // Filter professionals based on search input
  const filteredProfessionals = professionalsInfo?.filter(
    (professional: any) =>
      professional.name.toLowerCase().includes(search.toLowerCase()) ||
      professional.title.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <>
      <Header searchQuery={""} setSearchQuery={function (query: string): void {
        throw new Error("Function not implemented.");
      } } />
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
            name="category"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-700 cursor-pointer"
            required
            value={category ?? ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" hidden>
              Select a category
            </option>
            {categories?.map(
              (category: { name: string }, index: number) => (
                <option
                  key={index}
                  value={category.name}
                  className="text-gray-900"
                >
                  {category.name}
                </option>
              )
            )}
          </select>
          {/* Distance Filter */}
          <input
            type="number"
            placeholder="Enter max distance (km)"
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />

          {/* Rating Filter */}
          <input
            type="number"
            placeholder="Enter min rating (0-5)"
            min="0"
            max="5"
            step="0.1"
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </aside>

        {/* Professionals Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:w-3/4 w-full">
          {isLoading ? (
            <p className="text-gray-600 text-lg col-span-full text-center">Loading professionals...</p>
          ) : error ? (
            <p className="text-red-500 text-lg col-span-full text-center">Failed to load professionals.</p>
          ) : filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional: any) => (
              <div
                key={professional.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col h-full"
              >
                <div className="flex justify-between items-center mx-4 mt-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={professional.profile_image}
                      alt={professional?.name}
                      className="w-20 h-20 object-cover rounded-full border-2 border-purple-500"
                    />
                    <p className="text-lg font-semibold">{professional.name}</p>
                  </div>
                  {/* Displaying rating stars */}
                  <StarRating rating={professional?.rating} />
                </div>
                <div className="flex items-center ml-8 mt-2 gap-2 text-gray-600">
                  <FaLocationDot className="text-purple-700" />
                  <p>{professional.distance} km Away</p>
                </div>
                <div className="p-4 flex-grow">
                  <p className="text-gray-700 mt-2 overflow-hidden line-clamp-3">{professional?.bio}</p>
                </div>
                <div className="p-4">
                  <button className="mt-4 bg-purple-700 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-600 transition"
                    onClick={() => router.push(`/customer/professionals/${professional.id}`)}
                  >
                    View Details
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
