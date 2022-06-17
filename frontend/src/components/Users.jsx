import React from 'react';
import CartItem from './CartItem.jsx';
import { useGlobalContext } from '../context/AuthProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
const Users = () => {
  const { auth, loading, setLoading } = useGlobalContext();
  /*if (cartItems.length === 0) {
    return (
      <section className="cart">
        {/* cart header }
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }*/
  const [users, setUsers] = useEffect([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Admin/GetUnverifiedDeliverers`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + auth.token,
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
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="cart">
      <header>
        <h2>pending users</h2>
      </header>

      <div>
        {cart.map((item) => {
          return <UserItem key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default Users;
