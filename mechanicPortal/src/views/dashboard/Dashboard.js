import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import Profile from './components/Profile';
import ListedAds from './components/ListedAds';
import AverageRating from './components/AverageRating';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Profile />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12}>
                <YearlyBreakup />
              </Grid> */}
              <Grid item xs={12}>
                <AverageRating />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid> */}
          <Grid item xs={12} lg={12}>
            <ListedAds />
          </Grid>
          {/* <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
