import React from 'react'

const OrderPopUp = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setOrderPopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Order Available!</h3>
            <div className='flex items-center justify-between p-3 bg-blue-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src={props.order?.customer?.profilePic || "https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"} alt="" />
                    <h2 className='text-lg font-medium'>{props.order?.customer?.fullname?.firstname + " " + props.order?.customer?.fullname?.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{props.order?.distance} KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.order?.pickup?.address}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.order?.pickup?.details}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.order?.delivery?.address}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.order?.delivery?.details}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.order?.payment?.amount} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.order?.payment?.method}</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 w-full '>
                    <button onClick={() => {
                        props.setConfirmOrderPopupPanel(true)
                        props.confirmOrder()
                    }} className='bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>
                        Accept
                    </button>

                    <button onClick={() => {
                        props.setOrderPopupPanel(false)
                    }} className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderPopUp