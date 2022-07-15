import React from "react";
import CartItem from "./CartItem.jsx";
import { useGlobalContext } from "../context/AuthProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import UserItem from "./UserItem";
import ConsumerService from "../APIService/ConsumerService.js";
import OrderItem from "./OrderItem.jsx";
import DelivererService from "../APIService/DelivererService.js";
import AdminService from "../APIService/AdminService.js";

const ConsumerOrders = () => {
  const { loading, setLoading } = useGlobalContext();

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    if (localStorage.getItem("role") === "DELIVERER") {
      const data = await DelivererService.GetFinishedOrders();
      setOrders(data);
    } else if (localStorage.getItem("role") === "ADMIN") {
      const data = await AdminService.GetAllOrders();
      setOrders(data);
    } else {
      const data = await ConsumerService.GetOrders();
      setOrders(data);
    }

    // if (data) {
    //   console.log(" data postoji" + data);
    //   setOrders(data);
    //   console.log(orders);
    // } else {
    //   // setOrders([]);
    // }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, [JSON.stringify(orders)]);

  if (loading) {
    return <Loading />;
  }
  if (orders.length < 1) {
    return (
      <section className="cart">
        <header>
          <h2>No order history</h2>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        {localStorage.getItem("role") === "ADMIN" ? (
          <h2>All orders</h2>
        ) : (
          <h2>Order history</h2>
        )}
      </header>

      <div>
        {orders.map((item) => {
          return <OrderItem key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default ConsumerOrders;
