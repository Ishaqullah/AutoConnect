import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const footer = () => {
  const footerStyles = {
    backgroundColor: "#2E2D31",
    color: "white",
    padding: "20px 0",
  };

  const socialMediaIconsStyles = {
    fontSize: 30,
    marginRight: 10,
  };

  const lineStyles = {
    borderBottom: "1px solid white",
    margin: "10px 0",
  };

  return (
    <Box component="footer" style={footerStyles}>
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Follow Us
        </Typography>
        <Grid container justifyContent="center" alignItems="center">
          <FacebookIcon style={socialMediaIconsStyles} />
          <TwitterIcon style={socialMediaIconsStyles} />
          <LinkedInIcon style={socialMediaIconsStyles} />
        </Grid>
        <div style={lineStyles}></div>
        <Typography variant="body2" align="center">
          &copy; 2003 - 2023 AutoConnect (Pvt) Ltd. - All Rights Reserved.
        </Typography>
        <Typography variant="body2" align="center">
          Terms of Service | Privacy Policy
        </Typography>
        <Typography variant="body2" align="center">
          Reproduction of material from any AutoConnect.com pages without
          permission is strictly prohibited.
        </Typography>
      </Container>
    </Box>
  );
};

export default footer;
