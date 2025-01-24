import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = () => {
  // State to hold user's current location
  const [currentLocation, setCurrentLocation] = useState(null);

  // Fetch user's current location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
          // Fallback to a default location if location access is denied
          setCurrentLocation([51.505, -0.09]);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Fallback to a default location
      setCurrentLocation([51.505, -0.09]);
    }
  }, []);

  return (
    <div className="w-full h-[500px]">
      {currentLocation ? (
        <MapContainer
          center={currentLocation} // Use the current location as the center
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full rounded-lg"
        >
          {/* Base Map Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker at Current Location */}
          <Marker position={currentLocation}>
            <Popup>
              You are here! <br /> Latitude: {currentLocation[0]}, Longitude: {currentLocation[1]}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="text-center mt-4">Fetching your location...</p>
      )}
    </div>
  );
};

export default MapComponent;
