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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {CircularProgress} from "@mui/material";

const UserAds = ({ car }) => {
  const {id}= useParams()
  const navigate = useNavigate();
  const [vehicleDetails,setVehicleDetails]= useState(null)
  useEffect(() => {
    axios
      .get(`http://localhost:5278/advertises/getVehicles/${car.advertiseID}`)
      .then((response) => {
        setVehicleDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching vehicle:", error));
  }, []);

  const handleUpdate = () => {
    navigate(`/sellCar/User/${id}/${car.advertiseID}`);
  };

  const delAdvertise=(id)=>{
    if(window.confirm('Do you really want to delete Advertise with id '+ car.advertiseID +'?'))
    {
      axios.delete(`http://localhost:5278/advertises/deleteVehicle/${car.advertiseID}`);
      window.location.reload();
    }

  }

  if(vehicleDetails==null)
  {
    return(
      <CircularProgress/>
    )
  }
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{height: "550px"}}>
      <img
          src={vehicleDetails.vehicleImages.split(', ')[0]}
          alt="Car"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {vehicleDetails.make + " " + vehicleDetails.model + " " + vehicleDetails.variant}
          </Typography>
          <Typography variant="body2" component="p">
            {vehicleDetails.vehicleCity}
          </Typography>
          <br />
          <Typography variant="body2" component="p">
            {vehicleDetails.vehicleRegistrationYear.substr(0,4)} | {vehicleDetails.mileage} | {vehicleDetails.bodyType} | {vehicleDetails.engineCapacity}cc |{" "}
            {vehicleDetails.engineTransmission}
          </Typography>
          <Typography
            variant="h5"
            color="success.main"
            style={{ marginTop: "10px" }}
          >
            Price:{vehicleDetails.price} Rs
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleUpdate}
          >
            Update Ad
          </Button>
          <Button variant="outlined" color="secondary" onClick={delAdvertise}>
            Delete Ad
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default UserAds;
