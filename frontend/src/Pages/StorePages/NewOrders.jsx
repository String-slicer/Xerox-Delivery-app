// NewOrders.jsx
import React, { useState } from "react";
import Navbar from "../../components/storecomponents/Navbar";
const NewOrders = () => {
  // Sample order data (can be fetched from a database or API)
  const orders = [
    { id: 1, customerName: "John Doe", documentType: "Invoice", status: "Pending" },
    { id: 2, customerName: "Jane Smith", documentType: "Contract", status: "Pending" },
    // Add more orders as needed
  ];

  const handleAcceptOrder = (orderId) => {
    alert(`Order ${orderId} Accepted.`);
  };

  const handleCancelOrder = (orderId) => {
    alert(`Order ${orderId} Cancelled.`);
  };

  const handleSearchCaptain = (orderId) => {
    alert(`Searching for captain for Order ${orderId}.`);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        {/* <Navbar /> */}
      <h2 className="text-3xl font-semibold mb-6">New Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Order ID: {order.id}</h3>
            <p className="text-lg text-gray-600">Customer: {order.customerName}</p>
            <p className="text-lg text-gray-600">Document Type: {order.documentType}</p>
            <p className="text-lg text-gray-600">Status: {order.status}</p>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleAcceptOrder(order.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
              >
                Accept Order
              </button>
              <button
                onClick={() => handleCancelOrder(order.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Cancel Order
              </button>
              <button
                onClick={() => handleSearchCaptain(order.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Search for Captain
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NewOrders };

export default NewOrders;
