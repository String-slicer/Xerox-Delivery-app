import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/storecomponents/Navbar';
import { useSelector } from 'react-redux';
import { NewOrders } from './NewOrders';
import { TrackOrders } from './TrackOrders';
import { SocketContext } from '../../context/socketcontext';
import StoreProfilePage from './StoreProfilePage'
import StoreOrdersPage from './StoreOrdersPage'
function StoreHomePage() {
  
  const [activePage, setActivePage] = useState('dashboard');
  const { socket } = useContext(SocketContext);
  const store=useSelector((state)=>state.store.store);
  useEffect(() => {
    socket.emit('join', {
        userId: store._id,
        userType: 'store'
    })
    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                socket.emit('update-location-store', {
                    userId: store._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
  }, [])

  const renderDashboard = () => (
    <div className="max-w-7xl w-full mx-auto p-2 sm:p-4 md:p-6 grid gap-4 sm:gap-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#1D2A36] border border-[#32415D] p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#A3AED0] text-sm">Total Orders</p>
              <h3 className="text-3xl font-bold text-[#F8F9FB] mt-2">245</h3>
              <p className="text-[#F4C753] text-sm mt-1">↑ 14% this month</p>
            </div>
            <span className="bg-[#29374C] p-3 rounded-lg">
              <svg className="w-6 h-6 text-[#F4C753]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"/>
              </svg>
            </span>
          </div>
        </div>

        <div className="bg-[#1D2A36] border border-[#32415D] p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#A3AED0] text-sm">Revenue</p>
              <h3 className="text-3xl font-bold text-[#F8F9FB] mt-2">₹12,426</h3>
              <p className="text-[#F4C753] text-sm mt-1">↑ 8% this week</p>
            </div>
            <span className="bg-[#29374C] p-3 rounded-lg">
              <svg className="w-6 h-6 text-[#F4C753]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
            </span>
          </div>
        </div>

        {/* Similar blocks for Pending Orders and Completed Orders */}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-[#1D2A36] border border-[#32415D] rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h3 className="text-[#F8F9FB] text-lg sm:text-xl font-semibold">Recent Orders</h3>
            <button className="text-[#F4C753] text-sm">View All</button>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="text-[#A3AED0] text-sm">
                    <th className="pb-4 text-left">Order ID</th>
                    <th className="pb-4 text-left">Customer</th>
                    <th className="pb-4 text-left">Status</th>
                    <th className="pb-4 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '123', customer: 'John Doe', status: 'Completed', amount: '₹450' },
                    { id: '124', customer: 'Jane Smith', status: 'Processing', amount: '₹850' },
                    // Add more dummy orders
                  ].map((order) => (
                    <tr key={order.id} className="border-b border-[#32415D]">
                      <td className="py-4 text-[#F8F9FB]">#{order.id}</td>
                      <td className="py-4 text-[#F8F9FB]">{order.customer}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          order.status === 'Completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-[#F8F9FB]">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-[#1D2A36] border border-[#32415D] rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-[#F8F9FB] text-xl font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { time: '2 min ago', text: 'New order received from John Doe' },
              { time: '15 min ago', text: 'Order #123 completed' },
              // Add more activities
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#F4C753]"></div>
                <div>
                  <p className="text-[#F8F9FB]">{activity.text}</p>
                  <p className="text-[#A3AED0] text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case 'newOrders':
        return <NewOrders />;
      case 'trackOrders':
        return <TrackOrders />;
      case 'profile':
        // return <StoreProfilePage />;
        return <StoreProfilePage />;
      case 'storeOrders':
        return <StoreOrdersPage/>

      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[#131C24]">
      <Navbar setActivePage={setActivePage} />
      <div className="pt-16 sm:pt-20 px-2 sm:px-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default StoreHomePage;

