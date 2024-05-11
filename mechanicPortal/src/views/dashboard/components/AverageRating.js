import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Avatar, Fab, Stack, Rating } from '@mui/material';
import { IconStarHalf, IconTrendingUp } from '@tabler/icons';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useParams } from 'react-router';

const AverageRating = () => {
  const [mechanic, setMechanic] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMechanic = async () => {
      try {
        const response = await axios.get(`http://localhost:5278/mechanics/${id}`);
        setMechanic(response.data);
      } catch (error) {
        console.error('Error fetching mechanic:', error);
      }
    };

    fetchMechanic();
  }, [id]);

  const secondarylight = '#f5fcff';
  const errorlight = '#42A432';

  return (
    <DashboardCard
      title="Average Rating"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <StarHalfIcon width={24} />
        </Fab>
      }
    >
      {mechanic && (
        <>
          <Typography variant="h3" fontWeight="700" mt="-20px">
            {mechanic.averageRating}
          </Typography>
          <Stack direction="column" spacing={1} my={1}>
          <Rating name="half-rating-read" defaultValue={mechanic.averageRating} precision={0.5} readOnly />
              
              <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                <IconTrendingUp width={20} color="#E6FFFA" />
              </Avatar>
           
           
          </Stack>
        </>
      )}
    </DashboardCard>
  );
};

export default AverageRating;
