import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CardMedia,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProfileForm = () => {
  const [mechanic, setMechanic] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const { id } = useParams();

  useEffect(() => {
    fetchMechanicDetails();
  }, []);

  const fetchMechanicDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5278/mechanics/${id}`);
      setMechanic(response.data);
    } catch (error) {
      console.error('Error fetching mechanic details:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMechanic({
      ...mechanic,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5278/mechanics/updateMechanic/${id}`, mechanic);
      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error('Error updating mechanic profile:', error);
    }
  };

  return (
    <PageContainer title="Update your profile" description="Update your mechanic profile">
      <DashboardCard title="Update Your Profile" marginTop="80px">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              
              name="name"
              value={mechanic.name}
              onChange={handleChange}
              margin="normal"
              
            />
            <TextField
              fullWidth
             
              name="email"
              value={mechanic.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              
              name="password"
              value={mechanic.password}
              onChange={handleChange}
              margin="normal"
              type="password"
            />
            <TextField
              fullWidth
              label={!mechanic.phone && "Phone"}
              name="phone"
              value={mechanic.phone}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label={!mechanic.address && "Address"}
              name="address"
              value={mechanic.address}
              onChange={handleChange}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update Profile
            </Button>
          </Box>
          <CardMedia
            component="img"
            image="/update/G03.jpg"
            alt="Mechanic Image"
            sx={{ marginRight:"150px",width: 250 }}
          />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default UpdateProfileForm;
