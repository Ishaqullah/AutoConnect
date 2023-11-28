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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for handling login (e.g., API call, authentication, etc.)
    // For demonstration, you can add your own logic here.
    console.log('Login clicked with:', { email, password });
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
