import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import AcceptedMap from '../../components/captaincomponents/AcceptedMap';
import { SocketContext } from '../../context/socketcontext';

function OrderAcceptedPage() {
  const { socket } = useContext(SocketContext);
  const currentOrder = useSelector((state) => state.captain.currentOrder);

  const handleButtonClick = (status) => {
    console.log(`Order status: ${status}`);
    if (currentOrder) {
      socket.emit('update-order-status', { orderId: currentOrder._id, status });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/2">
        {currentOrder && <AcceptedMap orderData={currentOrder} />}
      </div>
      <div className="h-1/2 flex flex-col justify-center items-center space-y-4">
        <button 
          onClick={() => handleButtonClick('In Progress')} 
          className="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Picked Up
        </button>
        <button 
          onClick={() => handleButtonClick('Out for Delivery')} 
          className="btn bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          On The Way
        </button>
        <button 
          onClick={() => handleButtonClick('Delivered')} 
          className="btn bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Delivered
        </button>
        <button 
          onClick={() => handleButtonClick('Cancelled')} 
          className="btn bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default OrderAcceptedPage;
