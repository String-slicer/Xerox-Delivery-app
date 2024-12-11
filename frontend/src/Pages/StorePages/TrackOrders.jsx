// TrackOrders.jsx
import React, { useState } from "react";
import Navbar from "../../components/storecomponents/Navbar";
const TrackOrders = () => {
  // Sample order data (can be fetched from a database or API)
  const orders = [
    { id: 1, customerName: "John Doe", status: "Delivered", deliveryDate: "2024-12-01" },
    { id: 2, customerName: "Jane Smith", status: "In Process", deliveryDate: "2024-12-10" },
    // Add more orders as needed
  ];

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        {/* <Navbar /> */}
      <h2 className="text-3xl font-semibold mb-6">Track Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Order ID: {order.id}</h3>
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
