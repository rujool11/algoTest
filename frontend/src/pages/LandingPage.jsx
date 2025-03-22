import React from "react";
import Navbar from "../components/misc/Navbar.jsx";
import Hero from "../components/misc/Hero.jsx";
import bgImage from "../assets/peakpx.jpg";
import { Context } from "../main.jsx";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/problems");
    }
  }, [isAuthorized, navigate]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <Hero />
      {/* Additional sections */}
    </div>
  );
};

export default LandingPage;
