import React from 'react'
import Map from '../../components/captaincomponents/Map'

function CaptainHome() {
  return (
    <div>
  
   <div className='flex flex-col w-full h-screen '>
    <div className='map h-[50%] w-[100%]'>
        <Map></Map>
    </div>
    <div className=' bg-red-500 h-[50%]'>

    </div>
   </div>
    </div>
  )
}

export default CaptainHome
