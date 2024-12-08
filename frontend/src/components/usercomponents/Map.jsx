import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configure default marker icons
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // First, attempt to get the current position
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setCurrentPosition([latitude, longitude]);
          setAccuracy(accuracy);
          setIsError(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setIsError(true);
          alert("Unable to fetch location. Ensure location services are enabled.");
        },
        {
          enableHighAccuracy: true, // Request the most accurate position available
          timeout: 10000, // Timeout after 10 seconds
          maximumAge: 0, // No cached location
        }
      );
    };

    updatePosition(); // Get initial position

    // Watch the position and update continuously
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCurrentPosition([latitude, longitude]);
        setAccuracy(accuracy); // Update accuracy
        setIsError(false);
      },
      (error) => {
        console.error("Error fetching location:", error);
        setIsError(true);
        alert("Unable to fetch location. Ensure location services are enabled.");
      },
      {
        enableHighAccuracy: true, // Request the most accurate position available
        timeout: 10000, // Timeout after 10 seconds
        maximumAge: 0, // No cached location
      }
    );

    // Cleanup watcher on component unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-100">
      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
        {currentPosition ? (
          <MapContainer
            center={currentPosition}
            zoom={16} // Higher zoom for better precision
            scrollWheelZoom
            className="w-full h-full"
            zoomControl={false}

          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentPosition}>
              <Popup>
                <strong>You are here!</strong>
                <br />
                Latitude: {currentPosition[0].toFixed(5)}, Longitude: {currentPosition[1].toFixed(5)}
                <br />
                Accuracy: {accuracy ? `${accuracy} meters` : "Unknown"}
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
