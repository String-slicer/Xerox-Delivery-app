import React from 'react';
import axios from 'axios';

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
  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full h-full max-w-4xl flex flex-col justify-between">
        <div>
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Order Accepted</h2>
            <p className="text-sm text-gray-500">Order ID: {orderData._id}</p>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Amount:</p>
              <p className="text-gray-800">${orderData.totalAmount}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Status:</p>
              <p className="text-gray-800">{orderData.status}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-2">Store Details:</h3>
              <p className="text-sm font-medium text-gray-500">Store Name:</p>
              <p className="text-gray-800">{orderData.storeId.StoreName}</p>
              <p className="text-sm font-medium text-gray-500">Store Contact:</p>
              <p className="text-gray-800">{orderData.storeId.contact}</p>
              <p className="text-sm font-medium text-gray-500">Store Address:</p>
              <p className="text-gray-800">{orderData.storeId.address}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-2">Delivery Partner Details:</h3>
              <p className="text-sm font-medium text-gray-500">Captain Name:</p>
              <p className="text-gray-800">{orderData.deliveryPartnerId.fullName.firstName} {orderData.deliveryPartnerId.fullName.lastName}</p>
              <p className="text-sm font-medium text-gray-500">Captain Contact:</p>
              <p className="text-gray-800">{orderData.deliveryPartnerId.contact}</p>
              <p className="text-sm font-medium text-gray-500">Vehicle:</p>
              <p className="text-gray-800">{orderData.deliveryPartnerId.vehicle.color} - {orderData.deliveryPartnerId.vehicle.plate}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg text-center bg-green-100 text-green-600">
          <p className="font-bold text-lg">Order Accepted</p>
          <button
            onClick={() => handlePayment(orderData)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptedStatus;
