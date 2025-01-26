import React from 'react'

const WaitingToConfirm = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center p-6 space-y-4'>
      <div className="animate-spin w-12 h-12 border-4 border-[#F4C753] border-t-transparent rounded-full"></div>
      <h1 className="text-[#F8F9FB] text-2xl font-bold text-center">
        Waiting for store confirmation
      </h1>
      <p className="text-[#F8F9FB] text-base text-center opacity-80 max-w-md">
        Your order is being processed. We'll notify you as soon as the store confirms your request.
      </p>
      <div className="flex gap-2 items-center mt-4">
        <div className="w-2 h-2 bg-[#F4C753] rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-[#F4C753] rounded-full animate-pulse delay-100"></div>
        <div className="w-2 h-2 bg-[#F4C753] rounded-full animate-pulse delay-200"></div>
      </div>
    </div>
  )
}

export default WaitingToConfirm
