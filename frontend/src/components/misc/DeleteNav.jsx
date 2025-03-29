import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const DeleteNav = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/delete');
  };

  return (
    <button 
        className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"  
        onClick={handleClick}
    >
      Deletion 
    </button>
  );
};

export default DeleteNav;
