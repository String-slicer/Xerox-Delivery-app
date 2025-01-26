import React, { useEffect, useContext, useRef } from 'react';
import AcceptedMap from '../../components/usercomponents/AcceptedMap';
import AcceptedStatus from '../../components/usercomponents/AcceptedStatus';
import Navbar from '../../components/usercomponents/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { updateCaptainLocation, setAcceptedOrderData, updateOrderStatus } from '../../slices/userSlice';
import { SocketContext } from '../../context/socketcontext';

const AcceptedPage = () => {
  const acceptedOrderData = useSelector((state) => state.user.acceptedOrderData);
  const socketContext = useContext(SocketContext);
  const socket = socketContext ? socketContext.socket : null;
  const dispatch = useDispatch();
  const updateTimeoutRef = useRef(null);
  const user=useSelector((state)=>state.user.user);
  useEffect(() => {
    socket.emit('join', {
      userId: user._id,
      userType: 'user'
    });
    if (!socket) {
      console.error('Socket is not available');
      return;
    }

    const handleLocationUpdate = (location) => {
      if (location && location.ltd && location.lng) { // Check if location data is valid
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
        updateTimeoutRef.current = setTimeout(() => {
          console.log('Captain location updated');
          dispatch(updateCaptainLocation(location));
        }, 5000); // Update location at most once per second
      } else {
        console.error('Invalid location data:', location);
      }
    };

    // const handleOrderStatusUpdate = (data) => {
    //   console.log('Order status updated:', data);
    //   dispatch(updateOrderStatus(data));
    //   if (acceptedOrderData) {
    //     console.log(acceptedOrderData);
    //   } else {
    //     console.error('Accepted order data is null or undefined');
    //   }
    // };

    socket.on('captainLocationUpdate', handleLocationUpdate);
    // socket.on('orderStatusUpdate', handleOrderStatusUpdate);

    return () => {
      socket.off('captainLocationUpdate', handleLocationUpdate);
      // socket.off('orderStatusUpdate', handleOrderStatusUpdate);
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [socket, dispatch, acceptedOrderData]);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#131C24] dark group/design-root overflow-x-hidden font-sans">
      <Navbar />
      <div className="layout-container flex h-full grow flex-col pt-16"> {/* Added pt-16 to account for navbar height */}
   

        <div className="flex-1 px-4 py-6">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-6 rounded-xl border border-[#29374C] bg-[#1D2A36] p-4">
              <h1 className="text-[#F8F9FB] text-2xl font-bold mb-2">Order Tracking</h1>
              <p className="text-[#F8F9FB] opacity-80">Track your order in real-time</p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-xl border border-[#29374C] bg-[#1D2A36] overflow-hidden">
                <div className="h-[50vh] w-full">
                  {acceptedOrderData && <AcceptedMap orderData={acceptedOrderData} />}
                </div>
              </div>

              <div className="rounded-xl border border-[#29374C] bg-[#1D2A36]">
                <div className="h-full w-full">
                  {acceptedOrderData && <AcceptedStatus orderData={acceptedOrderData} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptedPage;
