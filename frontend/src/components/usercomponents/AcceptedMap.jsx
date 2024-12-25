import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AcceptedMap = ({ orderData }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // User location state

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current).setView(
      [orderData.storeId.location.ltd, orderData.storeId.location.lng],
      25
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
  }, [orderData]);

  useEffect(() => {
    if (!mapInstance) return;

    // Get user location from Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error fetching user location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    // Add markers with permanent labels
    const addMarkerWithLabel = (lat, lng, color, label) => {
      // Add marker
      const marker = L.circleMarker([lat, lng], {
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

    if (userLocation) {
      // Add markers for "Captain", "Store", and "You"
      addMarkerWithLabel(
        orderData.deliveryPartnerId.location.ltd,
        orderData.deliveryPartnerId.location.lng,
        'red',
        'Captain'
      );

      addMarkerWithLabel(
        orderData.storeId.location.ltd,
        orderData.storeId.location.lng,
        'green',
        'Store'
      );

      addMarkerWithLabel(userLocation.lat, userLocation.lng, 'blue', 'You');

      // Fetch and draw route using OSRM
      fetch(
        `https://router.project-osrm.org/route/v1/driving/${orderData.deliveryPartnerId.location.lng},${orderData.deliveryPartnerId.location.ltd};${orderData.storeId.location.lng},${orderData.storeId.location.ltd};${userLocation.lng},${userLocation.lat}?overview=full&geometries=geojson`
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
    }
  }, [mapInstance, orderData, userLocation]);

  return <div ref={mapRef} style={{ width: '100%', height: '50vh' }} />;
};

export default AcceptedMap;
