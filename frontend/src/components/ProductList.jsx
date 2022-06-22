import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/AuthProvider";
import ProductItem from "./ProductItem";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import AddProduct from "./AddProduct";
import Loading from "./Loading";

import Stack from "@mui/material/Stack";
import ConsumerService from "../APIService/ConsumerService";
export default function CocktailList() {
  const { loading, setLoading } = useGlobalContext();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await ConsumerService.GetProducts();
    console.log(data);

    if (data) {
      setProducts(data);
      console.log(products);
    } else {
      setProducts([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(products)]);

  if (loading) {
    return <Loading />;
  }

  if (products.length < 1) {
    return (
      <div>
        <h2 className="section-title">No products to display</h2>
        <AddProduct setProducts={setProducts}></AddProduct>
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {products.map((item) => {
        return <ProductItem key={item.id} {...item} />;
      })}
      <AddProduct setProducts={setProducts}></AddProduct>
    </Box>
  );
}
