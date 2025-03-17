import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import GetIn from './pages/GetIn.jsx';
import Content from './pages/Content.jsx';
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/getin" element={<GetIn/>} />
          <Route path="/problem" element={<Content/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
