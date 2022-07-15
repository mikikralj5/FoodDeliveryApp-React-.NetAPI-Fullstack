import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TransferInput from "./TransferInput";
import Add from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { useGlobalContext } from "../context/AuthProvider";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { ReplayOutlined } from "@mui/icons-material";
import AdminService from "../APIService/AdminService";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddProduct({ fetchProducts }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    fetchProducts();
    setOpen(false);
    //window.location.reload();
  };
  const { chosenProducts, setChosenProducts } = useGlobalContext();
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  const handleClick = async () => {
    const ingredients = chosenProducts.toString();

    if (name === "" || price === "" || ingredients === "") {
      setError(true);
      setErrMsg("Populate all the fields");
    } else if (isNaN(price)) {
      setError(true);
      setErrMsg("Enter the number");
    } else {
      const resp = await AdminService.AddProduct({
        Name: name,
        Price: price,
        Ingredients: ingredients,
      });

      const jsoned = await resp.json();
      console.log(jsoned);
      if (resp.ok) {
        handleClose();
      } else {
        setError(true);
        setErrMsg(jsoned);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {error && <Alert severity="error">{errMsg} !</Alert>}
          <Typography
            sx={{ marginLeft: 29 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          ></Typography>
          <TextField
            id="name"
            name="name"
            label="Product Name"
            variant="standard"
            sx={{ marginBottom: 5, marginLeft: 7 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="price"
            name="price"
            label="Product Price"
            variant="standard"
            sx={{ marginBottom: 5, marginLeft: 7 }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TransferInput></TransferInput>
          <Box sx={{ width: "100%", marginTop: 5 }}>
            <Stack spacing={18} direction="row">
              <Button variant="outlined" component="label" color="primary">
                <Add /> Upload a picture
                <input type="file" name="picture" hidden />
              </Button>

              <Button
                variant="outlined"
                component="label"
                color="primary"
                onClick={handleClick}
              >
                <Add /> Add product
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
