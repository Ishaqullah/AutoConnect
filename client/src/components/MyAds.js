import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";
import React from "react";
import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import PaymentIcon from "@mui/icons-material/Payment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import axios from "axios";
import UserAdGrid from "./UserAdGrid";
const carAdsData = [
  {
    image: "Images/toyota-fortuner.webp",
    name: "Toyota Fortuner",
    location: "Karachi",
    year: 2021,
    mileage: "44,000 km",
    fuelType: "Petrol",
    engine: 1600,
    transmission: "Automatic",
    price: 25000,
  },
];
const MyAds = () => {
  return (
    <Container sx={{ marginTop: "50px", marginBottom: "500px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                {/* Avatar */}
                <Grid item>
                  <Avatar
                    alt="Profile Picture"
                    src="Images/1.png"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "10px",
                      marginLeft: "50px",
                    }}
                  />
                </Grid>
                {/* Typography */}
                <Grid item>
                  <Typography variant="h5" component="div">
                    Jhon Doe
                  </Typography>
                  <Typography color="text.secondary">
                    <u>Edit Profile</u> | <u>Change Password</u>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <AppBar
            position="static"
            sx={{ color: "primary.main" }}
            color="default"
          >
            <Toolbar style={{ display: "flex", justifyContent: "center" }}>
              <LocalOfferIcon />
              <Typography
                variant="h6"
                style={{
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                }}
              >
                <b> My Ads</b>
              </Typography>
              <FavoriteIcon />
              <Typography
                variant="h6"
                style={{
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                }}
              >
                My Saved Ads
              </Typography>
              <DirectionsCarIcon />
              <Typography
                variant="h6"
                style={{
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                }}
              >
                My Rides
              </Typography>
              <NotificationsIcon />
              <Typography
                variant="h6"
                style={{
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                }}
              >
                My Alerts
              </Typography>
              <MessageIcon />
              <Typography
                variant="h6"
                style={{
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                }}
              >
                My Messages
              </Typography>
              <PaymentIcon />
              <Typography
                variant="h6"
                style={{ cursor: "pointer", padding: "5px" }}
              >
                Payment
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>

        {/* First Card */}
        <Grid item xs={2}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Typography component="div">
                <Typography component="div">Active Ads</Typography>
                <Divider sx={{ margin: "10px 0" }} />
              </Typography>
              <Typography component="div">
                <Typography component="div">Removed Ads</Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Card */}
        <Grid item xs={10}>
          <Card>
            <CardContent>
              
                <Container maxWidth="md" sx={{ marginTop: "50px" }}>
                  <UserAdGrid carAds={carAdsData}/>
                </Container>
              
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default MyAds;
