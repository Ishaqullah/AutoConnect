import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here (e.g., send data to server, show success message)
    console.log("Form Submitted:", formData);
    // Reset form fields after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container sx={{ paddingTop: "20px" }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactForm;
