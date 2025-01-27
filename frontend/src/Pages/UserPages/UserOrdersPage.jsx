import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaBox, FaMapMarkerAlt, FaClock, FaFileAlt, FaMoneyBillWave } from "react-icons/fa";
import Navbar from "../../components/usercomponents/Navbar"; // Add this import

const UserOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:4000/User/userOrders/${user._id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const sortedOrders = data.sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt));
                setOrders(sortedOrders);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user._id]);

    const getStatusColor = (status) => {
        const statusColors = {
            'pending': 'bg-yellow-500',
            'processing': 'bg-blue-500',
            'delivered': 'bg-green-500',
            'cancelled': 'bg-red-500'
        };
        return statusColors[status.toLowerCase()] || 'bg-gray-500';
    };

    if (loading)
        return (
            <>
                <Navbar />
                <div className="flex items-center justify-center h-screen bg-[#131C24]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#F4C753]"></div>
                </div>
            </>
        );

    if (error)
        return (
            <>
                <Navbar />
                <div className="flex items-center justify-center h-screen bg-[#131C24]">
                    <div className="bg-[#1D2A36] p-6 rounded-lg border border-[#32415D]">
                        <p className="text-lg font-semibold text-red-500">{error}</p>
                    </div>
                </div>
            </>
        );

    return (
        <>
            <Navbar />
            <div className="bg-[#131C24] min-h-screen p-8 pt-24"> {/* Added pt-24 for navbar space */}
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-[#F8F9FB] mb-8">Your Orders</h1>
                    {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 bg-[#1D2A36] rounded-lg border border-[#32415D]">
                            <FaBox className="text-[#F4C753] text-4xl mb-4" />
                            <p className="text-[#F8F9FB] text-lg font-medium">No orders found</p>
                            <p className="text-[#A0AEC0] text-sm mt-2">Your order history will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-[#1D2A36] rounded-lg border border-[#32415D] overflow-hidden transition-all duration-300 hover:border-[#F4C753]"
                                >
                                    <div 
                                        className="p-6 cursor-pointer"
                                        onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3">
                                                    <FaBox className="text-[#F4C753]" />
                                                    <h2 className="text-lg font-semibold text-[#F8F9FB]">
                                                        Order #{order._id.slice(-8)}
                                                    </h2>
                                                </div>
                                                <div className="flex items-center space-x-2 text-[#A0AEC0]">
                                                    <FaClock className="text-sm" />
                                                    <span className="text-sm">
                                                        {new Date(order.orderedAt).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} text-white`}>
                                                    {order.status}
                                                </span>
                                                <span className="text-[#F4C753] text-sm font-medium">
                                                    {selectedOrder?._id === order._id ? "Hide Details" : "View Details"}
                                                </span>
                                            </div>
                                        </div>

                                        {selectedOrder?._id === order._id && (
                                            <div className="mt-6 pt-6 border-t border-[#32415D]">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center space-x-3">
                                                            <FaMoneyBillWave className="text-[#F4C753]" />
                                                            <div>
                                                                <p className="text-[#A0AEC0] text-sm">Total Amount</p>
                                                                <p className="text-[#F8F9FB] font-medium">₹{order.totalAmount || "N/A"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            <FaMapMarkerAlt className="text-[#F4C753]" />
                                                            <div>
                                                                <p className="text-[#A0AEC0] text-sm">Delivery Address</p>
                                                                <p className="text-[#F8F9FB] font-medium">{order.deliveryAddress || "N/A"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center space-x-3 mb-4">
                                                            <FaFileAlt className="text-[#F4C753]" />
                                                            <h3 className="text-[#F8F9FB] font-medium">Documents</h3>
                                                        </div>
                                                        <div className="space-y-4">
                                                            {order.documents.map((doc, index) => (
                                                                <div 
                                                                    key={index}
                                                                    className="bg-[#29374C] p-4 rounded-lg"
                                                                >
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                            <p className="text-[#A0AEC0] text-sm">Name</p>
                                                                            <p className="text-[#F8F9FB]">{doc.name}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[#A0AEC0] text-sm">Copies</p>
                                                                            <p className="text-[#F8F9FB]">{doc.copies}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[#A0AEC0] text-sm">Size</p>
                                                                            <p className="text-[#F8F9FB]">{doc.size}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[#A0AEC0] text-sm">Color</p>
                                                                            <p className="text-[#F8F9FB]">{doc.color ? "Color" : "Black & White"}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserOrdersPage;
