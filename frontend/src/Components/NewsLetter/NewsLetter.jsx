import React from "react";
import "./NewsLetter.css";
function NewsLetter() {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers on Your Email</h1>
      <p>Subscrib e to our news Letter and stay Updated</p>
      <div>
        <input type="email" placeholder="your email id" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default NewsLetter;
