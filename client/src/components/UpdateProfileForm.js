import React, { useState } from "react";
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
  Container,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UpdateProfileForm = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    userAddress: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5278/users/updateUser/${id}`, formData)
      .then((resp) => {
        console.log("User updated successfully:", resp.data);
        navigate(`/User/${id}`);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };


  useEffect(() => {
    axios.get(`http://localhost:5278/users/getUser/${id}`).then((resp) =>
      setFormData({
        userName: resp.data.userName || "",
        userEmail: resp.data.userEmail || "",
        userPassword: resp.data.userPassword || "",
        userPhone: resp.data.userPhone || "",
        userAddress: resp.data.userAddress || "",
      })
    );
  }, [id]);

  console.log(formData);

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
            <Grid item xs={12}>
              <TextField
                name="userName"
                label="Username"
                fullWidth
                value={formData.userName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="userEmail"
                label="Email Address"
                fullWidth
                value={formData.userEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="userPassword"
                label="User Password"
                fullWidth
                value={formData.userPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="userPhone"
                label="User Phone"
                fullWidth
                value={formData.userPhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="userAddress"
                label="User Address"
                fullWidth
                value={formData.userAddress}
                onChange={handleChange}
              />
            </Grid>
            {/* Other fields (Date of Birth, Country, City, Username, Email, Mobile Number) can follow similar Grid structure */}
            <Grid item xs={12}>
              <Divider />
              <Box my={2} />
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdateProfileForm;
