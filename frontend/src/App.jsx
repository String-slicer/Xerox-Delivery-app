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
import AcceptedPage from './Pages/UserPages/AcceptedPage';
import TrackOrders from './Pages/StorePages/TrackOrders';
import OrderAcceptedPage from './Pages/CaptainPages/OrderAcceptedPage';
import NewOrders from './Pages/StorePages/NewOrders'
import UserProfilePage from './Pages/UserPages/UserProfilePage';
import  CaptainProfilePage from './Pages/CaptainPages/CaptainProfilePage';
import StoreProfilePage from './Pages/StorePages/StoreProfilePage';
import Settings from './Pages/UserPages/Settings';
import Temp from './Pages/Temp';
import UserOrdersPage from './Pages/UserPages/UserOrdersPage';
import StoreOrdersPage from './Pages/StorePages/StoreOrdersPage';
import CaptainOrdersPage from './Pages/CaptainPages/CaptainOrdersPage';
import CaptainSettings from './Pages/CaptainPages/CaptainSettings';
import LoginRedirect from './Pages/loginRedirect.jsx';
import { MainLanding } from './Pages/MainLanding.jsx';
function App() {
  return (
    <div>
        <Toaster/>
          <Routes>
            {/* <Route path="/1" element={<LandingPage />} /> */}
            <Route path="/" element={<MainLanding />} />
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
           <Route path="/accepted" element={<AcceptedPage />} />
           <Route path="/accepted-order-page" element={<OrderAcceptedPage />} />
           <Route path="/userProfile" element={<UserProfilePage />} />
           <Route path="/captainProfile" element={< CaptainProfilePage/>} />
           <Route path="/storeProfile" element={< StoreProfilePage/>} />
           <Route path="/userSettings" element={<Settings />} />
           <Route path="/Landing" element={<Temp />} />
           <Route path="/userOrders" element={<UserOrdersPage />} />
           <Route path="/storeOrders" element={<StoreOrdersPage />} />
           <Route path="/captainOrders" element={<CaptainOrdersPage />} />
           <Route path="/captainSettings" element={<CaptainSettings />} />
           <Route path="/middle-login" element={<LoginRedirect />} />
          </Routes>
        
    </div>
  )
}

export default App
