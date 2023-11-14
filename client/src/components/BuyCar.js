import React from "react";
import CarAdsGrid from "./CarAdsGrid";
import { Container, Typography } from "@mui/material";
const carAdsData = [
  // Sample car ads data
  {
    image: require("../../src/Images/toyota-fortuner.webp"),
    name: "Toyota Fortuner",
    location: "Karachi",
    year: 2021,
    mileage: "44,000 km",
    fuelType: "Petrol",
    engine: 1600,
    transmission: "Automatic",
    price: 25000,
  },
  {
    image: require("../../src/Images/honda-br-v.webp"),
    name: "Honda BRV",
    location: "Karachi",
    year: 2021,
    mileage: "44,000 km",
    fuelType: "Petrol",
    engine: 1600,
    transmission: "Automatic",
    price: 25000,
  },
  {
    image: require("../../src/Images/honda-hr-v.webp"),
    name: "Honda HRV",
    location: "Karachi",
    year: 2021,
    mileage: "44,000 km",
    fuelType: "Petrol",
    engine: 1600,
    transmission: "Automatic",
    price: 25000,
  }
  // Add more car ads data...
];

const BuyCar = () => {
  return (
    <Container  sx={{marginTop:'50px',marginBottom:'500px'}}>
      <Typography variant="h4" color={"#9D1515"}><b>Used cars for sale in Pakistan</b></Typography>
      <Container maxWidth="md" sx={{marginTop:'50px'}}>
      <CarAdsGrid carAds={carAdsData} />
      </Container>
    </Container>
  );
};

export default BuyCar;
