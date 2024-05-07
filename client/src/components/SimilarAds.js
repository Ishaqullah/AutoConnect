import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';
import axios from 'axios';
import CarAdsGrid from './CarAdsGrid';

const SimilarAds = ({similarAds}) => {
  const [vehicles,setVehicles]=useState([]);

 useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5278/advertises/getVehicles/${similarAds[0].advertise_id}`
        );
        setVehicles(response.data);
      } catch (error) {
        console.log("Error fetching vehicle", error);
      } 
    };

    fetchVehicle();
  }, []);
  console.log(vehicles);
  return (
    <div>
      {/* <CarAdsGrid
            carAds={vehicles}
          /> */}
    </div>
  )
}

export default SimilarAds