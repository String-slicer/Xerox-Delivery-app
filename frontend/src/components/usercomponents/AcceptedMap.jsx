import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import User from '../../assets/user.png';
import DeliveryBoy from "../../assets/deliveryScooter.png";
import Store from "../../assets/store.png";
const AcceptedMap = ({ orderData }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // User location state

  useEffect(() => {
    // Initialize map with zoomControl set to false
    const map = L.map(mapRef.current, {
      zoomControl: false  // This will remove the zoom control buttons
    }).setView(
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

    // Custom icon creation function
    const createCustomIcon = (iconUrl, color) => {
      return L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="background-color: ${color}; padding: 3px; border-radius: 50%; border: 2px solid white;">
            <img src="${iconUrl}" style="width: 20px; height: 20px;" />
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
      });
    };

    // Add markers with custom icons and permanent labels
    const addMarkerWithLabel = (lat, lng, type) => {
      let icon, color, label;
      
      switch(type) {
        case 'captain':
          icon = createCustomIcon(DeliveryBoy, '#FF4B4B');
          color = '#FF4B4B';
          label = 'Delivery Partner';
          break;
        case 'store':
          icon = createCustomIcon(Store, '#4CAF50');
          color = '#4CAF50';
          label = 'Store';
          break;
        case 'user':
          icon = createCustomIcon(User, '#2196F3');
          color = '#2196F3';
          label = 'You';
          break;
        default:
          return;
      }

      // Add marker with custom icon
      const marker = L.marker([lat, lng], { icon }).addTo(mapInstance);

      // Add permanent label
      const labelIcon = L.divIcon({
        className: 'custom-label',
        html: `
          <div style="
            background-color: ${color};
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 12px;
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          ">
            ${label}
          </div>
        `,
        iconSize: [100, 30],
        iconAnchor: [50, -5],
      });

      L.marker([lat, lng], { icon: labelIcon }).addTo(mapInstance);
      
      return marker;
    };

    if (userLocation) {
      // Add markers for all locations
      const captainMarker = addMarkerWithLabel(
        orderData.deliveryPartnerId.location.ltd,
        orderData.deliveryPartnerId.location.lng,
        'captain'
      );

      const storeMarker = addMarkerWithLabel(
        orderData.storeId.location.ltd,
        orderData.storeId.location.lng,
        'store'
      );

      const userMarker = addMarkerWithLabel(
        userLocation.lat,
        userLocation.lng,
        'user'
      );

      // Draw route with custom style
      fetch(
        `https://router.project-osrm.org/route/v1/driving/${orderData.deliveryPartnerId.location.lng},${orderData.deliveryPartnerId.location.ltd};${orderData.storeId.location.lng},${orderData.storeId.location.ltd};${userLocation.lng},${userLocation.lat}?overview=full&geometries=geojson`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0].geometry;
            const geojsonLayer = L.geoJSON(route, {
              style: {
                color: '#4A90E2',
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10',
                lineCap: 'round'
              }
            });
            geojsonLayer.addTo(mapInstance);
          }
        })
        .catch((error) => console.error('Error fetching route:', error));

      // Fit bounds to show all markers
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        [orderData.storeId.location.ltd, orderData.storeId.location.lng],
        [orderData.deliveryPartnerId.location.ltd, orderData.deliveryPartnerId.location.lng]
      ]);
      mapInstance.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [mapInstance, orderData, userLocation]);

  return <div ref={mapRef} style={{ width: '100%', height: '50vh' }} />;
};

export default AcceptedMap;
