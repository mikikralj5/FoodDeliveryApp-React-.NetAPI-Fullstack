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
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<CardItem />} />
        </Routes>
        <Routes>
          <Route path="/update" element={<UpdateUser />} />
        </Routes>
        <Routes>
          <Route path="/productItem" element={<ProductItem />} />
        </Routes>
        <Routes>
          <Route path="/productList" element={<ProductList />} />
        </Routes>
        <Routes>
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
        <Routes>
          <Route path="/cart" element={<CartContainer />} />
        </Routes>
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
        <Routes>
          <Route path="/userItem" element={<UserItem />} />
        </Routes>
        <Routes>
          <Route path="/verifyorderitem" element={<VerifyOrderItem />} />
        </Routes>
        <Routes>
          <Route path="/verifyorderlist" element={<VerifyOrderList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
