import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import SignupPage from './Pages/signup'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage/>} />
      </Routes>
    </div>
  )
}

export default App
