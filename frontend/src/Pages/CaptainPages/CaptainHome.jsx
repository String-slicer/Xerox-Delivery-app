import React, { useContext, useEffect, useRef, useState } from 'react'
import Map from '../../components/captaincomponents/Map'
import Navbar from '../../components/captaincomponents/Navbar'
import DriverDetails from '../../components/captaincomponents/DriverDetails'
import OrderPopUp from '../../components/captaincomponents/OrderPopUp'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import { SocketContext } from '../../context/socketcontext';
import { useSelector } from 'react-redux';

function CaptainHome() {
  const [OrderPopup, setOrderPopup] = useState(false);
  const OrderPopUpref=useRef(null);
  const { socket } = useContext(SocketContext);
  const captain = useSelector((state) => state.captain.captain);
  const [currentOrder, setCurrentOrder] = useState(null);

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
   

    const locationInterval = setInterval(updateLocation, 10000);
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
    }
  };

  return (
    <div>
        <Navbar />
      <div className='flex flex-col w-full h-screen'>
        <div className='map h-[70vh] w-[100%]'>
          <Map />
        </div>
        <div className=' h-[30vh]'>
          <DriverDetails />
        </div>

      </div>
      {/* order popup  */}
      <div className='fixed w-full  bottom-0 translate-y-full bg-white px-3 py-10 pt-12 z-[7000]' ref={OrderPopUpref}>
        {OrderPopup && <OrderPopUp setOrderPopupPanel={setOrderPopup} order={currentOrder} confirmOrder={confirmOrder} />}
      </div>

    </div>
  )
}

export default CaptainHome

