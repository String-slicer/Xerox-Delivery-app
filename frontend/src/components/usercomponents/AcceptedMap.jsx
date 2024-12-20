import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const AcceptedMap = ({ orderData }) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!orderData || !orderData.storeId || !userLocation || !orderData.deliveryPartnerId) {
      return;
    }

    const map = mapRef.current;

    if (map) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(orderData.deliveryPartnerId.location.ltd, orderData.deliveryPartnerId.location.lng),
          L.latLng(orderData.storeId.location.ltd, orderData.storeId.location.lng),
          L.latLng(userLocation.lat, userLocation.lng)
        ],
        routeWhileDragging: true,
        router: L.Routing.osrmv1({
          serviceUrl: `https://router.project-osrm.org/route/v1/bike/`
        })
      }).addTo(map);

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [orderData, userLocation]);

  return (
    <MapContainer
      center={[orderData?.storeId?.location?.ltd || 0, orderData?.storeId?.location?.lng || 0]}
      zoom={12}
      scrollWheelZoom
      className="w-full h-full"
      whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {orderData && userLocation && (
        <>
          <Marker position={[orderData.storeId.location.ltd, orderData.storeId.location.lng]} title="Store Location" />
          <Marker position={[userLocation.lat, userLocation.lng]} title="User Location" />
          <Marker position={[orderData.deliveryPartnerId.location.ltd, orderData.deliveryPartnerId.location.lng]} title="Captain Location" />
        </>
      )}
    </MapContainer>
  );
};

export default AcceptedMap;
