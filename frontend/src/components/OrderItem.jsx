import React from 'react';
import { useGlobalContext } from '../context/AuthProvider';
import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import AdminService from '../APIService/AdminService';
import { useNavigate } from 'react-router-dom';
const OrderItem = ({
  id,
  products,
  orderAddress,
  comment,
  totalPrice,
  orderState,
}) => {
  const navigate = useNavigate();

  return (
    <article className="cart-item">
      <img src={'/6.png'} />
      <div>
        <h4>{id}</h4>
        <h4>{orderAddress}</h4>
        <h4>{comment}</h4>
        <h4>{totalPrice}</h4>
      </div>
      <div>
        <button onClick={() => navigate('/myorder', { state: { id: id } })}>
          <DoneIcon></DoneIcon>
        </button>
      </div>
    </article>
  );
};

export default OrderItem;
