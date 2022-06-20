import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CardItem from "./components/CardItem";
import UpdateUser from "./components/UpdateUser";
import ProductItem from "./components/ProductItem";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import CartContainer from "./components/CartContainer";
import Users from "./components/Users";
import UserItem from "./components/UserItem";
import VerifyOrderItem from "./components/VerifyOrderItem";
import VerifyOrderList from "./components/VerifyOrderList";
import MyOrder from "./components/MyOrder";

function App() {
  const [test, setTest] = useState([]);

  // useEffect(() => {
  //   getTest();
  // }, []);

  // const getTest = async () => {
  //   const resp = await fetch("https://localhost:5001/api/Register");
  //   const data = await resp.json();
  //   console.log(data);
  // };

  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<CardItem />} />

          <Route path="/update" element={<UpdateUser />} />

          <Route path="/productItem" element={<ProductItem />} />

          <Route path="/productList" element={<ProductList />} />

          <Route path="/addProduct" element={<AddProduct />} />

          <Route path="/cart" element={<CartContainer />} />

          <Route path="/users" element={<Users />} />

          <Route path="/userItem" element={<UserItem />} />

          <Route path="/verifyorderitem" element={<VerifyOrderItem />} />

          <Route path="/verifyorderlist" element={<VerifyOrderList />} />
          <Route path="/myorder" element={<MyOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
