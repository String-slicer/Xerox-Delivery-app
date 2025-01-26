import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handlePayment = async (orderData) => {
  const res = await loadRazorpayScript();

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  // Create order on the backend
  const result = await axios.post('http://localhost:4000/payments/capturePayments', {
    orderId: orderData._id,
  });

  if (!result.data.success) {
    alert('Server error. Are you online?');
    return;
  }

  const { amount, id: order_id, currency, notes } = result.data.razorpayOrder;

  const options = {
    key: 'rzp_test_XBHfdlQo3xQoMk', // Replace with your Razorpay key
    amount: amount,
    currency: currency,
    name: 'Printify',
    description: 'Test Transaction',
    order_id: order_id,
    handler: async function (response) {
      const data = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        notes: notes,
      };

      const result = await axios.post('http://localhost:4000/payments/verifyPayment', data);

      // if (result.data.success) {
      //   alert('Payment successful');
      // } else {
      //   alert('Payment verification failed');
      //   console.log(result.data.message);
      // }
    },
    prefill: {
      name: orderData.userName,
      email: orderData.userEmail,
      contact: orderData.userContact,
    },
    notes: {
      orderId: orderData._id,
    },
    theme: {
      color: '#3399cc',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

const AcceptedStatus = ({ orderData }) => {
  const navigate = useNavigate();

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  if (!orderData) {
    return <div className="text-[#F8F9FB]">Loading...</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-6">
      <div className="w-full max-w-4xl flex flex-col justify-between">
        <div>
          <div className="border-b border-[#29374C] pb-4 mb-4">
            <h2 className="text-2xl font-bold text-[#F8F9FB]">Order Accepted</h2>
            <p className="text-sm text-[#F8F9FB] opacity-60">Order ID: {orderData._id}</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#29374C] p-4">
                <p className="text-sm font-medium text-[#F8F9FB] opacity-60">Total Amount</p>
                <p className="text-[#F8F9FB] text-xl font-bold">₹{orderData.totalAmount}</p>
              </div>
              <div className="rounded-lg border border-[#29374C] p-4">
                <p className="text-sm font-medium text-[#F8F9FB] opacity-60">Status</p>
                <p className="text-[#F4C753] text-xl font-bold">{orderData.status}</p>
              </div>
            </div>

            <div className="rounded-lg border border-[#29374C] p-4">
              <h3 className="text-lg font-semibold text-[#F8F9FB] mb-3">Store Details</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-[#F8F9FB] opacity-60">Store Name</p>
                  <p className="text-[#F8F9FB]">{orderData.storeId.StoreName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F8F9FB] opacity-60">Contact</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-[#F8F9FB]">{orderData.storeId.contact}</span>
                    <button
                      onClick={() => handleCall(orderData.storeId.contact)}
                      className="flex items-center justify-center bg-[#F4C753] hover:bg-[#f5d16e] text-[#141C24] px-3 py-1 rounded-lg transition-colors"
                    >
                      <FaPhone className="mr-2" />
                      <span>Call Store</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F8F9FB] opacity-60">Address</p>
                  <p className="text-[#F8F9FB]">{orderData.storeId.address}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[#29374C] p-4">
              <h3 className="text-lg font-semibold text-[#F8F9FB] mb-3">Delivery Partner</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-[#F8F9FB] opacity-60">Captain Name</p>
                  <p className="text-[#F8F9FB]">{orderData.deliveryPartnerId.fullName.firstName} {orderData.deliveryPartnerId.fullName.lastName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F8F9FB] opacity-60">Contact</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-[#F8F9FB]">{orderData.deliveryPartnerId.contact}</span>
                    <button
                      onClick={() => handleCall(orderData.deliveryPartnerId.contact)}
                      className="flex items-center justify-center bg-[#F4C753] hover:bg-[#f5d16e] text-[#141C24] px-3 py-1 rounded-lg transition-colors"
                    >
                      <FaPhone className="mr-2" />
                      <span>Call Captain</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F8F9FB] opacity-60">Vehicle</p>
                  <p className="text-[#F8F9FB]">{orderData.deliveryPartnerId.vehicle.color} - {orderData.deliveryPartnerId.vehicle.plate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => handlePayment(orderData)}
            className="w-full flex items-center justify-center rounded-xl h-12 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold hover:bg-[#f5d16e] transition-colors"
          >
            Make Payment
          </button>
          
          <button
            onClick={() => navigate('/userHome')}
            className="w-full flex items-center justify-center rounded-xl h-12 px-4 bg-[#29374C] text-[#F8F9FB] text-sm font-bold hover:bg-[#32415D] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptedStatus;
