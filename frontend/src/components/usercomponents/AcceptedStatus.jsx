import React from 'react';

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
        </div>
      </div>
    </div>
  );
};

export default AcceptedStatus;
