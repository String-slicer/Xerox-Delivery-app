import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import SignupPage from './Pages/signup'
import LoginPage from './Pages/loginpage'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </div>
  )
}

export default App
