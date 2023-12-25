import React, { useState, useEffect } from "react";
import CarAdsGrid from "./CarAdsGrid";
import SearchFilters from "./searchFilters";
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
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5278/vehicles")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);
  return (
    <Container sx={{ display: "flex", flexDirection: "row", marginTop: "50px", marginBottom: "500px" }}>
      <SearchFilters />
      <Container maxWidth="md" sx={{  marginLeft: '20px' }}>
        <Typography variant="h4" color={"#9D1515"}>
          <b>Used cars for sale in Pakistan</b>
        </Typography>
        <Container maxWidth="md" sx={{  marginTop:"20px" }}>
        <CarAdsGrid carAds={vehicles} />
        </Container>

      </Container>
      
    </Container>
  );
};

export default BuyCar;
