import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router';

const BuyersVsSellers = () => {
  const [count, setCount] = useState({ numberOfBuyers: 0, numberOfSellers: 0 });
  useEffect(() => {
    axios
      .get('http://localhost:5278/users/counts')
      .then((response) => setCount(response.data))
      .catch((error) => console.error('Error fetching number of buyers and sellers:', error));
  }, []);

  const id = useParams();
  console.log(id);

  // const [username, setUsername] = useState(null)
  // useEffect(()=>{
  //   axios
  //     .get('http://localhost:5278/mechanic/${id}')
  //     .then((response) => setUsername(response.data))
  //     .catch((error) => console.error('Error fetching mechanic name: ',error))
  // },[username])

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart options
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '15%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2'],
      },
    },
    xaxis: {
      categories: ['Buyers', 'Sellers'], // Empty category to create space between bars
    },
    yaxis: {
      tickAmount: 4,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  };
  
  // chart data
  const series = [
    {
      name: ['Users'],
      data: [count.numberOfBuyers, count.numberOfSellers], // Update with actual number of buyers
    },
  ];

  return (
    <DashboardCard title="">
      <Chart options={options} series={series} type="bar" height="370px" />
    </DashboardCard>
  );
};

export default BuyersVsSellers;
