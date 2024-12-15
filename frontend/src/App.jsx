import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import CaptainHome from './Pages/CaptainPages/CaptainHome'
import "leaflet/dist/leaflet.css";
import UserHome from './Pages/UserPages/UserHome'
import StoreHomePage from './Pages/StorePages/StoreHomePage'
import CaptainSignupPage from './Pages/CaptainPages/CaptainSignupPage'
import CaptainLoginPage from './Pages/CaptainPages/CaptainLoginPage'
import UserSignupPage from './Pages/UserPages/UserSignupPage'
import UserLoginPage from './Pages/UserPages/UserLoginPage'
import StoreLoginPage from './Pages/StorePages/StoreLoginPage';
import StoreSignupPage from './Pages/StorePages/StoreSignupPage';
import { Toaster} from 'react-hot-toast';
import NewOrders from './Pages/StorePages/newOrders'
import TrackOrders from './Pages/StorePages/TrackOrders';
function App() {
  return (
    <div>
        <Toaster/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/captainHome" element={<CaptainHome/>} />
            <Route path="/userHome" element={<UserHome/>} />
            <Route path="/storeHome" element={<StoreHomePage/>} />
            <Route path="/captainSignup" element={<CaptainSignupPage/>} />
            <Route path="/captainLogin" element={<CaptainLoginPage/>} />
            <Route path="/userLogin" element={<UserLoginPage/>} />
            <Route path="/userSignup" element={<UserSignupPage/>} />
            <Route path="/storeSignup" element={<StoreSignupPage/>} />
            <Route path="/storeLogin" element={<StoreLoginPage/>} />
            <Route path="/new-orders" element={<NewOrders />} />
           <Route path="/track-orders" element={<TrackOrders />} />
          </Routes>
        
    </div>
  )
}

export default App
