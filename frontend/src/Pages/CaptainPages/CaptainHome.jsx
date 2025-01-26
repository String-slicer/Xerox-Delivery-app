import React, { useContext, useEffect, useRef, useState } from 'react'
import Map from '../../components/captaincomponents/Map'
import Navbar from '../../components/captaincomponents/Navbar'
import DriverDetails from '../../components/captaincomponents/DriverDetails'
import OrderPopUp from '../../components/captaincomponents/OrderPopUp'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import { SocketContext } from '../../context/socketcontext';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateCurrentOrder } from '../../slices/captainSlice';

function CaptainHome() {
  const [OrderPopup, setOrderPopup] = useState(false);
  const OrderPopUpref=useRef(null);
  const { socket } = useContext(SocketContext);
  const captain = useSelector((state) => state.captain.captain);
  const [currentOrder, setCurrentOrder] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGSAP(() => {
    if (OrderPopup) {
      gsap.to(OrderPopUpref.current, {transform:"translate(0%)" });
    } else {
      gsap.to(OrderPopUpref.current, { transform:"translate(100%)" });
    }
  }, [OrderPopup]);

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    };
   

    const locationInterval = setInterval(updateLocation, 150000);
    updateLocation();

    socket.on('newOrder', (payload) => {
      console.log(payload);
      setCurrentOrder(payload.orderdetailswithstore);
      setOrderPopup(true);
    });

    return () => {
      clearInterval(locationInterval);
      socket.off('newOrder');
    };
  }, [socket, captain._id]);

  const confirmOrder = () => {
    if (currentOrder) {
      console.log("currentOrder", currentOrder);
      socket.emit('order-accepted-captain', {
        orderId: currentOrder._id,
        captainId: captain._id
      });
      dispatch(updateCurrentOrder(currentOrder));
      navigate('/accepted-order-page');
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#131C24]">
      <Navbar />
      <div className="h-[calc(100vh-64px)] mt-14 sm:mt-16 flex flex-col">
        <div className="flex-1 px-2 sm:px-6 lg:px-10 pb-2 sm:pb-4">
          <div className="h-full rounded-xl overflow-hidden border border-[#29374C]">
            <Map />
          </div>
        </div>
        <div className="h-auto px-2 sm:px-6 lg:px-10 pb-2 sm:pb-4">
          <DriverDetails />
        </div>
      </div>

      {/* Order popup */}
      <div ref={OrderPopUpref} 
           className="fixed w-full sm:w-[400px] sm:right-4 bottom-0 translate-y-full bg-[#1D2A36] border border-[#29374C] rounded-t-2xl px-2 sm:px-3 py-4 sm:py-6 z-[7000]">
        {OrderPopup && <OrderPopUp setOrderPopupPanel={setOrderPopup} order={currentOrder} confirmOrder={confirmOrder} />}
      </div>
    </div>
  );
}

export default CaptainHome;

