import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-25 pt-10 pb-3 bg-transparent">
      <div className="text-white text-xl font-bold">💡 algoTest</div>
      <div>
        <Link to="/getin" className="text-white hover:text-gray-200">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
