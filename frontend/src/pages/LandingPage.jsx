import React from 'react';
import NavBar from '../components/misc/NavBar.jsx';
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
      <NavBar />
      <Hero />
      {/* Additional sections */}
    </div>
  );
};

export default LandingPage;
