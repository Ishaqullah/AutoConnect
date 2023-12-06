import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link,useNavigate, useParams } from "react-router-dom";
import Image from "mui-image";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { RiAdvertisementFill } from "react-icons/ri";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const Navbar = ({id}) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // const navigate=useNavigate();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const handleLoginOpen = () => {
    setOpenLogin(true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const handleSignupOpen = () => {
    setOpenSignup(true);
  };

  const handleSignupClose = () => {
    setOpenSignup(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    
    window.localStorage.removeItem("isLoggedIn");
    // Perform additional logout operations as needed
  };

  const renderAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <div>
          <IconButton onClick={handleMenuOpen}>
            <Avatar src="Images/1.png" alt="User" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
          >
            <Link style={{textDecoration:'none',color:'inherit'}} to={`/UpdateProfileForm/User/${id}`}><MenuItem>
              <IconButton>
                <PersonIcon />
              </IconButton>
              My Profile
            </MenuItem></Link>
            <Link style={{textDecoration:'none',color:'inherit'}} to={`/MyAds/User/${id}`}><MenuItem>
              <IconButton>
                <RiAdvertisementFill />
              </IconButton>
              My Ads
            </MenuItem></Link>
            <Link style={{textDecoration:'none',color:'inherit'}}  to={`/sellCar/User/${id}`}><MenuItem>
              <IconButton>
                <PostAddIcon />
              </IconButton>
              Post An Ad
            </MenuItem></Link>
            <Link to="/" style={{textDecoration:'none',color:'inherit'}}  > <MenuItem onClick={handleLogout}>
              <IconButton>
                <ExitToAppIcon />
              </IconButton>
              Sign Out
            </MenuItem></Link>
          </Menu>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            onClick={handleSignupOpen}
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
          <SignUpModal open={openSignup} handleClose={handleSignupClose} />
          <Button
            color="secondary"
            onClick={handleLoginOpen}
            sx={{
              bgcolor: "primary.main",
              color: "common.white",
              marginLeft: "15px",
              "&:hover": { backgroundColor: "primary.main" },
            }}
          >
            <b>Login</b>
          </Button>
          <LoginModal open={openLogin} handleClose={handleLoginClose} />
        </div>
      );
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "common.white" }}>
      <Toolbar>
        <Image
          src={"Images/steering-wheel.png"}
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
          <Link to="/">
            <Button color="secondary">
              <b>Home</b>
            </Button>
          </Link>
          <Link to="/">
            <Button color="secondary">
              <b>About Us</b>
            </Button>
          </Link>
          <Link to="/">
            <Button color="secondary">
              <b>Used Cars</b>
            </Button>
          </Link>
          <Link to="/">
            <Button color="secondary">
              <b>Contact</b>
            </Button>
          </Link>
        </div>
        {renderAuthButtons()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
