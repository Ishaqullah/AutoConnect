import React from 'react';
import { Grid } from '@mui/material';
import UserAds from './UserAds';

const UserAdGrid = ({ carAds }) => {
  return (
    <Grid container spacing={3}>
      {carAds.map((car) => (
        <UserAds key={car.vehicleID} car={car} />
      ))}
    </Grid>
  );
};

export default UserAdGrid;
