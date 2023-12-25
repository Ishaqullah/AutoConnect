import React from 'react';
import { Grid } from '@mui/material';
import SavedAds from './SavedAds';

const SavedAdsGrid = ({ carAds=[] }) => {
  console.log(carAds)
  return (
    <Grid container spacing={3}>
      {carAds.map((car) => (
        <SavedAds key={car.advertiseID} car={car} />
      ))}
    </Grid>
    
  );
};

export default SavedAdsGrid;
