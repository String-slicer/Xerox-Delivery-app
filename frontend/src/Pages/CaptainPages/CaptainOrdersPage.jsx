import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/captaincomponents/Navbar";

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
                console.log(data)
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

    if (loading) return (
        <div className="min-h-screen bg-[#131C24]">
            <Navbar />
            <div className="flex items-center justify-center h-[calc(100vh-64px)] mt-16">
                <p className="text-lg font-semibold text-[#F8F9FB]">Loading orders...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#131C24]">
            <Navbar />
            <div className="flex items-center justify-center h-[calc(100vh-64px)] mt-16">
                <p className="text-lg font-semibold text-red-400">Error: {error}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#131C24]">
            <Navbar />
            <div className="container mx-auto px-4 py-8 mt-16">
                <h1 className="text-3xl font-bold text-center text-[#F8F9FB] mb-8">Your Orders</h1>
                <div className="space-y-4 max-w-4xl mx-auto">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-[#1D2A36] border border-[#29374C] rounded-lg p-4 hover:border-[#F4C753] transition-colors duration-300 cursor-pointer"
                            onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-semibold text-[#F8F9FB]">
                                        Order #{order._id.slice(-6)}
                                    </h2>
                                    <p className="text-[#8B9EB7]">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                                        order.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-[#29374C] text-[#F4C753]'
                                    }`}>
                                        {order.status}
                                    </span>
                                    <button
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            selectedOrder?._id === order._id
                                                ? "bg-[#F4C753] text-[#141C24]"
                                                : "bg-[#29374C] text-[#F8F9FB] hover:bg-[#32415D]"
                                        }`}
                                    >
                                        {selectedOrder?._id === order._id ? "Hide Details" : "View Details"}
                                    </button>
                                </div>
                            </div>

                            {selectedOrder?._id === order._id && (
                                <div className="mt-4 border-t border-[#29374C] pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="bg-[#29374C] p-4 rounded-lg">
                                                <h3 className="text-[#F8F9FB] font-semibold mb-2">Customer Details</h3>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img 
                                                        src={order.userId.image} 
                                                        alt={order.userId.fullName.firstName}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                    <div>
                                                        <p className="text-[#F8F9FB]">
                                                            {order.userId.fullName.firstName} {order.userId.fullName.lastName}
                                                        </p>
                                                        <p className="text-[#8B9EB7] text-sm">{order.userId.contact}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-[#29374C] p-4 rounded-lg">
                                                <h3 className="text-[#F8F9FB] font-semibold mb-2">Store Details</h3>
                                                <p className="text-[#F8F9FB]">{order.storeId.StoreName}</p>
                                                <p className="text-[#8B9EB7]">{order.storeId.address}</p>
                                                <p className="text-[#8B9EB7]">{order.storeId.contact}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-[#29374C] p-4 rounded-lg">
                                                <h3 className="text-[#F8F9FB] font-semibold mb-2">Order Details</h3>
                                                <p className="text-[#8B9EB7] mb-1">
                                                    <span className="text-[#F8F9FB]">Amount:</span> ₹{order.totalAmount}
                                                </p>
                                                <p className="text-[#8B9EB7] mb-1">
                                                    <span className="text-[#F8F9FB]">Payment:</span> {order.paymentStatus}
                                                </p>
                                                {order.deliveryAddress && (
                                                    <p className="text-[#8B9EB7] mb-1">
                                                        <span className="text-[#F8F9FB]">Delivery to:</span> {order.deliveryAddress}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="bg-[#29374C] p-4 rounded-lg">
                                                <h3 className="text-[#F8F9FB] font-semibold mb-3">Documents</h3>
                                                <div className="space-y-3">
                                                    {order.documents.map((doc, index) => (
                                                        <div key={index} className="p-3 bg-[#1D2A36] rounded-lg">
                                                            <p className="text-[#F8F9FB] font-medium mb-1">{doc.name}</p>
                                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                                <p className="text-[#8B9EB7]">
                                                                    <span className="text-[#F8F9FB]">Copies:</span> {doc.copies}
                                                                </p>
                                                                <p className="text-[#8B9EB7]">
                                                                    <span className="text-[#F8F9FB]">Size:</span> {doc.size}
                                                                </p>
                                                                <p className="text-[#8B9EB7]">
                                                                    <span className="text-[#F8F9FB]">Color:</span> {doc.color}
                                                                </p>
                                                                {doc.binding !== "None" && (
                                                                    <p className="text-[#8B9EB7]">
                                                                        <span className="text-[#F8F9FB]">Binding:</span> {doc.binding}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CaptainOrdersPage;
