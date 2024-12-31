
// import React, { useEffect, useContext } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { cancelOrder, updateOrderStatus } from "../../slices/storeSlice";
// import { SocketContext } from "../../context/socketcontext";
// import printJS from "print-js";

// const TrackOrders = () => {
//   const dispatch = useDispatch();
//   const acceptedOrders = useSelector((state) => state.store.acceptedOrders);
//   const { socket } = useContext(SocketContext);

//   useEffect(() => {
//     const handleOrderStatusUpdate = (data) => {
//       console.log("Order status updated:", data);
//       dispatch(updateOrderStatus(data));
//     };

//     socket.on("orderStatusUpdate", handleOrderStatusUpdate);

//     return () => {
//       socket.off("orderStatusUpdate", handleOrderStatusUpdate);
//     };
//   }, [socket, dispatch]);

//   const handlePrint = (fileHash) => {
//     const url = `https://ipfs.io/ipfs/${fileHash}`;
//     printJS({
//       printable: url,
//       type: "pdf",
//       showModal: true,
//     });
//   };

//   const handleDelete = (orderId) => {
//     dispatch(cancelOrder(orderId));
//   };

//   return (
//     <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-semibold mb-6">Track Orders</h2>
//       <div className="space-y-6">
//         {acceptedOrders.map((order) => (
//           <div key={order._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-medium">Order ID: {order._id}</h3>
//             <p className="text-lg text-gray-600">
//               Customer: {order.userId?.fullName?.firstName}{" "}
//               {order.userId?.fullName?.lastName}
//             </p>
//             <p className="text-lg text-gray-600">Contact: {order.userId?.contact}</p>
//             <p className="text-lg text-gray-600">Status: {order.status}</p>
//             <p className="text-lg text-gray-600">Total Amount: ₹{order.totalAmount}</p>
//             <p className="text-lg text-gray-600">Payment Status: {order.paymentStatus}</p>
//             <p className="text-lg text-gray-600">Delivery Date: {order.deliveryDate}</p>
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold">Documents:</h4>
//               {order.documents.map((doc) => (
//                 <div key={doc._id} className="mt-2">
//                   <p className="text-lg text-gray-600">Name: {doc.name}</p>
//                   <p className="text-lg text-gray-600">Size: {doc.size}</p>
//                   <p className="text-lg text-gray-600">Color: {doc.color}</p>
//                   <p className="text-lg text-gray-600">Copies: {doc.copies}</p>
//                   <p className="text-lg text-gray-600">Paper Quality: {doc.paperQuality}</p>
//                   <p className="text-lg text-gray-600">Binding: {doc.binding}</p>
//                   <p className="text-lg text-gray-600">Lamination: {doc.lamination}</p>
//                   <button
//                     onClick={() => handlePrint(doc.fileHash)}
//                     className="mt-2 bg-green-500 text-white p-2 rounded-lg"
//                   >
//                     Print
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={() => handleDelete(order._id)}
//               className="mt-4 bg-red-500 text-white p-2 rounded-lg"
//             >
//               Delete Order
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export { TrackOrders };
// export default TrackOrders;

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
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">Track Orders</h2>
      <div className="space-y-6">
        {acceptedOrders.map((order) => (
          <div key={order._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Order ID: {order._id}</h3>
            <p className="text-lg text-gray-600">
              Customer: {order.userId?.fullName?.firstName}{" "}
              {order.userId?.fullName?.lastName}
            </p>
            <p className="text-lg text-gray-600">Contact: {order.userId?.contact}</p>
            <p className="text-lg text-gray-600">Status: {order.status}</p>
            <p className="text-lg text-gray-600">Total Amount: ₹{order.totalAmount}</p>
            <p className="text-lg text-gray-600">Payment Status: {order.paymentStatus}</p>
            <p className="text-lg text-gray-600">Delivery Date: {order.deliveryDate}</p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Documents:</h4>
              {order.documents.map((doc) => (
                <div key={doc._id} className="mt-2">
                  <p className="text-lg text-gray-600">Name: {doc.name}</p>
                  <p className="text-lg text-gray-600">Size: {doc.size}</p>
                  <p className="text-lg text-gray-600">Color: {doc.color}</p>
                  <p className="text-lg text-gray-600">Copies: {doc.copies}</p>
                  <p className="text-lg text-gray-600">Paper Quality: {doc.paperQuality}</p>
                  <p className="text-lg text-gray-600">Binding: {doc.binding}</p>
                  <p className="text-lg text-gray-600">Lamination: {doc.lamination}</p>
                  <button
                    onClick={() => handlePrint(doc)}
                    className="mt-2 bg-green-500 text-white p-2 rounded-lg"
                  >
                    Print
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleDelete(order._id)}
              className="mt-4 bg-red-500 text-white p-2 rounded-lg"
            >
              Delete Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TrackOrders };
export default TrackOrders;
