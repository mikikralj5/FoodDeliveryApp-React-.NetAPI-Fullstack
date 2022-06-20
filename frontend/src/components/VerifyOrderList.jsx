import React from "react";
import CartItem from "./CartItem.jsx";
import { useGlobalContext } from "../context/AuthProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import VerifyOrderItem from "./VerifyOrderItem.jsx";
import Loading from "./Loading";
const VerifyOrderList = () => {
  const { auth, loading, setLoading } = useGlobalContext();

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    console.log("kurac");
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Deliverer/GetPendingOrders`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (data) {
        setOrders(data);
        console.log(orders);
      } else {
        setOrders([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <section className="cart">
        <header>
          <h4 className="empty-cart">There are no pending orders</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>pending orders</h2>
      </header>

      <div>
        {orders.map((item) => {
          return <VerifyOrderItem key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default VerifyOrderList;
