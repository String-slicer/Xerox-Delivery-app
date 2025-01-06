import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CaptainOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const captain = useSelector((state) => state.captain.captain); 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:4000/captain/captainOrders/${captain._id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [captain._id]);

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold text-gray-600">Loading orders...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold text-red-600">Error: {error}</p>
            </div>
        );

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Captain Orders</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-300 cursor-pointer"
                        onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Order ID: {order._id}
                                </h2>
                                <p className="text-gray-600">
                                    Created At: {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <p
                                className={`text-sm font-medium ${
                                    selectedOrder?._id === order._id
                                        ? "text-blue-600"
                                        : "text-gray-600"
                                }`}
                            >
                                {selectedOrder?._id === order._id ? "Hide Details" : "View Details"}
                            </p>
                        </div>
                        {selectedOrder?._id === order._id && (
                            <div className="mt-4 border-t pt-4">
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Total Amount:</span> ₹
                                    {order.totalAmount || "N/A"}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Status:</span> {order.status}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Customer Name:</span> {order.customerName || "N/A"}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Delivery Address:</span> {order.deliveryAt || "N/A"}
                                </p>
                                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                                    Items in Order:
                                </h3>
                                <ul className="space-y-2">
                                    {order.documents.map((doc, index) => (
                                        <li
                                            key={index}
                                            className="bg-gray-100 p-3 rounded-lg shadow-sm"
                                        >
                                            <p className="text-gray-700">
                                                <span className="font-medium">Name:</span> {doc.name}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-medium">Copies:</span> {doc.copies}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-medium">Size:</span> {doc.size}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-medium">Color:</span> {doc.color}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaptainOrdersPage;
