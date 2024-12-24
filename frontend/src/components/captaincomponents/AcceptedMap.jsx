import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';

const AcceptedMap = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [captainLocation, setCaptainLocation] = useState({ lat: 0, lng: 0 });
  const currentOrder = useSelector((state) => state.captain.currentOrder);

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current).setView(
      [currentOrder.storeId.location.ltd, currentOrder.storeId.location.lng],
      30
    );

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    setMapInstance(map);

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [currentOrder]);

  useEffect(() => {
    if (!mapInstance) return;

    // Add markers with permanent labels
    const addMarkerWithLabel = (lat, lng, color, label) => {
      // Add marker
      L.circleMarker([lat, lng], {
        color,
        radius: 8,
      }).addTo(mapInstance);

      // Add label
      L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'custom-label',
          html: `<div style="color: ${color}; font-weight: bold;">${label}</div>`,
          iconSize: [0, 0], // No icon size, only the label will show
        }),
      }).addTo(mapInstance);
    };

    // Add markers for "Captain", "Store", and "You"
    addMarkerWithLabel(
      captainLocation.lat,
      captainLocation.lng,
      'red',
      'Captain'
    );

    addMarkerWithLabel(
      currentOrder.storeId.location.ltd,
      currentOrder.storeId.location.lng,
      'green',
      'Store'
    );

    addMarkerWithLabel(
      currentOrder.userId.location.ltd,
      currentOrder.userId.location.lng,
      'blue',
      'user'
    );

    // Fetch and draw route using OSRM
    fetch(
      `https://router.project-osrm.org/route/v1/driving/${captainLocation.lng},${captainLocation.lat};${currentOrder.storeId.location.lng},${currentOrder.storeId.location.ltd};${currentOrder.userId.location.lng},${currentOrder.userId.location.ltd}?overview=full&geometries=geojson`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;
          const geojsonLayer = L.geoJSON(route, {
            style: {
              color: '#0073e6',
              weight: 4,
            },
          });
          geojsonLayer.addTo(mapInstance);
        } else {
          console.error('No route found.');
        }
      })
      .catch((error) => console.error('Error fetching route:', error));
  }, [mapInstance, currentOrder, captainLocation]);

  useEffect(() => {
    const updateCaptainLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCaptainLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    updateCaptainLocation();
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCaptainLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '50vh' }} />;
};

export default AcceptedMap;
