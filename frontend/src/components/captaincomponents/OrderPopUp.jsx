import React from 'react'

const OrderPopUp = (props) => {
  return (
    <div className="p-6 bg-[#1D2A36] rounded-lg shadow-xl">
      <div className="flex justify-center mb-6">
        <button 
          onClick={() => props.setOrderPopupPanel(false)}
          className="hover:bg-[#29374C] p-2 rounded-full transition-colors"
        >
          <i className="text-2xl text-gray-400 ri-arrow-down-wide-line"></i>
        </button>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#F8F9FB]">New Order Request</h3>
        <p className="text-gray-400 text-sm mt-1">Please review the order details below</p>
      </div>

      <div className="bg-[#29374C] rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              className="h-14 w-14 rounded-lg object-cover border-2 border-[#3B4B61]" 
              src={props.order?.storeId?.image || "https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"} 
              alt="Store" 
            />
            <div>
              <h2 className="text-lg font-semibold text-white">{props.order?.storeId?.StoreName}</h2>
              <span className="text-gray-400 text-sm">Store ID: #{props.order?.storeId?._id?.slice(-6)}</span>
            </div>
          </div>
          <div className="text-right">
            <h5 className="text-xl font-bold text-[#F8F9FB]">10 KM</h5>
            <span className="text-gray-400 text-sm">Distance</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Pickup Point */}
        <div className="p-4 bg-[#29374C] rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#3B4B61] rounded-full">
              <i className="ri-map-pin-user-fill text-xl text-blue-400"></i>
            </div>
            <h4 className="text-lg font-semibold text-[#F8F9FB]">Pickup Point</h4>
          </div>
          <div className="ml-11">
            <h3 className="text-white font-medium">{props.order?.storeId?.address}</h3>
            <p className="text-gray-400 text-sm mt-1">{props.order?.storeId?.contact}</p>
          </div>
        </div>

        {/* Delivery Point */}
        <div className="p-4 bg-[#29374C] rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#3B4B61] rounded-full">
              <i className="ri-map-pin-2-fill text-xl text-green-400"></i>
            </div>
            <h4 className="text-lg font-semibold text-[#F8F9FB]">Delivery Point</h4>
          </div>
          <div className="ml-11">
            <h3 className="text-white font-medium">
              {props.order?.userId?.fullName?.firstName + " " + props.order?.userId?.fullName?.lastName}
            </h3>
            <p className="text-gray-400 text-sm mt-1">{props.order?.userId?.contact}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-4 bg-[#29374C] rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#3B4B61] rounded-full">
                <i className="ri-currency-line text-xl text-yellow-400"></i>
              </div>
              <h4 className="text-lg font-semibold text-[#F8F9FB]">Amount</h4>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold text-white">₹{props.order?.totalAmount}</h3>
              <p className="text-gray-400 text-sm">{props.order?.paymentStatus}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <button 
          onClick={() => {
            props.setOrderPopupPanel(false);
            props.confirmOrder();
          }} 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Accept Order
        </button>
        <button 
          onClick={() => props.setOrderPopupPanel(false)} 
          className="bg-[#29374C] hover:bg-[#3B4B61] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  )
}

export default OrderPopUp
