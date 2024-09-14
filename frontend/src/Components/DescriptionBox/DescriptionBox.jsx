import React from "react";
import "./DescriptionBox.css";
function DescriptionBox() {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website is one that allows people to buy and sell
          physical goods, services, and digital products over the internet
          rather than at a brick-and-mortar location. Through an e-commerce
          website, a business can process orders, accept payments, manage
          shipping and logistics, and provide customer service. It’s tough to
          imagine daily life without e-commerce. We order food, clothes, and
          furniture; we register for classes and other online services; we
          download books, music, and movies; and so much more. E-commerce has
          taken root and is here to stay. The term “e-commerce” simply means the
          sale of goods or services on the internet. In its most basic form,
          e-commerce involves electronically transferring funds and data between
          2 or more parties. This form of business has evolved quite a bit since
          its beginnings in the electronic data interchange of the 1960s and the
          inception of online shopping in the 1990s.
        </p>
      </div>
    </div>
  );
}

export default DescriptionBox;
