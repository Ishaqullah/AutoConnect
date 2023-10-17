import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Carousel } from '@mui/material';


 const Header = () => {
//   const items = [
//     {
//       src: '../../src/Images/Vehicle-Inspection.jpg',
//       alt: 'Inspection Image',
//     },
//     {
//       src: '../../src/Images/198643672-row-of-used-cars-rental-or-automobile-sale-services.jpg',
//       alt: 'Cars image'
//     }
//   ]


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container position="relative">
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: 'white',
                position: 'absolute',
                width: 'calc(100% - 143px)',
                height: '310px',
                top: '189px',
                left: '138px',
                display: 'flex',
                flexDirection: 'column', 
                paddingLeft: '5px', 
                overflow: 'hidden', 
                justifyContent: 'space-between'
              }}
            >
              <span style={{ color: '#7B7272', fontSize: '38px', fontWeight: '700', fontFamily: 'Maven-Pro' }}>
                Driving your dreams, One click at a time
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button color="secondary" to="#" variant="contained">
                  <b>Sell Your Car</b>
                </Button>
                <Button color="secondary" to="#" variant="contained">
                  <b>Buy Your Car</b>
                </Button>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: 'black',
                position: 'absolute',
                width: '100%',
                height: '310px',
                top: '189px',
                left: '538px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Header;