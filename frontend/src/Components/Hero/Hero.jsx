import React from "react";
import "./Hero.css";
import hand from "../Assets/hand.png";
import right_img from "../Assets/right_img.png";
import arrow_img from "../Assets/arrow_img.png";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>

        <div>
          <div className="hero-hand-icon">
            <p>New</p>
            <img src={hand} alt="" />
          </div>
          <p>collection</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-button">
          <div>Latest Collection</div>
          <img src={arrow_img} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={right_img} alt="" />
      </div>
    </div>
  );
}

export default Hero;
