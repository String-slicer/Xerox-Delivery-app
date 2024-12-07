import React from 'react'
import Map from '../../components/captaincomponents/Map'
import Navbar from '../../components/captaincomponents/Navbar'
import DriverDetails from '../../components/captaincomponents/DriverDetails'

function CaptainHome() {
  
  return (
    <div>
      <div className='flex flex-col w-full h-screen'>
        <div className='map h-[70%] w-[100%]'>
          <Map />
        </div>
        <div className=' h-[30vh]'>
          <DriverDetails />
        </div>
        <Navbar />
      </div>
    </div>
  )
}

export default CaptainHome

