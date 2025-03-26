'use client';
import Footer from "../_components/footer";
import Header from "../_components/header";
import MapComponent from "../_components/map";

export default function WorksPage() {
  // Define the positions of 5 customers (latitude and longitude)
  const customerLocations = [
    { name: "Customer 1", latitude: 11.609, longitude: 37.384 },
    { name: "Customer 2", latitude: 11.610, longitude: 37.385 },
    { name: "Customer 3", latitude: 11.611, longitude: 37.386 },
    { name: "Customer 4", latitude: 11.612, longitude: 37.387 },
    { name: "Customer 5", latitude: 11.613, longitude: 37.388 },
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Side: Professionals List */}
        <div className="w-1/3 bg-white shadow-lg p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Professionals</h2>
          <ul className="space-y-3">
            {["John Doe - Designer", "Jane Smith - Developer", "Emily Clark - Marketing"].map(
              (professional, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-100 rounded-lg shadow hover:bg-gray-200 cursor-pointer"
                >
                  {professional}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Right Side: Map */}
        <div className="w-2/3">
          <MapComponent userLocations={customerLocations} /> {/* Pass customer locations to MapComponent */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
