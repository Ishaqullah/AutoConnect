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

import { useNavigate } from "react-router-dom";
import axios from 'axios';
const SignUpModal = ({ open, handleClose }) => {
  const navigate= useNavigate()
  const [formData, setFormData]=useState({
    email:'',
    password:'',
  })
  const [confirmPass, setConfirmPass]=useState('')
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password!=confirmPass)
    {
      console.error("Passwords donot match!")
      alert("Passwords donot match!")
      return
    }
    try {
      const response = await axios.post(
        "http://localhost:5278/users/signupUsers",
        formData
      );
      console.log("Server response:", response.data);
      navigate(`/User/${response.data.userId}`);
      handleClose(); 
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
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            name="confirmPass"
            fullWidth
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
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
  );
};

export default SignUpModal;
