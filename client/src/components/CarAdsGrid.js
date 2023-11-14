import React from 'react';
import { Grid } from '@mui/material';
import CarAd from './CarAd'; // Import the CarAd component

const CarAdsGrid = ({ carAds }) => {
  return (
    <Grid container spacing={3}>
      {carAds.map((car, index) => (
        <CarAd key={index} car={car} />
      ))}
    </Grid>
  );
};

export default CarAdsGrid;
