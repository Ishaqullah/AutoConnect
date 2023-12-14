import React from "react";
import CarAdsGrid from "./CarAdsGrid";
import SearchFilters from "./searchFilters";
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
  },
  // Add more car ads data...
];

const BuyCar = () => {
  return (
    <Container sx={{ display: "flex", flexDirection: "row", marginTop: "50px", marginBottom: "500px" }}>
      <SearchFilters />
      <Container maxWidth="md" sx={{  marginLeft: '20px' }}>
        <Typography variant="h4" color={"#9D1515"}>
          <b>Used cars for sale in Pakistan</b>
        </Typography>
        <Container maxWidth="md" sx={{  marginTop:"20px" }}>
        <CarAdsGrid carAds={carAdsData} />
        </Container>

      </Container>
    </Container>
  );
};

export default BuyCar;
