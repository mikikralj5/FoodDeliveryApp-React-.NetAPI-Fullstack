import React from "react";
import { useGlobalContext } from "../context/AuthProvider";
const VerifyOrderItem = ({
  id,
  totalPrice,
  orderAddress,
  comment,
  orderState,
  deliveryTime,
  products,
}) => {
  //const { username } = useGlobalContext();

  return (
    <article className="cart-item">
      <img src={"/6.png"} />
      <div>
        <h4>{id}</h4>
      </div>
      <div>{/* increase amount */}</div>
    </article>
  );
};

export default VerifyOrderItem;
