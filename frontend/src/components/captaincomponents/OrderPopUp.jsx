import React from 'react'

const OrderPopUp = (props) => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h5 className='p-1 text-center w-full absolute top-0' onClick={() => {
        props.setOrderPopupPanel(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5 text-center'>New Order Available!</h3>
      <div className='flex items-center justify-between p-3 bg-blue-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 rounded-full object-cover w-12' src={props.order?.storeId?.image || "https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"} alt="Store" />
          <h2 className='text-lg font-medium'>{props.order?.storeId?.StoreName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>10 KM</h5>
      </div>
      <div className='flex flex-col gap-4 mt-5'>
        <div className='w-full p-3 border-b-2'>
          <h4 className='text-lg font-semibold'>Pickup Point</h4>
          <div className='flex items-center gap-3 mt-2'>
            <i className="ri-map-pin-user-fill text-xl"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.order?.storeId?.address}</h3>
              <p className='text-sm text-gray-600'>{props.order?.storeId?.contact}</p>
              <img className='h-12 rounded-full object-cover w-12 mt-2' src={props.order?.storeId?.image} alt="Store" />
            </div>
          </div>
        </div>
        <div className='w-full p-3 border-b-2'>
          <h4 className='text-lg font-semibold'>Delivery Point</h4>
          <div className='flex items-center gap-3 mt-2'>
            <i className="ri-map-pin-2-fill text-xl"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.order?.userId?.fullName?.firstName + " " + props.order?.userId?.fullName?.lastName}</h3>
              <p className='text-sm text-gray-600'>{props.order?.userId?.contact}</p>
              <img className='h-12 rounded-full object-cover w-12 mt-2' src={props.order?.userId?.image} alt="User" />
            </div>
          </div>
        </div>
        <div className='w-full p-3'>
          <div className='flex items-center gap-3'>
            <i className="ri-currency-line text-xl"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.order?.totalAmount}</h3>
              <p className='text-sm text-gray-600'>{props.order?.paymentStatus}</p>
            </div>
          </div>
          <div className='flex items-center gap-3 mt-3'>
            <i className="ri-information-line text-xl"></i>
            <div>
              <h3 className='text-lg font-medium'>Status: {props.order?.status}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 w-full'>
        <button onClick={() => {
          props.setOrderPopupPanel(false)
          props.confirmOrder();
        }} className='bg-green-600 w-full text-white font-semibold p-2 rounded-lg'>
          Accept
        </button>
        <button onClick={() => {
          props.setOrderPopupPanel(false);
        }} className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg'>
          Ignore
        </button>
      </div>
    </div>
  )
}

export default OrderPopUp
