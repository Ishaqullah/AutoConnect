import React, { useState, useEffect } from "react";
import CarAdsGrid from "./CarAdsGrid";
import { Container, Typography } from "@mui/material";
import axios from "axios";

// const carAdsData = [

//   {
//     image: "Images/toyota-fortuner.webp",
//     name: "Toyota Fortuner 2.8 Sigma 4",
//     location: "Karachi",
//     year: 2021,
//     mileage: "44,000 km",
//     fuelType: "Petrol",
//     engine: 1600,
//     transmission: "Automatic",
//     price: 25000,
//   },
//   {
//     image:"/Images/honda-br-v.webp",
//     name: "Honda BRV iVTEC ",
//     location: "Karachi",
//     year: 2021,
//     mileage: "44,000 km",
//     fuelType: "Petrol",
//     engine: 1600,
//     transmission: "Automatic",
//     price: 25000,
//   },
//   {
//     image: require("../../src/Images/honda-hr-v.webp"),
//     name: "Honda HRV VTI",
//     location: "Karachi",
//     year: 2021,
//     mileage: "44,000 km",
//     fuelType: "Petrol",
//     engine: 1600,
//     transmission: "Automatic",
//     price: 25000,
//   }
//   // Add more car ads data...
// ];

const BuyCar = () => {
  const [advertises, setAdvertises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5278/vehicles")
      .then((response) => setAdvertises(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);
  return (
    <Container sx={{ marginTop: "50px", marginBottom: "500px" }}>
      <Typography variant="h4" color={"#9D1515"}>
        <b>Used cars for sale in Pakistan</b>
        
      </Typography>
      <Container maxWidth="md" sx={{ marginTop: "50px" }}>
        <CarAdsGrid carAds={advertises} />
      </Container>
      
    </Container>
  );
};

export default BuyCar;
