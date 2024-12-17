import React from 'react';

const AcceptedStatus = () => {
  // Dummy data for testing
  const order = {
    orderId: '12345',
    customerName: 'John Doe',
    items: ['Product 1', 'Product 2', 'Product 3'],
    totalPrice: 299.99,
    orderDate: '2024-12-14',
    status: 'Accepted',
  };

  const { orderId, customerName, items, totalPrice, orderDate } = order;

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full h-full max-w-4xl flex flex-col justify-between">
        <div>
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Order Accepted</h2>
            <p className="text-sm text-gray-500">Order ID: {orderId}</p>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Customer Name:</p>
              <p className="text-gray-800">{customerName}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Items:</p>
              <ul className="list-disc list-inside text-gray-800">
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Total Price:</p>
              <p className="text-gray-800">${totalPrice.toFixed(2)}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Order Date:</p>
              <p className="text-gray-800">{new Date(orderDate).toLocaleDateString()}</p>
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
