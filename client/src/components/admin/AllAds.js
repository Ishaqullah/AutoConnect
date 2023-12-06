import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const AllAds = ({ car }) => {

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <img
          src={car.image}
          alt="Car"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {car.name}
          </Typography>
          <Typography variant="body2" component="p">
            {car.location}
          </Typography>
          <br />
          <Typography variant="body2" component="p">
            {car.year} | {car.mileage} | {car.fuelType} | {car.engine}cc |{" "}
            {car.transmission}
          </Typography>
          <Typography
            variant="h5"
            color="success.main"
            style={{ marginTop: "10px" }}
          >
            Price: ${car.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="primary"
          >
            View Ad
          </Button>
          <Button variant="outlined" color="secondary">
            Delete Ad
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AllAds;
