import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      {/* hello world */}
    
    </div>
  )
}

export default App
