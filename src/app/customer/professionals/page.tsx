import { FaLocationDot } from "react-icons/fa6";

/* eslint-disable @next/next/no-img-element */
const professionals = [
  {
    id: 1,
    name: "John Doe",
    title: "Plumber",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/user.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    title: "Electrician",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/user.jpg",
  },
  {
    id: 3,
    name: "James Doe",
    title: "Carpenter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/user.jpg",
  },
  {
    id: 4,
    name: "Jenny Doe",
    title: "Painter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/user.jpg",
  },
];
export default function Professionals() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-purple-700 mt-6">Professionals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {professionals.map((professional) => (
          <div
            key={professional.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex justify-between items-center mx-4">
              <div className="flex justify-center items-center gap-4">
                <img
                  src={professional.image}
                  alt={professional.title}
                  className="w-24 h-24 object-cover object-center rounded-full"
                />
                <p className="text-lg font-semibold">{professional.name}</p>
              </div>
              <span className="text-yellow-500">★★★★★</span>
            </div>

            <div>
              <div className="flex justify-start items-center ml-8 mt-2 gap-2">
                <FaLocationDot className="text-purple-700" />
                <p>2km Away</p>
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {professional.title}
              </h2>
              <p className="text-gray-700 mt-2">{professional.description}</p>
              <button className="mt-4 bg-purple-700 text-white py-2 px-4 rounded-lg">
                Hire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
