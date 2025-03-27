import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Context } from '../../main.jsx'; 

const Logout = () => {
  const { setUser, setIsAuthorized } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    
    setUser(null);
    setIsAuthorized(false);
    
    navigate('/');
  };

  return (
    <button 
        className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"  
        onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
