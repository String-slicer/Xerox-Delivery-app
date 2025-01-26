import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, updateOrderStatus } from "../../slices/storeSlice";
import { SocketContext } from "../../context/socketcontext";
import printJS from "print-js";

const TrackOrders = () => {
  const dispatch = useDispatch();
  const acceptedOrders = useSelector((state) => state.store.acceptedOrders);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const handleOrderStatusUpdate = (data) => {
      console.log("Order status updated:", data);
      dispatch(updateOrderStatus(data));
    };

    socket.on("orderStatusUpdate", handleOrderStatusUpdate);

    return () => {
      socket.off("orderStatusUpdate", handleOrderStatusUpdate);
    };
  }, [socket, dispatch]);

  const handlePrint = (doc) => {
    const { fileHash, color, copies } = doc; // Extracting required details
    const url = `https://ipfs.io/ipfs/${fileHash}`;

    // Configuration for color and copies
    const printSettings = {
      printable: url,
      type: "pdf",
      showModal: true,
      properties: {
        colorMode: color === "Black & White" ? "bw" : "color", // Example setting for color mode
        copies: copies, // Number of copies
      },
    };

    // Using printJS with enhanced settings
    printJS(printSettings);
  };

  const handleDelete = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  return (
    <div className="max-w-7xl mx-auto mt-4 sm:mt-8 p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#F8F9FB]">Track Orders</h2>
        <select className="w-full sm:w-auto bg-[#29374C] text-[#F8F9FB] px-4 py-2 rounded-lg">
          <option>All Orders</option>
          <option>Processing</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {acceptedOrders.map((order) => (
          <div key={order._id} className="bg-[#1D2A36] border border-[#32415D] p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div className="w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h3 className="text-lg sm:text-xl font-medium text-[#F8F9FB]">Order #{order._id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs inline-block ${
                    order.status === 'Completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-[#A3AED0] mt-1">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p className="text-[#F4C753] text-xl font-semibold">₹{order.totalAmount}</p>
                <p className="text-[#A3AED0] text-sm">{order.paymentStatus}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="text-[#A3AED0] text-sm uppercase mb-2">Customer Details</h4>
                <div className="space-y-2 text-[#F8F9FB]">
                  <p>Name: {order.userId?.fullName?.firstName} {order.userId?.fullName?.lastName}</p>
                  <p>Contact: {order.userId?.contact}</p>
                  {/* <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p> */}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[#A3AED0] text-sm uppercase mb-2">Documents</h4>
                {order.documents.map((doc) => (
                  <div key={doc._id} className="bg-[#29374C] p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[#F8F9FB] font-medium">{doc.name}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm text-[#A3AED0]">
                          <p>Size: {doc.size}</p>
                          <p>Color: {doc.color}</p>
                          <p>Copies: {doc.copies}</p>
                          <p>Quality: {doc.paperQuality}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePrint(doc)}
                        className="bg-[#F4C753] text-[#141C24] px-4 py-2 rounded-lg hover:bg-[#f4c753ee] transition-colors"
                      >
                        Print
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#32415D] flex justify-end">
              <button
                onClick={() => handleDelete(order._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TrackOrders };
export default TrackOrders;
