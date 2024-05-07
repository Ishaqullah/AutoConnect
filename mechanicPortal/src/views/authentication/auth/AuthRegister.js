import React,{useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate ,useParams} from "react-router-dom";
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const navigate= useNavigate()
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
      });
      const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await axios.post(
            "http://localhost:5278/mechanics/signup",
            formData
          );
          console.log("Server response:", response.data);
          navigate(`/dashboard/${response.data.mechanicId}`);
          window.localStorage.setItem("isLoggedIn",true);
        } catch (error) {
          console.error("Error submitting form:", error.message);
          alert(error.message)
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
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField id="name" name="name" variant="outlined" fullWidth value={formData.name} onChange={handleChange}/>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField id="email" name="email" variant="outlined" fullWidth value={formData.email}  onChange={handleChange}/>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField id="password" name="password" variant="outlined" fullWidth value={formData.password}  onChange={handleChange} />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          to="/"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
