import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';
import axios from 'axios';
import CarAdsGrid from './CarAdsGrid';
import{Box,Typography} from "@mui/material";
const SimilarAds = ({similarAds}) => {
  const [vehicles,setVehicles]=useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Array to store all vehicle data
        const allVehicles = [];
  
        // Iterate over each item in similarAds array
        for (const ad of similarAds) {
          // Call the API for each item
          const response = await axios.get(
            `http://localhost:5278/advertises/getVehicles/${ad.advertise_id}`
          );
          // Push the data from API response to allVehicles array
          allVehicles.push(response.data);
        }
  
        // Set the vehicles state with the array containing all vehicle data
        setVehicles(allVehicles);
      } catch (error) {
        console.log("Error fetching vehicles", error);
      }
    };
  
    // Call fetchVehicles function
    fetchVehicles();
  }, [similarAds]);
  
  console.log(vehicles,similarAds);
  return (
    <Box sx={{ marginTop: "100px"}}>
      <Typography variant="h5" sx={{ color: "primary.main" ,marginBottom:"20px"}} >
        <b>Similar Ads For You</b>
      </Typography>
      <CarAdsGrid
            carAds={vehicles}
          />
    </Box>
  )
}

export default SimilarAds