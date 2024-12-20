import React from 'react';
import AcceptedMap from '../../components/usercomponents/AcceptedMap';
import AcceptedStatus from '../../components/usercomponents/AcceptedStatus';
import { useSelector } from 'react-redux';

const AcceptedPage = () => {
  const acceptedOrderData = useSelector((state) => state.user.acceptedOrderData);

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
