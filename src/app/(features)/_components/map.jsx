import React, { useState, useEffect } from "react";
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

// Routing Machine Component: draws a route between two points on the map
const RoutingMachine = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(...from), L.latLng(...to)],
      routeWhileDragging: true,
      show: false, // Hide the control UI if you only need the route line
      addWaypoints: false,
    }).addTo(map);

    return () => {
      // Check that the routing control is still attached before removing it
      if (routingControl && routingControl._map) {
        map.removeControl(routingControl);
      }
    };
  }, [from, to, map]);

  return null;
};

const MapComponent = ({ userLocations }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  // Get the current location of the user
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
      setCurrentLocation([9.0325, 38.7469]); // Fallback location
    }
  }, []);

  return (
    <div className="w-full h-[500px]">
      {currentLocation ? (
        <MapContainer
          center={currentLocation}
          zoom={12}
          scrollWheelZoom={true}
          className="w-full h-full rounded-lg"
        >
          {/* Base Map Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker for the current location */}
          <Marker position={currentLocation} icon={customLocationIcon}>
            <Popup>You are here!</Popup>
          </Marker>

          {/* Markers for other user locations */}
          {userLocations &&
            userLocations.map((user, index) => (
              <Marker
                key={index}
                position={[user.latitude, user.longitude]}
                icon={customLocationIcon}
              >
                <Popup>{user?.name}</Popup>
              </Marker>
            ))}

          {/* Draw a route from the current location to the first user location */}
          {currentLocation && userLocations && userLocations.length > 0 && (
            <RoutingMachine
              from={currentLocation}
              to={[userLocations[0].latitude, userLocations[0].longitude]}
            />
          )}
        </MapContainer>
      ) : (
        <p className="text-center mt-4">Fetching your location...</p>
      )}
    </div>
  );
};

export default MapComponent;