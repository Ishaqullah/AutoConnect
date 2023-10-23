import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Image from "mui-image";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "common.white" }}>
      <Toolbar>
        <Image
          src={require("../../src/Images/steering-wheel.png")}
          width={25}
          height={25}
          alt="Steering Wheel"
        />
        <Typography variant="h5" sx={{ color: "common.black" }}>
          <b>Auto</b>
        </Typography>
        <Typography variant="h5" sx={{ color: "secondary.main" }}>
          <b>Connect</b>
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <div>
          <Link to="/"><Button color="secondary">
            <b>Home</b>
          </Button></Link>
          <Link to="/"><Button color="secondary">
            <b>About Us</b>
          </Button></Link>
          <Link to="/"><Button color="secondary">
            <b>Used Cars</b>
          </Button></Link>
          <Link to="/"><Button color="secondary">
            <b>Contact</b>
          </Button></Link>
          <Button
            color="secondary"
            sx={{
              bgcolor: "primary.main",
              color: "common.white",
              marginLeft: "15px",
              "&:hover": { backgroundColor: "primary.main" },
            }}
          >
            <b>Sign Up</b>
          </Button>
          <Button
            color="secondary"
            sx={{
              bgcolor: "primary.main",
              color: "common.white",
              marginLeft: "15px",
              "&:hover": { backgroundColor: "primary.main" },
            }}
          >
            <b>Login</b>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
