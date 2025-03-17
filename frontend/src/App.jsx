import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import GetIn from './pages/GetIn.jsx';
import Content from './pages/Content.jsx';
import Problem from './pages/Problem.jsx';
import Error from './pages/Error.jsx';
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/getin" element={<GetIn/>} />
          <Route path="/problems" element={<Content/>} />
          <Route path="/problem/:pid" element={<Problem/>} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
