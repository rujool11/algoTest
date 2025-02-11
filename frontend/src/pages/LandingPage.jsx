import React from 'react';
import Navbar from '../components/misc/Navbar.jsx';
import Hero from '../components/misc/Hero.jsx';
import bgImage from "../assets/peakpx.jpg";

const LandingPage = () => {
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <Navbar />
      <Hero />
      {/* Additional sections */}
    </div>
  );
};

export default LandingPage;
