import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StoreOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const store = useSelector((state) => state.store.store);

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Accepted': 'bg-green-100 text-green-800',
            'In Progress': 'bg-blue-100 text-blue-800',
            'Delivered': 'bg-gray-100 text-gray-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:4000/Store/storeOrders/${store._id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
                const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
                setLoading(false);
                console.log(orders);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [store._id]);

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
        <div className="min-h-screen bg-[#131C24] px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#F8F9FB] mb-6 sm:mb-8">Store Orders</h1>
            <div className="space-y-3 sm:space-y-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-[#1D2A36] border border-[#32415D] rounded-lg p-4 sm:p-6 hover:border-[#F4C753] transition duration-300"
                        onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                            <div className="space-y-2 w-full sm:w-auto">
                                <h2 className="text-base sm:text-lg font-semibold text-[#F8F9FB]">
                                    Order #{order._id.slice(-6)}
                                </h2>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                    <p className="text-[#F8F9FB] text-xs sm:text-sm">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <button className={`w-full sm:w-auto text-sm font-medium px-3 sm:px-4 py-2 rounded-lg ${
                                selectedOrder?._id === order._id
                                    ? "bg-[#F4C753] text-[#141C24]"
                                    : "bg-[#29374C] text-[#F8F9FB]"
                            }`}>
                                {selectedOrder?._id === order._id ? "Hide Details" : "View Details"}
                            </button>
                        </div>

                        {selectedOrder?._id === order._id && (
                            <div className="mt-4 sm:mt-6 border-t border-[#32415D] pt-4 sm:pt-6 space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-3">
                                        <h3 className="text-sm sm:text-base text-[#F8F9FB] font-semibold">Customer Details</h3>
                                        <div className="bg-[#29374C] p-3 sm:p-4 rounded-lg">
                                            <p className="text-sm sm:text-base text-[#F8F9FB]">
                                                <span className="font-medium">Name:</span>{" "}
                                                {order.userId?.fullName?.firstName} {order.userId?.fullName?.lastName}
                                            </p>
                                            <p className="text-sm sm:text-base text-[#F8F9FB]">
                                                <span className="font-medium">Email:</span> {order.userId?.email}
                                            </p>
                                            <p className="text-sm sm:text-base text-[#F8F9FB]">
                                                <span className="font-medium">Contact:</span> {order.userId?.contact}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {order.deliveryPartnerId && (
                                        <div className="space-y-3">
                                            <h3 className="text-sm sm:text-base text-[#F8F9FB] font-semibold">Delivery Partner</h3>
                                            <div className="bg-[#29374C] p-3 sm:p-4 rounded-lg">
                                                <p className="text-sm sm:text-base text-[#F8F9FB]">
                                                    <span className="font-medium">Name:</span>{" "}
                                                    {order.deliveryPartnerId.fullName?.firstName} {order.deliveryPartnerId.fullName?.lastName}
                                                </p>
                                                <p className="text-sm sm:text-base text-[#F8F9FB]">
                                                    <span className="font-medium">Contact:</span> {order.deliveryPartnerId.contact}
                                                </p>
                                                <p className="text-sm sm:text-base text-[#F8F9FB]">
                                                    <span className="font-medium">Vehicle:</span>{" "}
                                                    {order.deliveryPartnerId.vehicle?.color} - {order.deliveryPartnerId.vehicle?.plate}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-sm sm:text-base text-[#F8F9FB] font-semibold">Order Details</h3>
                                    <div className="bg-[#29374C] p-3 sm:p-4 rounded-lg">
                                        <p className="text-sm sm:text-base text-[#F8F9FB] mb-2">
                                            <span className="font-medium">Total Amount:</span> ₹{order.totalAmount}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
                                            {order.documents.map((doc, index) => (
                                                <div key={index} className="bg-[#1D2A36] p-3 sm:p-4 rounded-lg">
                                                    <p className="text-sm text-[#F8F9FB]">
                                                        <span className="font-medium">Document:</span> {doc.name}
                                                    </p>
                                                    <p className="text-sm text-[#F8F9FB]">
                                                        <span className="font-medium">Copies:</span> {doc.copies}
                                                    </p>
                                                    <p className="text-sm text-[#F8F9FB]">
                                                        <span className="font-medium">Size:</span> {doc.size}
                                                    </p>
                                                    <p className="text-sm text-[#F8F9FB]">
                                                        <span className="font-medium">Color:</span> {doc.color}
                                                    </p>
                                                    {doc.folderType !== "None" && (
                                                        <p className="text-sm text-[#F8F9FB]">
                                                            <span className="font-medium">Folder:</span> {doc.folderType}
                                                        </p>
                                                    )}
                                                    {doc.binding !== "None" && (
                                                        <p className="text-sm text-[#F8F9FB]">
                                                            <span className="font-medium">Binding:</span> {doc.binding}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreOrdersPage;
