import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/AuthProvider';
import ProductItem from './ProductItem';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import AddProduct from './AddProduct';
import Loading from './Loading';

import Stack from '@mui/material/Stack';
export default function CocktailList() {
  const { auth, loading, setLoading } = useGlobalContext();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Consumer/GetProducts`,
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
        setProducts(data);
        console.log(products);
      } else {
        setProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (products.length < 1) {
    return <h2 className="section-title">No products to display</h2>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {products.map((item) => {
        return <ProductItem key={item.id} {...item} />;
      })}
      <AddProduct></AddProduct>
    </Box>
  );
}
