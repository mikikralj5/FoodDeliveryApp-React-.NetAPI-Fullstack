import { React, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import ConsumerService from "../APIService/ConsumerService";

const AdminUserOverviewItem = ({ username, email, verified }) => {
  const [img, setImg] = useState();

  const fetchImg = async (username) => {
    const userImgBlob = await ConsumerService.GetUserImageByUsername(username);
    setImg(URL.createObjectURL(userImgBlob));
  };

  useEffect(() => {
    fetchImg(username);
  }, []);

  return (
    <Card
      sx={{
        width: "75%",
        marginTop: 2,
        marginLeft: 12,
        marginRight: 2,
        marginBottom: 2,
        height: 400,
        alignContent: "center",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <CardHeader align-content="center" title={username} />
      </Box>
      <CardMedia component="img" height="194" image={img} alt="Paella dish" />
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            fontSize={20}
            variant="body2"
            color="text.primary"
            sx={{ marginLeft: 0 }}
          >
            {email}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={30} direction="row">
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={20}
              marginTop={2}
            >
              {`${verified}`}
            </Typography>
          </Stack>
        </Box>
      </CardActions>
    </Card>
  );
};

export default AdminUserOverviewItem;
