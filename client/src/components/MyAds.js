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
import { Avatar } from "@mui/material";

const MyAds = () => {
  return (
    <Container sx={{ marginTop: "50px" }}>
      <Grid container spacing={2}>
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
                    Card 3
                  </Typography>
                  <Typography color="text.secondary">
                    This is the content of Card 3 below the first two cards.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Custom Navigation Bar
        <Grid item xs={12}>
          <div
            style={{
              
              padding: "10px",
              textAlign: "center",
            }}
          >
            <span style={{ marginRight: "0px", cursor: "pointer", borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc',  padding: '25px' }}>
              My Ads
            </span>
            <span style={{ marginRight: "0px", cursor: "pointer", borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc' , borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc',  padding: '25px' }}>
              My Saved Ads
            </span>
            <span style={{ marginRight: "0px", cursor: "pointer", borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc' , borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc',  padding: '25px' }}>
              My Rides
            </span>
            <span style={{ marginRight: "0px", cursor: "pointer", borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc' , borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc',  padding: '25px' }}>
              My Alerts
            </span>
            <span style={{ marginRight: "0px", cursor: "pointer", borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc' , borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc',  padding: '25px' }}>
              My Messages
            </span>
            <span style={{ marginRight: "0px", cursor: "pointer", borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc' , borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc',  padding: '25px' }}>
              My Orders
            </span>
            <span style={{ cursor: "pointer", borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc' , borderBottom: '1px solid #ccc', borderTop: '1px solid #ccc',  padding: '25px' }}>Payment</span>
          </div>
        </Grid> */}

        {/* Navigation Bar with Borders */}
        <Grid item xs={12}>
          <AppBar position="static" color="default">
            <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant="h6"
                style={{
                  marginRight: "0px",
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                }}
              >
                My Ads
              </Typography>
              <Typography
                variant="h6"
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px"
                }}
              >
                My Saved Ads
              </Typography>
              <Typography
                variant="h6"
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px"
                }}
              >
                My Rides
              </Typography>
              <Typography
                variant="h6"
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px"
                }}
              >
                My Alerts
              </Typography>
              <Typography
                variant="h6"
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px"
                }}
              >
                My Messages
              </Typography>
              <Typography
                variant="h6"
                style={{
                  marginLeftt: "5px",
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px"
                }}
              >
                My Orders
              </Typography>
              <Typography
                variant="h6"
                style={{ marginLeft: "5px", cursor: "pointer", padding: "5px" }}
              >
                Payment
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>

        {/* First Card */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="Container">
                Card 1
              </Typography>
              <Typography color="text.secondary">
                This is the content of Card 1.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Card */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="Container">
                Card 2
              </Typography>
              <Typography color="text.secondary">
                This is the content of Card 2.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default MyAds;
