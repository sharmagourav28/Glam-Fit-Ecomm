import React, { useContext, useState, useRef } from "react";
import "./Navbar.css";
import cart_img from "../Assets/cart_img.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav-dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <h1>GLAM FIT</h1>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "600",
            }}
          >
            Shop
          </Link>{" "}
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link
            to="/mens"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "600",
            }}
          >
            Men
          </Link>{" "}
          {menu === "mens" ? <hr /> : <></>}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link
            to="/womens"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "600",
            }}
          >
            Women
          </Link>{" "}
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link
            to="/kids"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "600",
            }}
          >
            Kids
          </Link>{" "}
          {menu === "kids" ? <hr /> : <></>}{" "}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img className="cart-img" src={cart_img} alt="" />
        </Link>
        <div className="nav-cart-count">
          <span>{getTotalCartItems()}</span>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
