import React, { useState ,useContext, useEffect} from 'react';
import Navbar from '../../components/storecomponents/Navbar';
import { useSelector } from 'react-redux';
import { NewOrders } from './newOrders';
import { TrackOrders } from './TrackOrders';
import { SocketContext } from '../../context/socketcontext';

// import {useSelector} from 'react-redux';
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

  const renderContent = () => {
    switch (activePage) {
      case 'newOrders':
        return <NewOrders />;
      case 'trackOrders':
        return <TrackOrders />;
      default:
        return (
          <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6">Welcome to Your Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium">Documents in Process</h3>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium">Documents Delivered</h3>
                <p className="text-2xl font-bold text-green-600">45</p>
              </div>
              <div className="bg-red-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium">Pending Payments</h3>
                <p className="text-2xl font-bold text-red-600">$150</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <Navbar setActivePage={setActivePage} />
      {renderContent()}
    </div>
  );
}

export default StoreHomePage;

