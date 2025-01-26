import React from 'react';
import { useSelector } from 'react-redux';

function DriverDetails() {
  const captain = useSelector((state) => state.captain.captain);

  return (
    <div className="bg-[#1D2A36] rounded-xl border border-[#29374C] p-2 sm:p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border-2 border-[#F4C753]" 
               src={captain.image} 
               alt="" />
          <div>
            <h4 className="text-[#F8F9FB] text-xs sm:text-sm font-bold capitalize">
              {`${captain.fullName.firstName} ${captain.fullName.lastName}`}
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-400">Active Captain</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-3">
        <div className="text-center p-2 rounded-lg bg-[#29374C]">
          <i className="text-lg mb-1 text-[#F4C753] ri-timer-2-line"></i>
          <h5 className="text-[#F8F9FB] text-sm font-bold">{captain.orders.length}</h5>
          <p className="text-xs text-gray-400">Orders</p>
        </div>
        
        <div className="text-center p-2 rounded-lg bg-[#29374C]">
          <i className="text-lg mb-1 text-[#F4C753] ri-phone-line"></i>
          <h5 className="text-[#F8F9FB] text-sm font-bold">{captain.contact}</h5>
          <p className="text-xs text-gray-400">Contact</p>
        </div>
        
        <div className="text-center p-2 rounded-lg bg-[#29374C]">
          <i className="text-lg mb-1 text-[#F4C753] ri-car-line"></i>
          <h5 className="text-[#F8F9FB] text-sm font-bold">{captain.vehicle.plate}</h5>
          <p className="text-xs text-gray-400">Vehicle</p>
        </div>
      </div>
    </div>
  );
}

export default DriverDetails;
