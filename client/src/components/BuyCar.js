import React, { useState, useEffect } from "react";
import CarAdsGrid from "./CarAdsGrid";
import SearchFilters from "./searchFilters";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const BuyCar = ({ onValueChange }) => {
  const [vehicles, setVehicles] = useState([]);
  const { id } = useParams();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    onValueChange(id);
  }, [id, onValueChange]);
  useEffect(() => {
    axios
      .get("http://localhost:5278/vehicles")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);
  // console.log(vehicles);

  const handleSearch = (selectedKeyword) => {
    const data = vehicles.filter((val) => {
      if (selectedKeyword == "") {
        return val;
      } else if (
        val.make.toLowerCase().includes(selectedKeyword.toLowerCase()) ||
        val.model.toLowerCase().includes(selectedKeyword.toLowerCase()) ||
        val.variant.toLowerCase().includes(selectedKeyword.toLowerCase()) ||
        val.vehicleModelYear.toLowerCase().includes(selectedKeyword.toLowerCase()) ||
         
        val.vehicleCity.toLowerCase().includes(selectedKeyword.toLowerCase())
      ) {
        return val;
      }
    });
    setFilteredData(data);
  };

  const handleRangeSearch = (from,to) =>{
    console.log(from,to)
    const data =vehicles.filter((val)=>{
      if (from==='' && to==='')
      {
        return val;
      }
      else if((val.price >= from && val.price<= to)|| (val.mileage >= from && val.mileage <= to))
      {
        
        return val;
      }
      
    });
    setFilteredData(data);  
  }

  const handleRegSearch = (regCity)=>{
    console.log(regCity);
    const data=vehicles.filter ((val)=>{
      if(regCity == "")
      {
        return val;
      }
      else if(val.vehicleRegistrationCity.toLowerCase().includes(regCity.toLowerCase()))
      {
        return val;
      }
      
    })
    setFilteredData(data);
  }
  console.log(vehicles);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "50px",
        marginBottom: "500px",
        minWidth: "500px",
      }}
    >
      <SearchFilters onSearch={handleSearch} onRangeSearch={handleRangeSearch} onRegSearch={handleRegSearch}/>
      <Container maxWidth="md" sx={{ marginLeft: "20px" }}>
        <Typography variant="h4" color={"#9D1515"}>
          <b>Used cars for sale in Pakistan</b>
        </Typography>
        <Container maxWidth="md" sx={{ marginTop: "20px" }}>
          <CarAdsGrid
            carAds={filteredData === undefined ? vehicles : filteredData}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default BuyCar;
