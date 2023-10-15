import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: 'white',
  },
  link: {
    color: '#9D1515',
  },
  button: {
    color: '#9D1515',
    '&:hover': {
      backgroundColor: 'transparent', // Prevent the button from changing color on hover
    },
  },
}));

const style = {

  backgroundColor : 'white'
};
const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" sx={{ bgcolor: 'common.white' }}>
      <Toolbar>
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
