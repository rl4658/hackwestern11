import React from "react";
import { Button } from "@mui/material";

import logo1 from "../assets/auth0-logo.png";
import logo2 from "../assets/tempolab-logo.png";
import logo3 from "../assets/voiceflow-logo.png";
import logo4 from "../assets/purple-banner.jpeg"; // Import the logo for the background
import "../css/logo.css";  // Import the CSS file here

const Hero = () => (
  <section
    className="py-20 text-center"
    style={{
      backgroundImage: `url(${logo4})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#FFFFFF", // Set text color to white
    }}
  >
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Simplify Your Schedule with PlaceHolder</h1>
      <p className="text-xl mb-8">Organize, plan, and collaborate effortlessly with our intuitive calendar solution</p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button size="large" variant="contained" style={{ backgroundColor: "#ffffff", color: "#6a0dad" }}>Get Started</Button>
        <Button size="large" variant="outlined" style={{ borderColor: "#ffffff", color: "#ffffff" }}>Learn More</Button>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-8">
        <img src={logo1} alt="Client Logo 1" className="logo1" />
        <img src={logo2} alt="Client Logo 2" className="logo1" />
        <img src={logo3} alt="Client Logo 3" className="logo1" />
      </div>
    </div>
  </section>
);

export default Hero;
