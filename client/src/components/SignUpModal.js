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

const SignUpModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Logic for handling signup (e.g., API call, validation, etc.)
    // For demonstration, you can add your own logic here.
    console.log('Sign Up clicked with:', { email, password, confirmPassword });
    handleClose(); // Close the modal after signup (You may handle this differently)
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
        <Typography variant="h6" align="center" gutterBottom>
          Let's Get You Started
        </Typography>
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
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSignUp} variant="contained" color="primary" fullWidth>
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
