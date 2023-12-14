import React from 'react';
import { Grid } from '@mui/material';
import UserAds from './UserAds';

const UserAdGrid = ({ carAds=[] }) => {
  console.log(carAds)
  return (
    <Grid container spacing={3}>
      {carAds.map((car) => (
        <UserAds key={car.advertiseID} car={car} />
      ))}
    </Grid>
  );
};

export default UserAdGrid;
