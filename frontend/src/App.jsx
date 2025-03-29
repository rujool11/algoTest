import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage.jsx'
import GetIn from './pages/GetIn.jsx';
import Content from './pages/Content.jsx';
import Problem from './pages/Problem.jsx';
import Error from './pages/Error.jsx';
import SubmitProblem from './pages/SubmitProblem.jsx';
import SubmitTestCases from './pages/SubmitTestCases.jsx';
import Delete from './pages/Delete.jsx';
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
          <Route path="/submit-problem" element={<SubmitProblem/>} />
          <Route path="/submit-testcase" element={<SubmitTestCases/>} />
          <Route path="/delete" element={<Delete/>} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
