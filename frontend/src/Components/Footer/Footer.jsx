import React from "react";
import "./Footer.css";
import instagram_icon from "../Assets/instagram.png";
import twitter_icon from "../Assets/twitter.png";
import youtube_icon from "../Assets/youtube.png";

function Footer() {
  return (
    <div className="footer">
      <hr />
      <div className="footer-logo">
        <h1>GLAM FIT</h1>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={twitter_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={youtube_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>copyright @ 2024 reserved</p>
      </div>
    </div>
  );
}

export default Footer;
