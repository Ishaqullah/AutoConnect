import React, { useState, useEffect } from "react";
import CarAdsGrid from "./CarAdsGrid";
import SearchFilters from "./searchFilters";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const BuyCar = ({onValueChange}) => {
  const [vehicles, setVehicles] = useState([]);
  const {id} = useParams()
 
  useEffect(() => {
    onValueChange(id);
  }, [id, onValueChange]);
  useEffect(() => {
    axios
      .get("http://localhost:5278/vehicles")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);


  return (
    <Container sx={{ display: "flex", flexDirection: "row", marginTop: "50px", marginBottom: "500px" ,minWidth:"500px"}}>
      {/* <SearchFilters /> */}
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
