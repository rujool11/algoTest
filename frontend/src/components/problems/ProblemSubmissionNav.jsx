import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const ProblemSubmissionNav = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/submit-problem');
  };

  return (
    <button 
        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"  
        onClick={handleClick}
    >
      Submit Problems
    </button>
  );
};

export default ProblemSubmissionNav;
