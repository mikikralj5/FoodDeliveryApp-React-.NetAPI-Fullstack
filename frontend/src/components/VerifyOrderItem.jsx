import React from "react";
import { useGlobalContext } from "../context/AuthProvider";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const VerifyOrderItem = ({
  id,
  totalPrice,
  orderAddress,
  comment,
  orderState,
  deliveryTime,
  products,
  username,
  error,
  setError,
}) => {
  const { auth } = useGlobalContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Deliverer/AcceptOrder/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (respp.ok) {
        const jsoned = await respp.json();
        console.log(jsoned);
        navigate("../myorder");
      } else if (respp.status === 400) {
        console.log("cant again");
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="cart-item">
      <img src={"/6.png"} />
      <Stack direction="row" spacing={5}>
        <div>
          <h4>Id : {id}</h4>
          <h4>Price : {totalPrice}</h4>
          <h4>Comment : {comment}</h4>
        </div>

        <div>
          <h4>Order address : {orderAddress}</h4>
          <h4>Customer : {username}</h4>
        </div>
      </Stack>
      <div>
        <Button onClick={() => handleClick()}>
          <DoneIcon></DoneIcon>
        </Button>
      </div>
    </article>
  );
};

export default VerifyOrderItem;
