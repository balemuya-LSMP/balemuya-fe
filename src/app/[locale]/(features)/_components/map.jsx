import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
  const routingControlRef = React.useRef(null);

  useEffect(() => {
    if (!map || !from || !to) return;

    // Clean up previous routing control if it exists
    if (routingControlRef.current) {
      try {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      } catch (error) {
        console.warn("Error removing previous routing control:", error);
      }
    }

    // Create new routing control
    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(...from), L.latLng(...to)],
      routeWhileDragging: true,
      show: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: "#3388ff", weight: 4 }],
      },
    }).addTo(map);

    // Error handling for routing machine
    routingControlRef.current.on("routingerror", (e) => {
      console.error("Routing error:", e.error);
    });

    return () => {
      if (map && routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        } catch (error) {
          console.warn("Error during cleanup:", error);
        }
      }
    };
  }, [from, to, map]);

  return null;
};

const MapComponent = ({ userLocations }) => {
  const defaultPosition = { lat: 11.5923, lng: 37.3908 };
  const { isLoading, position, error, getPosition } =
    useGeolocation(defaultPosition);
  const [mapReady, setMapReady] = React.useState(false);

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  const currentLocation = position
    ? [position.lat, position.lng]
    : [defaultPosition.lat, defaultPosition.lng];

  if (error) {
    console.error("Error fetching location:", error);
  }

  return (
    <div className="w-full h-[500px] relative">
      {isLoading && !position ? (
        <p className="text-center mt-4">Fetching your location...</p>
      ) : (
        <>
          <style jsx global>{`
            .leaflet-routing-container {
              display: none !important;
            }
          `}</style>

          <MapContainer
            center={currentLocation}
            zoom={12}
            scrollWheelZoom={true}
            className="w-full h-full rounded-lg"
            whenCreated={() => setMapReady(true)}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={currentLocation} icon={customLocationIcon}>
              <Popup>You are here!</Popup>
            </Marker>

            {userLocations?.map((user, index) => (
              <Marker
                key={index}
                position={[user.latitude, user.longitude]}
                icon={customLocationIcon}
              >
                <Popup>{user?.name}</Popup>
              </Marker>
            ))}

            {mapReady && currentLocation && userLocations?.[0] && (
              <RoutingMachine
                from={currentLocation}
                to={[userLocations[0].latitude, userLocations[0].longitude]}
              />
            )}
          </MapContainer>
        </>
      )}
    </div>
  );
};

export default MapComponent;
