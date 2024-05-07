import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Divider,
  Box,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
export const UpdateMechanic = ({ open, handleClose ,id}) => {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    address:'',
    phone:''
  });

  useEffect(() => {
    axios.get(`http://localhost:5278/mechanics/${id}`).then((resp) =>
      setFormData({
        name: resp.data.mechanicName || "",
        email: resp.data.mechanicEmail || "",
        address: resp.data.mechanicAddress|| "",
        phone: resp.data.mechanicPhone || "",
      })
    );
  }, [id]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  


  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:5278/admins/updateMechanic/${id}`,
        formData
      )
      .then((resp) => {
        console.log("Mechanic updated successfully:", resp.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating vehicle:", error);
      });
   
  };

 

  return (
    <Dialog open={open} onClose={handleClose} fullWidth >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 0, top: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="The information can be edited" title="Mechanic Information" />
          <CardContent sx={{ pt: 2, pb: 0,padding:5 }}>
            <Box sx={{ mx: -2 }}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={formData.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    required
                    value={formData.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    onChange={handleChange}
                    required
                    value={formData.address}
                  />
                </Grid>
                

                <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    required
                    value={formData.phone}
                  />
                </Grid>
                
              
              </Grid>
            </Box>
          </CardContent>

          <Divider sx={{ marginBottom: "5px", marginTop: "5px" }} />

          <CardActions sx={{ justifyContent: "flex-end", px: 3, pb: 3 }}>
            <Button type="submit" variant="contained">
              Update Mechanic
            </Button>
          </CardActions>
        </Card>
      </form>
    </Dialog>
  );
};
