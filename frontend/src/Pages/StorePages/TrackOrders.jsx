// TrackOrders.jsx
import React from "react";
import { useSelector } from "react-redux";

const TrackOrders = () => {
  const acceptedOrders = useSelector((state) => state.store.acceptedOrders);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">Track Orders</h2>
      <div className="space-y-6">
        {acceptedOrders.map((order) => (
          <div key={order._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Order ID: {order._id}</h3>
            <p className="text-lg text-gray-600">Customer: {order.customerName}</p>
            <p className="text-lg text-gray-600">Status: {order.status}</p>
            <p className="text-lg text-gray-600">Delivery Date: {order.deliveryDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TrackOrders };
export default TrackOrders;
