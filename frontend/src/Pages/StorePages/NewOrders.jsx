import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socketcontext";
import { useDispatch, useSelector } from "react-redux";
import { acceptOrder, cancelOrder } from "../../slices/storeSlice";

const NewOrders = () => {
  const [loadingOrderId, setLoadingOrderId] = useState(false);
  const [allocatedOrders, setAllocatedOrders] = useState([]);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.store.store);
  const newOrders = useSelector((state) => state.store.newOrders) || [];

  useEffect(() => {
    const handleOrderStatusUpdate = (data) => {
      setLoadingOrderId(null);
      setAllocatedOrders((prevAllocatedOrders) => [...prevAllocatedOrders, data.orderId]);
      alert(`Captain accepted for order ${data.orderId}`);
    };

    socket.on("orderStatusUpdate", handleOrderStatusUpdate);

    return () => {
      socket.off("orderStatusUpdate", handleOrderStatusUpdate);
    };
  }, [socket]);

  const handleAcceptOrder = async (orderId) => {
    try {
      console.log(orderId, store._id);
      const response = await fetch(`http://localhost:4000/Order/storeAcceptOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          storeId: store._id,
        }),
      });
    
      if (response.ok) {
        const data = await response.json();
        dispatch(acceptOrder(orderId));
        alert(`Order ${orderId} Accepted.`);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error accepting the order:", error);
      alert("Failed to accept the order. Please try again.");
    }
  };

  const handleCancelOrder = (orderId) => {
    try {
      setAllocatedOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      socket.emit("cancel-order", { orderId, storeId: store._id });
      dispatch(cancelOrder(orderId));
      alert(`Order ${orderId} Cancelled.`);
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };

  const handleSearchCaptain = (orderId) => {
    setLoadingOrderId(orderId);
    socket.emit("find-captain", { orderId, range: 2, userId: store._id });
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">New Orders</h2>
      {newOrders.length === 0 ? (
        <div className="text-center text-gray-600">No new orders</div>
      ) : (
        <div className="space-y-6">
          {newOrders.map((order) => (
            <div key={order._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
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
                  disabled={loadingOrderId === order._id || allocatedOrders.includes(order._id)}
                >
                  {allocatedOrders.includes(order._id) ? "Captain Allocated" : (loadingOrderId === order._id ? "Searching..." : "Search for Captain")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { NewOrders };
export default NewOrders;
