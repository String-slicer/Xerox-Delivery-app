import React, { useEffect, useContext, useRef } from 'react';
import AcceptedMap from '../../components/usercomponents/AcceptedMap';
import AcceptedStatus from '../../components/usercomponents/AcceptedStatus';
import { useSelector, useDispatch } from 'react-redux';
import { updateCaptainLocation } from '../../slices/userSlice'; // Import the new action
import { SocketContext } from '../../context/socketcontext';

const AcceptedPage = () => {
  const acceptedOrderData = useSelector((state) => state.user.acceptedOrderData);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const updateTimeoutRef = useRef(null);

  useEffect(() => {
    const handleLocationUpdate = (location) => {
      if (location && location.ltd && location.lng) { // Check if location data is valid
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
        updateTimeoutRef.current = setTimeout(() => {
          console.log('Captain location updated');
          dispatch(updateCaptainLocation(location));
        }, 1000); // Update location at most once per second
      } else {
        console.error('Invalid location data:', location);
      }
    };

    socket.on('captainLocationUpdate', handleLocationUpdate);

    return () => {
      socket.off('captainLocationUpdate', handleLocationUpdate);
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [socket, dispatch]);

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-[50vh]">
        <AcceptedMap orderData={acceptedOrderData} />
      </div>
      <div className="w-full h-[50vh]">
        <AcceptedStatus orderData={acceptedOrderData} />
      </div>
    </div>
  );
};

export default AcceptedPage;
