import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useGeolocation } from "@/hooks/useGeolocation"; 

// Fix Leaflet icon issue with Webpack
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


const RoutingMachine = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(...from), L.latLng(...to)],
      routeWhileDragging: true,
      show: false, 
      addWaypoints: false,
    }).addTo(map);

    return () => {
      if (routingControl && routingControl._map) {
        map.removeControl(routingControl);
      }
    };
  }, [from, to, map]);

  return null;
};

const MapComponent = ({ userLocations }) => {
  const defaultPosition = { lat: 11.5923, lng: 37.3908 };
  const { isLoading, position, error, getPosition } = useGeolocation(defaultPosition);

  useEffect(() => {
    getPosition();
  }, [getPosition]);


  const currentLocation = position ? [position.lat, position.lng] : [defaultPosition.lat, defaultPosition.lng];

  if (error) {
    console.error("Error fetching location:", error);
  }

  return (
    <>
      {/* Global CSS override to hide routing instructions */}
      <style jsx global>{`
        .leaflet-routing-container,
        .leaflet-routing-alt,
        .leaflet-routing-instructions {
          display: none !important;
        }
      `}</style>

      <div className="w-full h-[500px]">
        {isLoading && !position ? (
          <p className="text-center mt-4">Fetching your location...</p>
        ) : (
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

            {/* Marker for your current location */}
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
            {currentLocation &&
              userLocations &&
              userLocations.length > 0 && (
                <RoutingMachine
                  from={currentLocation}
                  to={[userLocations[0].latitude, userLocations[0].longitude]}
                />
              )}
          </MapContainer>
        )}
      </div>
    </>
  );
};

export default MapComponent;
