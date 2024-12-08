import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import SignupPage from './Pages/UserPages/signup'
import LoginPage from './Pages/UserPages/loginpage'
import CaptainHome from './Pages/CaptainPages/CaptainHome'
import "leaflet/dist/leaflet.css";
import UserHome from './Pages/UserPages/UserHome'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/userSignup" element={<SignupPage/>} />
        <Route path="/userLogin" element={<LoginPage/>} />
        <Route path="/captainhome" element={<CaptainHome/>} />
        <Route path="/userhome" element={<UserHome/>} />
      </Routes>
    </div>
  )
}

export default App
