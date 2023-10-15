import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Image from 'mui-image'


const Navbar = () => {
 

  return (
    <AppBar position="static" sx={{ bgcolor: 'common.white' }}>
      <Toolbar>
      <Image src={require('../../src/Images/steering-wheel.png')} width={25} height={25} alt="Steering Wheel"/>
      <Typography variant="h5" sx={{ color: 'common.black' }} ><b>Auto</b></Typography>
      <Typography variant="h5" sx={{ color: 'secondary.main' }} ><b>Connect</b></Typography>
        <div style={{ flexGrow: 1 }}></div>
        <div>
          <Button color="secondary"  to="/home" >
            <b>Home</b>
          </Button>
          <Button color="secondary"  to="/about-us" >
            <b>About Us</b>
          </Button>
          <Button color="secondary"  to="/used-cars" >
          <b>Used Cars</b>
          </Button>
          <Button color="secondary"  to="/contact" >
          <b>Contact</b>
          </Button>
          <Button color="secondary" sx={{bgcolor:'primary.main' ,color: 'common.white' , marginLeft: '15px','&:hover': { backgroundColor: 'primary.main' }}}>
          <b>Sign Up</b>
          </Button>
          <Button color="secondary"  sx={{bgcolor:'primary.main' ,color: 'common.white' ,marginLeft: '15px', '&:hover': { backgroundColor: 'primary.main'}}}  >
          <b>Login</b>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
