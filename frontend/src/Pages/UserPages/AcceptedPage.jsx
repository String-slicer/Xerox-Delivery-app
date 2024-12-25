import React, { useEffect, useContext, useRef } from 'react';
import AcceptedMap from '../../components/usercomponents/AcceptedMap';
import AcceptedStatus from '../../components/usercomponents/AcceptedStatus';
import { useSelector, useDispatch } from 'react-redux';
import { updateCaptainLocation, setAcceptedOrderData, updateOrderStatus } from '../../slices/userSlice'; // Import the new action
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
    <div className="relative w-full h-full">
      <div className="w-full h-[50vh]">
        {acceptedOrderData && <AcceptedMap orderData={acceptedOrderData} />}
      </div>
      <div className="w-full h-[50vh]">
        {acceptedOrderData && <AcceptedStatus orderData={acceptedOrderData} />}
      </div>
    </div>
  );
};

export default AcceptedPage;
