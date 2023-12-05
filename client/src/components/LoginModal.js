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

const LoginModal = ({ open, handleClose }) => {
  const [formData,setFormData]= useState({
    email:'',
    password:'',
  })

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5278/users/loginUsers",
        formData
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    handleClose(); // Close the modal after login (You may handle this differently)
    window.localStorage.setItem("isLoggedIn",true);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </DialogActions>
      <DialogContent>
        <Typography variant="body2" align="center">
          Don't have an account? <br />
          <Button color="primary">Sign Up</Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
