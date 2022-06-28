import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Card, CardMedia, Stack, Typography } from '@mui/material';
import { menuItemUnstyledClasses } from '@mui/base';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import { useGlobalContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
import DelivererService from '../APIService/DelivererService';
import ConsumerService from '../APIService/ConsumerService';
import { useNavigate, useLocation } from 'react-router-dom';

const MyOrder = () => {
  const { loading, setLoading } = useGlobalContext();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [order, setOrder] = useState({});
  const [delivered, setDelivered] = useState(false);
  const location = useLocation();
  const id = location.state?.id;

  const handleDelivered = async () => {
    const respp = await DelivererService.PostFinishedOrder(order.id);
    setDelivered(true);
  };

  const fetchOrder = async () => {
    setLoading(true);
    const data = await DelivererService.GetMyOrder();

    if (data) {
      setOrder((order) => ({
        ...order,
        ...data,
      }));

      setLoading(false);
    } else {
      setOrder({});
    }
  };

  const fetchConsumerOrder = async () => {
    setLoading(true);
    const data = await ConsumerService.GetConsumerOrder(id);

    if (data) {
      setOrder((order) => ({
        ...order,
        ...data,
      }));

      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('role') === 'DELIVERER') {
      fetchOrder();
    } else if (localStorage.getItem('role') === 'CONSUMER') {
      fetchConsumerOrder();
    }
  }, []);

  var countDownDate = new Date(
    `Jun 22, 2022 ${order.deliveryTime}:00`
  ).getTime();

  var x = setInterval(async function () {
    let now = new Date().getTime();

    let distance = countDownDate - now;

    let minutes = await Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = await Math.floor((distance % (1000 * 60)) / 1000);
    await setSeconds(seconds);
    await setMinutes(minutes);

    if (minutes <= 0 && seconds <= 1 && Object.keys(order).length !== 0) {
      handleDelivered();
      clearInterval(x);
    }
  }, 1000);

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(order).length === 0) {
    console.log('nema ih');
    return (
      <div>
        <h2 className="section-title">No order to display</h2>
      </div>
    );
  }

  return (
    <Grid sx={{ ml: 4, mr: 4, mt: 5 }} container spacing={2}>
      <Grid item xs="5">
        <Typography variant="h3">Products</Typography>
        <hr />
        {order.products.map((item) => {
          return (
            <Card sx={{ mt: 2, mb: 2, display: 'flex' }} fullWidth>
              <Box
                sx={{ width: '80%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2">
                    Ingredients: {item.product.ingredients}
                  </Typography>
                </CardContent>
              </Box>
              <Typography
                sx={{ mr: 5 }}
                margin="auto"
                align="center"
                variant="h7"
              >
                Amount: {item.amount}
              </Typography>
            </Card>
          );
        })}
      </Grid>
      <Grid item xs="5">
        <Typography variant="h3">Order details</Typography>
        <hr />

        <Typography sx={{ mt: 3, mb: 10, ml: 2, mr: 2 }} variant="h3">
          {delivered
            ? 'Your order has been delivered'
            : `Time remaining : ${minutes}:${seconds}`}
        </Typography>
        <div>
          <Typography sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }} variant="h5">
            Order Address: {order.orderAddress}
          </Typography>
        </div>
        <div>
          <Typography sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }} variant="h5">
            Order Comment: {order.comment}
          </Typography>
          <div>
            <Typography sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }} variant="h5">
              Order Price: ${order.totalPrice}
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default MyOrder;
