import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Add this import
import AcceptedMap from '../../components/captaincomponents/AcceptedMap';
import { SocketContext } from '../../context/socketcontext';
import toast from 'react-hot-toast';

function OrderAcceptedPage() {
  const { socket } = useContext(SocketContext);
  const currentOrder = useSelector((state) => state.captain.currentOrder);
  const navigate = useNavigate(); // Add navigation hook

  const handleButtonClick = (status) => {
    if (currentOrder) {
      socket.emit('update-order-status', { orderId: currentOrder._id, status });
      toast.success(`Order status updated to ${status}`, {
        style: {
          background: '#1D2A36',
          color: '#F8F9FB'
        }
      });
      
      // Navigate to captain home page if order is completed or cancelled
      if (status === 'Delivered' || status === 'Cancelled') {
        setTimeout(() => {
          navigate('/captainHome');
        }, 1000); // Small delay to ensure the toast message is visible
      }
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#131C24] dark group/design-root overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex-1 px-4 py-6">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-6 rounded-xl border border-[#29374C] bg-[#1D2A36] p-4">
              <h1 className="text-[#F8F9FB] text-2xl font-bold mb-2">Active Delivery</h1>
              <p className="text-[#F8F9FB] opacity-80">Manage your current delivery and update order status</p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-xl border border-[#29374C] bg-[#1D2A36] overflow-hidden">
                <div className="h-[50vh] w-full">
                  {currentOrder && <AcceptedMap orderData={currentOrder} />}
                </div>
              </div>

              <div className="rounded-xl border border-[#29374C] bg-[#1D2A36] p-6">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleButtonClick('In Progress')} 
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#F4C753] px-4 py-3 text-[#141C24] font-bold hover:opacity-90 transition-opacity"
                  >
                    <span>📦 Picked Up</span>
                  </button>
                  <button 
                    onClick={() => handleButtonClick('Out for Delivery')} 
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#29374C] px-4 py-3 text-[#F8F9FB] font-bold hover:opacity-90 transition-opacity"
                  >
                    <span>🚚 On The Way</span>
                  </button>
                  <button 
                    onClick={() => handleButtonClick('Delivered')} 
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#4CAF50] px-4 py-3 text-white font-bold hover:opacity-90 transition-opacity"
                  >
                    <span>✅ Delivered</span>
                  </button>
                  <button 
                    onClick={() => handleButtonClick('Cancelled')} 
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#FF4B4B] px-4 py-3 text-white font-bold hover:opacity-90 transition-opacity"
                  >
                    <span>❌ Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderAcceptedPage;
