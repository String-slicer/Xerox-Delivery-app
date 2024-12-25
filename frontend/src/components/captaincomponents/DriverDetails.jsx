import React from 'react';
import { useSelector } from 'react-redux';

function DriverDetails() {
  const captain = useSelector((state) => state.captain.captain);

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img className='h-10 w-10 rounded-full object-cover' src={captain.image} alt="" />
          <h4 className='text-lg font-medium capitalize'>{`${captain.fullName.firstName} ${captain.fullName.lastName}`}</h4>
        </div>

      </div>
      <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className='text-lg font-medium'>{captain.orders.length}</h5>
          <p className='text-sm text-gray-600'>Orders Served</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-phone-line"></i>
          <h5 className='text-lg font-medium'>{captain.contact}</h5>
          <p className='text-sm text-gray-600'>Contact</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-car-line"></i>
          <h5 className='text-lg font-medium'>{captain.vehicle.plate}</h5>
          <p className='text-sm text-gray-600'>Vehicle Plate</p>
        </div>
      </div>
    </div>
  );
}

export default DriverDetails;
