import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import {Alert} from '@mui/material';
const AuthLogin = ({ title, subtitle, subtext }) => {
    const [formData,setFormData]= useState({
        email:'',
        password:'',
      })
      const [error,setError]=useState('');
      const navigate= useNavigate();
      const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(
            "http://localhost:5278/admins/loginAdmin",
            formData
          );
          console.log("Server response:", response.data);
          navigate(`/dashboard/${response.data.adminId}`);
          window.localStorage.setItem("isLoggedIn",true);
          window.localStorage.setItem("adminId",response.data.adminId);
        } catch (error) {
          console.error("Error submitting form:", error.message);
          setError("Invalid username or password");
        }
      };
      const handleChange =(event)=>{
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
  return (
    <>
    {error?(<Alert severity='error'>{error}</Alert>):(<></>)}
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField id="username" name="email" variant="outlined" fullWidth value={formData.email} onChange={handleChange}/>
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField id="password" name="password" type="password" variant="outlined" fullWidth value={formData.password} onChange={handleChange}/>
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber this Device" />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          to="/"
          type="submit"
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
