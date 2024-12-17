import React, { useState, useEffect } from "react";
import  {SocketContext}  from "../../context/socketcontext";
import axios from "axios"; // Axios for making API calls
import { useContext } from "react";
import { useSelector } from "react-redux";

const NewOrders = () => {
  const [orders, setOrders] = useState([
    { _id: "675e58a10c327c69dad03b20", customerName: "John Doe", documentType: "Invoice", status: "Pending" },
    { _id: 2, customerName: "Jane Smith", documentType: "Contract", status: "Pending" },
  ]);
  const {socket} = useContext(SocketContext);
  const [loadingOrderId, setLoadingOrderId] = useState(false);
  const [allocatedOrders, setAllocatedOrders] = useState([]);
  const store = useSelector((state) => state.store.store);

  useEffect(() => {
    // Listen for new orders from Socket.IO
    const handleNewOrder = (newOrder) => {
      console.log(newOrder);
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    };
  
    const handleOrderStatusUpdate = (data) => {
      setLoadingOrderId(null);
      console.log("orderStatusUpdate", data);
      setAllocatedOrders((prevAllocatedOrders) => [...prevAllocatedOrders, data.orderId]);
      alert(`Captain accepted for order ${data.orderId}`);
    };
  
    socket.on("newOrder", handleNewOrder);
    socket.on("orderStatusUpdate", handleOrderStatusUpdate);
  
    // Cleanup function to avoid duplicate listeners
    return () => {
      socket.off("newOrder", handleNewOrder);
      socket.off("orderStatusUpdate", handleOrderStatusUpdate);
    };
  }, [socket]);
  

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/orders/${orderId}/accept`);
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "Accepted" } : order
          )
        );
        alert(`Order ${orderId} Accepted.`);
      }
    } catch (error) {
      console.error("Error accepting order:", error);
      alert("Failed to accept the order. Please try again.");
    }
  };

  const handleCancelOrder = (orderId) => {
    try {
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      alert(`Order ${orderId} Cancelled.`);
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };

  const handleSearchCaptain = (orderId) => {
    setLoadingOrderId(orderId);
    console.log(store._id);
    socket.emit("find-captain", { orderId, range: 2,userId:store._id });
    console.log("searching for captain with id"+orderId)
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">New Orders</h2>

      <div className="space-y-6">
        {orders.map((order,index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Order ID: {order._id}</h3>
            <p className="text-lg text-gray-600">Customer: {order.customerName}</p>
            <p className="text-lg text-gray-600">Document Type: {order.documentType}</p>
            <p className="text-lg text-gray-600">Status: {order.status}</p>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleAcceptOrder(order._id)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
              >
                Accept Order
              </button>
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Cancel Order
              </button>
              <button
                onClick={() => handleSearchCaptain(order._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                disabled={loadingOrderId === order.id || allocatedOrders.includes(order.id)}
              >
                {allocatedOrders.includes(order._id) ? "Captain Allocated" : (loadingOrderId === order._id ? "Searching..." : "Search for Captain")}
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
