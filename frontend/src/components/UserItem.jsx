import React from 'react';
import { useGlobalContext } from '../context/AuthProvider';
const UserItem = ({ id, name, price, ingredients, amount }) => {
  const { username } = useGlobalContext();

  return (
    <article className="cart-item">
      <img src={'/6.png'} />
      <div>
        <h4>{username}</h4>
      </div>
      <div>{/* increase amount */}</div>
    </article>
  );
};

export default UserItem;
