import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useGeolocation } from "@/hooks/useGeolocation";

// Fix Leaflet icon issue with Webpack
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

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
    if (!map || !from || !to || !from[0] || !from[1] || !to[0] || !to[1]) {
      console.log('RoutingMachine skipped - missing required data:', { from, to });
      return;
    }

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    try {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(from[0], from[1]),
          L.latLng(to[0], to[1])
        ],
        routeWhileDragging: true,
        show: false,
        addWaypoints: false,
        lineOptions: {
          styles: [{ color: "#3388ff", weight: 4 }],
        },
      }).addTo(map);

      routingControlRef.current.on('routesfound', (e) => {
        console.log('Route found:', e.routes);
      });

      routingControlRef.current.on('routingerror', (e) => {
        console.error('Routing error:', e.error);
      });

    } catch (error) {
      console.error('Error creating routing control:', error);
    }

    return () => {
      if (map && routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [from, to, map]);

  return null;
};

const MapComponent = ({ userLocations}) => {
  const defaultPosition = { lat: 11.5923, lng: 37.3908 };
  const { isLoading, position, error, getPosition } = useGeolocation(defaultPosition);
  const [mapReady, setMapReady] = React.useState(false);

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  const currentLocation = position
    ? [position.lat, position.lng]
    : [defaultPosition.lat, defaultPosition.lng];

  console.log("Current Location Data:", {
    rawPosition: position,
    currentLocation,
    isValid: currentLocation[0] && currentLocation[1]
  });
  console.log("User Locations:", userLocations);

  if (error) {
    console.error("Geolocation error:", error);
  }

  return (
    <div className="w-full h-[500px] relative">
      {isLoading ? (
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
            zoom={15}  // Increased zoom for better visibility
            scrollWheelZoom={true}
            className="w-full h-full rounded-lg"
            whenCreated={() => setMapReady(true)}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Current Location Marker */}
            {currentLocation[0] && currentLocation[1] && (
              <Marker 
                position={currentLocation} 
                icon={customLocationIcon}
                eventHandlers={{
                  add: () => console.log('Current location marker added'),
                  click: () => console.log('Current location marker clicked')
                }}
              >
                <Popup>You are here!<br/>{currentLocation.join(', ')}</Popup>
              </Marker>
            )}

            {/* User Locations */}
            {userLocations.map((user, index) => {
              const userPos = [user.latitude, user.longitude];
              console.log(`User ${index} location:`, userPos);
              return (
                <Marker
                  key={index}
                  position={userPos}
                  icon={DefaultIcon}  // Different icon for users
                  eventHandlers={{
                    add: () => console.log(`User ${index} marker added`),
                    click: () => console.log(`User ${index} marker clicked`)
                  }}
                >
                  <Popup>{user?.name}<br/>{userPos.join(', ')}</Popup>
                </Marker>
              );
            })}

            {/* Routing */}
            {mapReady && 
             currentLocation[0] && 
             currentLocation[1] && 
             userLocations[0]?.latitude && 
             userLocations[0]?.longitude && (
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