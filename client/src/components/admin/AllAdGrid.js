import React from 'react';
import { Grid } from '@mui/material';
import AllAds from './AllAds';

const AllAdGrid = ({ carAds }) => {
  return (
    <Grid container spacing={3}>
      {carAds.map((car) => (
        <AllAds key={car.vehicleID} car={car} />
      ))}
    </Grid>
  );
};

export default AllAdGrid;
