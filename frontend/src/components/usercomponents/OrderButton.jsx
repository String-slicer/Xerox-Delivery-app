import React from 'react'

function OrderButton() {
  return (
    <div className="w-full flex justify-center items-center">
      <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-[#F4C753] text-[#141C24] text-lg font-bold hover:scale-105 transition-transform">
        <span className="truncate">Place Order</span>
      </button>
    </div>
  )
}

export default OrderButton
