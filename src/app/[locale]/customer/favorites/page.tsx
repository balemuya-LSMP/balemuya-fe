/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAddFavoritesMutation, useFetchFavoritesQuery } from "@/store/api/userProfile.api";
import { FaHeart, FaArrowLeft, FaRegHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import StarRating from "../../(features)/_components/StarRating";
import Header from "../_components/header";
import { Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useFilterProfessionalsQuery } from "@/store/api/user.api";
import Footer from "../../(features)/_components/footer";

export default function FavoritesPage() {
  const { data: favorites, isLoading, refetch, error } = useFetchFavoritesQuery();
  const { data: professionalData } = useFilterProfessionalsQuery({});
  const [toggleFavorite] = useAddFavoritesMutation();

  const isFavorited = (favprofessionalId: string) => {
    return professionalData?.professionals?.some((professional: { id: string }) => professional.id === favprofessionalId);
  };

  const toggleFavorites = async (professionalId: string) => {
    try {
      await toggleFavorite({ professional: professionalId }).unwrap();
      await refetch();
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };

  return (
    <>
      <Header searchQuery="" setSearchQuery={() => {}} />
      <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/customer/professionals"
            className="bg-slate-300 p-2 rounded-lg text-purple-700 hover:text-purple-800 transition-colors duration-300 flex items-center gap-2 font-medium"
            aria-label="Back to Professionals"
          >
            <FaArrowLeft className="text-xl" />
            <span>Back</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-80">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 text-lg font-semibold">
              Unable to load favorites. Please try again later.
            </p>
          </div>
        ) : favorites?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite: any) => (
              <div
                key={favorite.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
              >
                <div className="p-6 flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img
                      src={favorite.professional.profile_image_url || "/default-profile.png"}
                      alt={favorite.professional.full_name}
                      className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500 shadow-sm"
                    />
                    <div>
                      <p className="text-xl font-semibold text-gray-900">
                        {favorite.professional.full_name}
                      </p>
                      {favorite.professional.org_name && (
                        <p className="text-sm text-gray-500 font-medium">
                          {favorite.professional.org_name}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorites(favorite.professional.id);
                    }}
                    className="text-2xl transition-colors duration-300 p-2 rounded-full hover:bg-gray-100"
                    aria-label={isFavorited(favorite.professional.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorited(favorite.professional.id) ? (
                      <FaHeart className="text-red-500 hover:text-red-600" />
                    ) : (
                      <FaRegHeart className="text-gray-400 hover:text-red-500" />
                    )}
                  </button>
                </div>

                <div className="px-6 pb-4">
                  <StarRating rating={favorite.professional.rating || 0} />
                  {favorite.professional.address && (
                    <div className="flex items-center mt-3 gap-2 text-gray-600">
                      <FaLocationDot className="text-purple-600" />
                      <p className="text-sm font-medium">
                        {favorite.professional.address.city}, {favorite.professional.address.region}
                      </p>
                    </div>
                  )}
                  <div className="mt-4">
                    {favorite.professional.bio ? (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {favorite.professional.bio}
                      </p>
                    ) : (
                      <p className="text-gray-400 text-sm italic">No bio provided</p>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 mt-auto">
                  <Link
                    href={`/customer/professionals/${favorite.professional.id}`}
                    className="block bg-purple-700 text-white py-3 px-6 rounded-xl text-center font-semibold hover:bg-indigo-700 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="text-gray-600 text-xl font-semibold mb-4">
              You haven&apos;t added any favorites yet.
            </p>
            <Link
              href="/customer/professionals"
              className="inline-block bg-purple-700 text-white py-3 px-8 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
              Browse Professionals
            </Link>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}