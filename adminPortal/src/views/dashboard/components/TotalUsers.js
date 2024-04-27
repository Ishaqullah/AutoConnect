import React,{useEffect,useState} from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios'
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowUpRight,IconUserPlus } from '@tabler/icons';

import DashboardCard from '../../../components/shared/DashboardCard';

const TotalUsers = () => {
  const [count, setCount] = useState({ numberOfBuyers: 0});
  useEffect(() => {
    axios
      .get('http://localhost:5278/users/counts')
      .then((response) => setCount(response.data))
      .catch((error) => console.error('Error fetching number of buyers and sellers:', error));
  }, []);
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#42A432';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Total Users"
      action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconUserPlus width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
         {count.numberOfBuyers}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowUpRight width={20} color="#E6FFFA" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last year
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default TotalUsers;
