import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

// Fix Leaflet icon issue with Webpack
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

// Custom icon for location markers
const customLocationIcon = L.icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

// Routing Machine Component
const RoutingMachine = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(...from), L.latLng(...to)],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [from, to, map]);

  return null;
};

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const hotelLocation = [11.6032, 37.3845]; 
  const hotelName = "Dib Anbessa Hotel";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setCurrentLocation([9.0325, 38.7469]);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setCurrentLocation([9.0325, 38.7469]);
    }
  }, []);

  return (
    <div className="w-full h-[500px]">
      {currentLocation ? (
        <MapContainer
          center={currentLocation}
          zoom={6} 
          scrollWheelZoom={true}
          className="w-full h-full rounded-lg"
        >
          {/* Base Map Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Current Location Marker */}
          <Marker position={currentLocation} icon={customLocationIcon}>
            <Popup>You are here!</Popup>
          </Marker>

          {/* Hotel Location Marker */}
          <Marker position={hotelLocation} icon={customLocationIcon}>
            <Tooltip>{hotelName}</Tooltip> {/* Tooltip showing hotel name */}
            <Popup>{hotelName}</Popup>
          </Marker>

          {/* Routing from Current Location to Hotel */}
          <RoutingMachine from={currentLocation} to={hotelLocation} />
        </MapContainer>
      ) : (
        <p className="text-center mt-4">Fetching your location...</p>
      )}
    </div>
  );
};

export default MapComponent;
