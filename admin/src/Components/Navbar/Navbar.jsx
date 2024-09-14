import React from "react";
import "./Navbar.css";
import profile_icon from "../../assets/user-solid.svg";
const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="nav-logo">GLAM FIT</h1>
      <img className="nav-profile" src={profile_icon} alt="" />
    </div>
  );
};

export default Navbar;
