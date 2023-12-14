import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Container sx={{ paddingTop: "20px" }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        About AutoConnect
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" gutterBottom>
              At AutoConnect, we envision revolutionizing the automotive industry by providing a seamless platform for buying and selling vehicles. Our mission is to connect automotive enthusiasts with their dream vehicles while ensuring a hassle-free experience.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Our Team
            </Typography>
            <Typography variant="body1" gutterBottom>
              Meet our passionate team of experts dedicated to enhancing your car shopping experience. With diverse backgrounds and skills, we're committed to delivering the best solutions to meet your automotive needs.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Container sx={{ paddingTop: "40px" }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Our Values
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Integrity | Customer Satisfaction | Innovation | Community Engagement
        </Typography>
      </Container>
      <Container sx={{ paddingTop: "40px" }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Have questions or suggestions? We'd love to hear from you! Contact our team at support@autoconnect.com.
        </Typography>
      </Container>
    </Container>
  );
};

export default AboutUsPage;
