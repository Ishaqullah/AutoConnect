import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Carousel } from '@mui/material';
import { Card, CardContent, Typography, Box } from "@mui/material";

 const Header = () => {



  return (
   
  <Container maxWidth="sm">
    <Card
      sx={{
        width: '100%',
        marginTop:'50px',
        position: 'relative',

      }}
    >
      <CardContent>
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
      </CardContent>
    </Card>
    <Card
      sx={{
        width: '100%',
        backgroundColor: 'black',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      
    </Card>
  </Container>

  );
};

export default Header;