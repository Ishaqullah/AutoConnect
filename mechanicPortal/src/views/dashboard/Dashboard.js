import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import BuyersVsSellers from './components/BuyersVsSellers';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ListedAds from './components/ListedAds';
import Blog from './components/Blog';
import TotalUsers from './components/TotalUsers';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <BuyersVsSellers />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12}>
                <YearlyBreakup />
              </Grid> */}
              <Grid item xs={12}>
                <TotalUsers />
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
