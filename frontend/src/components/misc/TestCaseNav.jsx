import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const TestCaseNav = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/submit-testcase');
  };

  return (
    <button 
        className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"  
        onClick={handleClick}
    >
      Add TestCases
    </button>
  );
};

export default TestCaseNav;
