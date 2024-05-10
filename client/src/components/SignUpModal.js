import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material"; // Import the Close icon
import LoginModal from "./LoginModal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
const SignUpModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  function isValidEmail(email) {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const [confirmPass, setConfirmPass] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password != confirmPass) {
      toast.warning("Passwords donot match!");
      return;
    } else if (!isValidEmail(formData.email)) {
      toast.error("Please enter valid email");
      return;
    } else if (formData.password.length < 6) {
      toast.error("Please enter a stronger password");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5278/users/signupUsers",
        formData
      );
      console.log("Server response:", response.data);

      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update the user's display name
      await updateProfile(res.user, {
        displayName: formData.name,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: formData.name,
        email: formData.email,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      console.log("Firebase user created:", res.user);
      navigate(`/User/${response.data.userId}`);
      handleClose();
      toast.success("Welcome to AutoConnect");
      window.localStorage.setItem("isLoggedIn", true);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [openLogin, setOpenLogin] = useState(false);

  const handleClick = () => {
    handleClose();
    setOpenLogin(true);
  };
  const handleLoginClose = () => {
    setOpenLogin(false);
  };
  return (
    <>
      {openLogin && (
        <LoginModal open={openLogin} handleClose={handleLoginClose} />
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 0, top: 0 }}
          >
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
            label="Your Name"
            type="text"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
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
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign Up
          </Button>
        </DialogActions>
        <DialogContent>
          <Typography variant="body2" align="center">
            Already have an account? <br />
            <Button color="primary" onClick={handleClick}>
              Sign In
            </Button>
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpModal;
