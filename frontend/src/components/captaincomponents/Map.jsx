import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for marker icons
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Component to disable default zoom control
const DisableZoomControls = () => {
  const map = useMap();
  map.zoomControl.remove(); // Remove the zoom control
  return null;
};

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[100%] bg-gray-100">
      <div className="w-full max-w-4xl h-96 rounded-lg overflow-hidden shadow-lg">
        {currentPosition ? (
          <MapContainer
            center={currentPosition}
            zoom={13}
            scrollWheelZoom
            className="w-full h-full"
          >
            <DisableZoomControls />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentPosition}>
              <Popup>
                You are here! <br /> Latitude: {currentPosition[0]}, Longitude: {currentPosition[1]}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Fetching your location...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
