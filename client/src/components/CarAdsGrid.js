import React from 'react';
import { Grid } from '@mui/material';
import CarAd from './CarAd'; // Import the CarAd component

const CarAdsGrid = ({ carAds }) => {
  return (
    <Grid container spacing={3}>
      {carAds.map((car) => (
        <CarAd key={car.vehicleID} car={car} />
      ))}
    </Grid>
  );
};

export default CarAdsGrid;
