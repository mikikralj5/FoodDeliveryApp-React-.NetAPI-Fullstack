import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Card, CardMedia, Stack, Typography } from "@mui/material";
import { menuItemUnstyledClasses } from "@mui/base";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { useGlobalContext } from "../context/AuthProvider";
import Loading from "../components/Loading";

const MyOrder = () => {
  const { auth, loading, setLoading } = useGlobalContext();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [order, setOrder] = useState({});
  const [delivered, setDelivered] = useState(false);

  const handleDelivered = async () => {
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Deliverer/FinishOrder/${order.id}`,
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

      //const jsoned = await respp.json();
      console.log("poslao");
      setDelivered(true);
      console.log(delivered);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Deliverer/GetInProgressOrder`,
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

      if (data) {
        console.log(data);
        console.log("usao");
        setOrder((order) => ({
          ...order,
          ...data,
        }));
        console.log(order);
        setLoading(false);
      } else {
        console.log("prazan");
        setOrder({});
      }
    } catch (error) {
      console.log("usao u error");
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  var countDownDate = new Date(
    `Jun 22, 2022 ${order.deliveryTime}:00`
  ).getTime();
  // console.log(order.deliveryTime);
  // console.log(countDownDate);
  //  console.log(new Date().getTime());

  var x = setInterval(async function () {
    let now = new Date().getTime();

    let distance = countDownDate - now;

    let minutes = await Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = await Math.floor((distance % (1000 * 60)) / 1000);
    setSeconds(seconds);
    setMinutes(minutes);
    // console.log(distance);
    if (seconds === 1) {
      handleDelivered();
      clearInterval(x);
    }
  }, 1000);

  if (loading) {
    return <Loading />;
  }

  if (!order.products) {
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
            <Card sx={{ mt: 2, mb: 2, display: "flex" }} fullWidth>
              <Box
                sx={{ width: "80%", display: "flex", flexDirection: "column" }}
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
            ? "Your order has been delivered"
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
