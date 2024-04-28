import React from 'react';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Feedback = () => {
  return (
    <PageContainer title="Feedback" description="this is Feedback">

      <DashboardCard title="Feedback" marginTop="80px">
        
      </DashboardCard>
    </PageContainer>
  );
};

export default Feedback;
