import React from "react";
import Container from "@mui/material/Container";
import { Grid, requirePropFactory } from "@mui/material";
import Button from "@mui/material/Button";
import { Card, CardContent, Typography, Box } from "@mui/material";
const aboutUsDivision = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <img
          src={"/Images/mercedes-benz-cla-coupe-2024-35-amg-premium-quarter-iridium-silver.png"}
          width={700}
          height={450}
        ></img>
      </Grid>
      <Grid item xs={6}>
        <Container maxWidth="sm">
          <Card
            sx={{
              width: "100%",
              marginTop: "50px",
              position: "relative",
              height: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center text and buttons vertically
              alignItems: "center", // Center text and buttons horizontally
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                sx={{ color: "#7B7272" }}
              >
                <b>Welcome To Autoconnect</b>
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: "#969595" }}>
                Welcome to the intersection of passion and performance. At
                Autoconnect, we're not just an automobile eCommerce site; we're
                enthusiasts, experts, and your trusted partners on the road to
                automotive excellence.
              </Typography>
              <Button color="secondary" variant="contained">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </Grid>
  );
};

export default aboutUsDivision;
