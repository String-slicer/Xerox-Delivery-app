import React, { useRef, useState } from 'react'
import Map from '../../components/captaincomponents/Map'
import Navbar from '../../components/captaincomponents/Navbar'
import DriverDetails from '../../components/captaincomponents/DriverDetails'
import OrderPopUp from '../../components/captaincomponents/OrderPopUp'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';

function CaptainHome() {
  const [OrderPopup, setOrderPopup] = useState(true);
  const OrderPopUpref=useRef(null);
  useGSAP(() => {
    if (OrderPopup) {
      gsap.to(OrderPopUpref.current, {transform:"translate(0%)" });
    } else {
      gsap.to(OrderPopUpref.current, { transform:"translate(100%)" });
    }
  }, [OrderPopup]);
  

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
        {OrderPopup && <OrderPopUp setOrderPopupPanel={setOrderPopup} />}
      </div>

    </div>
  )
}

export default CaptainHome

