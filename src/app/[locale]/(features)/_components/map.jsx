"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useGeolocation } from "@/hooks/useGeolocation";

// Fix Leaflet icon issue
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const customLocationIcon = L.icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

const RoutingMachine = ({ from, to }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !from || !to) return;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(...from), L.latLng(...to)],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: true,
      lineOptions: {
        styles: [{ color: "#3388ff", weight: 5, opacity: 0.8 }],
      },
      createMarker: () => null,
    }).addTo(map);

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, from?.[0], from?.[1], to?.[0], to?.[1]]);

  return null;
};

const MapComponent = ({ userLocations }) => {
  const defaultPosition = { lat: 11.5923, lng: 37.3908 };
  const { isLoading, position, error, getPosition } = useGeolocation(defaultPosition);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    getPosition();
  }, [getPosition]);


   console.log("crrentLocation", position);
const currentLocation = position
  ? [position.lat, position.lng]
  : [defaultPosition.lat, defaultPosition.lng];

  const targetUser = userLocations?.[0];
  const targetLocation = targetUser
    ? [targetUser.latitude, targetUser.longitude]
    : null;


  return (
    <div className="w-full h-[500px] relative rounded-lg shadow-lg overflow-hidden">
      {isLoading ? (
        <p className="text-center text-gray-600 mt-4">Fetching your location...</p>
      ) : (
        <MapContainer
          center={currentLocation}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
          whenCreated={() => setMapReady(true)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Your Location */}
          <Marker position={currentLocation} icon={customLocationIcon}>
            <Popup>You are here!<br />{currentLocation.join(", ")}</Popup>
          </Marker>

          {/* User Markers */}
          {userLocations.map((user, index) => (
            <Marker
              key={index}
              position={[user.latitude, user.longitude]}
              icon={DefaultIcon}
            >
              <Popup>
                {user.name}<br />
                {user.latitude}, {user.longitude}
              </Popup>
            </Marker>
          ))}

          {/* Show Routing Line */}
          {mapReady && currentLocation && targetLocation && (
            <RoutingMachine from={currentLocation} to={targetLocation} />
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
