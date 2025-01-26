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
  console.log(newOrders);

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
    <div className="max-w-7xl mx-auto mt-4 sm:mt-8 p-2 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-[#F8F9FB]">New Orders</h2>
      {newOrders.length === 0 ? (
        <div className="text-center text-[#F8F9FB] py-8">No new orders</div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {newOrders.map((order) => (
            order && order.userId && (
              <div key={order._id} className="bg-[#1D2A36] border border-[#32415D] p-4 sm:p-6 rounded-xl shadow-lg">
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-medium text-[#F8F9FB]">Order ID: {order._id}</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <p className="text-base sm:text-lg text-[#F8F9FB]">Customer: {order.userId.fullName.firstName}</p>
                    <p className="text-base sm:text-lg text-[#F8F9FB]">Document: {order.documents[0].name}</p>
                    <p className="text-base sm:text-lg text-[#F8F9FB]">Status: {order.status}</p>
                    <p className="text-base sm:text-lg text-[#F8F9FB]">Amount: ₹{order.totalAmount}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleAcceptOrder(order._id)}
                    className="w-full sm:w-auto bg-[#F4C753] text-[#141C24] px-4 py-2 rounded-lg hover:bg-[#f4c753ee]"
                  >
                    Accept Order
                  </button>
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                  >
                    Cancel Order
                  </button>
                  <button
                    onClick={() => handleSearchCaptain(order._id)}
                    className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                    disabled={loadingOrderId === order._id || allocatedOrders.includes(order._id)}
                  >
                    {allocatedOrders.includes(order._id) ? "Captain Allocated" : (loadingOrderId === order._id ? "Searching..." : "Search for Captain")}
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export { NewOrders };
export default NewOrders;
