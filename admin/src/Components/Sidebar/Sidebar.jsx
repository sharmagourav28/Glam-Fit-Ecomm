import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_cart from "../../assets/add_product_icon.png";
import lisT_product from "../../assets/list-product.jpg";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_cart} alt="" />
          <p>Add products</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={lisT_product} alt="" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
