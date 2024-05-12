import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router';
import { Fab, Card, CardContent, Typography, Button } from '@mui/material';
import { IconUser } from '@tabler/icons';
import '../utils/Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
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

  return (
    <DashboardCard title="Profile" action={
      <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
        <IconUser width={24} />
      </Fab>
    }>
      {mechanic && (
        <Card variant="outlined" className="profile-card">
          <CardContent>
            <Typography variant="h5" component="div" className="profile-field" gutterBottom>
              Name: {mechanic.name.charAt(0).toUpperCase() + mechanic.name.slice(1)}
            </Typography>
            <Typography variant="body1" component="div" className="profile-field" gutterBottom>
              Email: {mechanic.email}
            </Typography>
            {mechanic.phone === null && mechanic.address === null ? (
              <>
                <Typography variant="body1" component="div" gutterBottom>
                  Update your profile to get in touch with buyers
                </Typography>
                <Button component={Link} to={`/mechanic/profile/${id}`} variant="contained" color="primary">
                  Update Profile
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1" component="div" className="profile-field" gutterBottom>
                  Phone: {mechanic.phone}
                </Typography>
                <Typography variant="body1" component="div" className="profile-field">
                  Address: {mechanic.address}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </DashboardCard>
  );
};

export default Profile;
