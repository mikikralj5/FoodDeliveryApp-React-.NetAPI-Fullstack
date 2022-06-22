import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../context/AuthProvider";

export default function ProductItem({ id, price, name, ingredients }) {
  const { cart, setCart, addToCart } = useGlobalContext();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        width: "25%",
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 2,
        height: 400,
      }}
    >
      <CardHeader title={name} />
      <CardMedia
        component="img"
        height="194"
        image="/5.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.primary" sx={{ marginLeft: 0 }}>
          {ingredients}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginLeft: 37, marginTop: 0 }}
        >
          {`$${price}`}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => {
            if (!cart.some((e) => e.id === id)) {
              addToCart(id, price, name, ingredients);
            }
          }}
          aria-label="add to cart"
          sx={{ marginLeft: 37 }}
        >
          <AddIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
