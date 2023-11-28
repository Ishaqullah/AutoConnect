import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Divider,
  Card,
  CardContent,
  Container
} from '@mui/material';

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    country: '',
    city: '',
    username: '',
    email: '',
    mobileNumber: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddNumber = () => {
    // Logic to add another mobile number field
    // Implement your functionality here
  };

  const handleSaveChanges = () => {
    // Logic to save changes to user profile
    // Implement your save functionality here
    console.log('Form data:', formData);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "50px", marginBottom: "200px" }}>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          My Profile
        </Typography>
        <Divider />
        <Box my={2} />
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField
              name="Dob"
              label="Date Of Birth"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
          <TextField
              name="country"
              label="Country"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
          <TextField
              name="city"
              label="City"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} >
          <TextField
              name="username"
              label="Username"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} >
          <TextField
              name="email"
              label="Email Address"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>
          {/* Other fields (Date of Birth, Country, City, Username, Email, Mobile Number) can follow similar Grid structure */}
          <Grid item xs={12}>
            <Divider />
            <Box my={2} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </Container>
  );
};

export default UpdateProfileForm;
