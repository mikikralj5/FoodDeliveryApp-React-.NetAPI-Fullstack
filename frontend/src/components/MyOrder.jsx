import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Card, CardMedia, Stack, Typography } from "@mui/material";
import { menuItemUnstyledClasses } from "@mui/base";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { useGlobalContext } from "../context/AuthProvider";

const MyOrder = () => {
  const { auth } = useGlobalContext();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [order, setOrder] = useState(0);
  var countDownDate = new Date("Jun 20, 2022 22:37:25").getTime();

  var x = setInterval(function () {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    setSeconds(seconds);
    setMinutes(minutes);

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Deliverer/GetUnverifiedDeliverers`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (data) {
        setOrder(data);
        console.log(order);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Grid sx={{ ml: 4, mr: 4, mt: 5 }} container spacing={2}>
      <Grid item xs="5">
        <Typography variant="h3">Current order</Typography>
        <hr />
        <Card sx={{ mt: 2, mb: 2, display: "flex" }} fullWidth>
          <Box sx={{ width: "80%", display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Burito
              </Typography>
              <Typography variant="body2">
                Sastojci: kecap, senf, kita
              </Typography>
            </CardContent>
          </Box>
          <Typography sx={{ mr: 5 }} margin="auto" align="center" variant="h7">
            Amount: 2
          </Typography>
        </Card>
      </Grid>
      <Grid item xs="5">
        <Typography variant="h3">Order details</Typography>
        <hr />

        <Typography sx={{ mt: 3, mb: 10, ml: 2, mr: 2 }} variant="h3">
          Time remaining : {minutes}:{seconds}
        </Typography>
        <div>
          <Typography sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }} variant="h5">
            Address: Filipa Visnjica 17a
          </Typography>
        </div>
        <div>
          <Typography sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }} variant="h5">
            Comment: Grale picketina jedna, nece nista da nauci.
          </Typography>
          <div>
            <Typography sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }} variant="h5">
              Price: 31$.
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
export default MyOrder;
