import AddProduct from "../../Components/Addproduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Admin.css";
import { Routes, Route } from "react-router-dom";
const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/listproduct" element={<ListProduct />}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
