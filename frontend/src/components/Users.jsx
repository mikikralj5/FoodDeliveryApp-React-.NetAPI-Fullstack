import React from "react";
import CartItem from "./CartItem.jsx";
import { useGlobalContext } from "../context/AuthProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import UserItem from "./UserItem";
const Users = () => {
  const { auth, loading, setLoading } = useGlobalContext();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Admin/GetUnverifiedDeliverers`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (data) {
        setUsers(data);
        console.log(users);
      } else {
        setUsers([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [JSON.stringify(users)]);

  if (loading) {
    return <Loading />;
  }
  if (users.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>No pending users</h2>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>pending users</h2>
      </header>

      <div>
        {users.map((item) => {
          return (
            <UserItem
              key={item.id}
              {...item}
              setUsers={setUsers}
              users={users}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Users;
