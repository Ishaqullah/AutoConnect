import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
const AdDetailPage = () => {
  const adDetails = {
    adPics: ["Images/BMW.jpg", "Images/Audi.jpg", "Images/honda-br-v.webp"],
    mileage: '20,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    registeredIn: 'Karachi',
    color: 'Graphite Grey',
    assembly: 'Local',
    engineCapacity: '800 cc',
    bodyType: 'Hatchback',
    lastUpdated: 'Dec 04, 2023',
    adRef: '#8163587',
    sellerComments: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    price: '$12,000',
    sellerDetails: {
      name: 'John Doe',
      contactInfo: '03331234567',
      email:'jhon.doe@example.com',
      addres:'House#B87,Sector 11A,North Karachi',
    },
  };

  return (
    <Grid container spacing={3} >
    <Grid item xs={9} md={9}>

      <Card sx={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <Carousel animation="slide">
          {adDetails.adPics.map((pic, index) => (
            <img
              key={index}
              src={pic}
              alt={`Ad Image ${index}`}
              style={{
                height: '400px',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
              }}
            />
          ))}
        </Carousel>
        <CardContent>
          <Typography variant="h5" component="div">
            Ad Details
          </Typography>
        </CardContent>
        <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <CalendarTodayIcon fontSize="large" />
            <Typography variant="subtitle1">{adDetails.lastUpdated}</Typography>
            
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <SpeedIcon fontSize="large" />
            <Typography variant="subtitle1">{adDetails.mileage}</Typography>
            
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <LocalGasStationIcon fontSize="large" />
            <Typography variant="subtitle1">{adDetails.fuelType}</Typography>
            
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <DriveEtaIcon fontSize="large" />
            <Typography variant="subtitle1">{adDetails.transmission}</Typography>
            
          </Box>
        </Grid>
      </Grid>

        
          <TableContainer component={Paper} sx={{marginTop:"50px"}}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Registered In</TableCell>
                  <TableCell align="right">{adDetails.registeredIn}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Color</TableCell>
                  <TableCell align="right">{adDetails.color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Assembly</TableCell>
                  <TableCell align="right">{adDetails.assembly}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Engine Capacity</TableCell>
                  <TableCell align="right">{adDetails.engineCapacity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Body Type</TableCell>
                  <TableCell align="right">{adDetails.bodyType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Last Updated</TableCell>
                  <TableCell align="right">{adDetails.lastUpdated}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Ad Ref #</TableCell>
                  <TableCell align="right">{adDetails.adRef}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <CardContent>
        <Typography variant="h5" sx={{ marginTop: '20px' }}>
          Seller Comments
        </Typography>
        <Typography variant="body-1"  sx={{ marginTop: '15px' }}>
        {adDetails.sellerComments}
        </Typography>
      </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} md={3}>
        <Card sx={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginTop: '10px',color:"primary.dark" }}>
              Price
            </Typography>
            <Typography variant="h4" component="div"  sx={{ fontWeight: 'bold', marginTop: '10px',color:"success.main" }}>
              {adDetails.price}
            </Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={<PhoneIcon />} 
              fullWidth
              sx={{ marginTop: '20px' }}
            >
              Contact Seller
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ChatIcon />} 
              fullWidth
              sx={{ marginTop: '10px' }}
            >
              Send Message
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold'}}>
              Seller Details
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>
              <b>Name:</b> {adDetails.sellerDetails.name}
            </Typography>
            <Typography variant="subtitle1">
            <b>Contact:</b>  {adDetails.sellerDetails.contactInfo}
            </Typography>

            <Typography variant="subtitle1">
            <b>Email:</b>  {adDetails.sellerDetails.email}
            </Typography>

            <Typography variant="subtitle1">
            <b>Address:</b> {adDetails.sellerDetails.addres}
            </Typography>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdDetailPage;
