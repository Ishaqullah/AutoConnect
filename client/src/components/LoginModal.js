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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpModal from './SignUpModal';
const LoginModal = ({ open, handleClose }) => {
  const [openSignup, setOpenSignup] = useState(false);
  const [formData,setFormData]= useState({
    email:'',
    password:'',
  })
  const navigate= useNavigate();
  const handleSignupOpen = () => {
    setOpenSignup(true);
  };

  const handleSignupClose = () => {
    setOpenSignup(false);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5278/users/loginUsers",
        formData
      );
      console.log("Server response:", response.data);
      navigate(`/User/${response.data.userId}`);
      handleClose();
      window.localStorage.setItem("isLoggedIn",true);
      window.localStorage.setItem("userId",response.data.userId);
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
 const handleClick= ()=>{
  handleClose();
  setOpenSignup(true);
  
 }
   return (
    <>
    {openSignup && (<SignUpModal open={openSignup} handleClose={handleSignupClose} />)}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </DialogActions>
      <DialogContent>
        <Typography variant="body2" align="center">
          Don't have an account? <br />
          <Button color="primary" onClick={handleClick}>Sign Up</Button>
        </Typography>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default LoginModal;
