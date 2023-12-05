import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material'; // Import the Close icon
import axios from 'axios';
const SignUpModal = ({ open, handleClose }) => {
  const [formData, setFormData]=useState({
    email:'',
    password:'',
  })
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5278/users/signupUsers",
        formData
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    handleClose(); 
    window.localStorage.setItem("isLoggedIn",true);
  };
  const handleChange =(event)=>{
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" align="center" gutterBottom>
            Let's Get You Started
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </DialogActions>
        <DialogContent>
          <Typography variant="body2" align="center">
            Already have an account? <br />
            <Button color="primary">Sign In</Button>
          </Typography>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default SignUpModal;
