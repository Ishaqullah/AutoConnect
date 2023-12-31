import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Carousel } from "react-responsive-carousel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PhoneIcon from "@mui/icons-material/Phone";
import ConstructionIcon from "@mui/icons-material/Construction";
import ChatIcon from "@mui/icons-material/Chat";
import { resolvePath, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
const AdDetailPage = ({onValueChange}) => {
  const { advertiseId, id } = useParams();
  
  useEffect(() => {
    onValueChange(id,advertiseId);
  }, [id, onValueChange]);
  const [adDetails, setAdDetails] = useState("");
  const settings = {
    showArrows: false,
    showStatus: false,
    showIndicators: true,
    infiniteLoop: true,
    autoPlay: true, // Enable autoplay
    stopOnHover: true,
    interval: 2000, // Set the autoplay interval in milliseconds
    transitionTime: 500, // Set the transition time in milliseconds
    dynamicHeight: false,
    // labels:{leftArrow: 'previous slide / item', rightArrow: 'next slide / item'}
    showThumbs: false,
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const BuyerId = {
    id:id
  };
  const handleSave = async () => {
    // setIsSaved(true);
    try {
      const response = await axios.post(
        `http://localhost:5278/advertises/savedAds/${advertiseId}`,
         BuyerId
      );

      // Check the response or update the UI based on your API response
      if (response.status === 200) {
        setIsSaved(true);
        console.log("Ad saved successfully!");
      } else {
        console.error("Error saving ad:", response.data);
      }
    } catch (error) {
      console.error("Error saving ad:", error);
    }
  };

  const handleUnsave = () => {
    axios.delete(`http://localhost:5278/advertises/user/${id}/adId/${advertiseId}`);
    setIsSaved(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5278/advertises/adDetails/${advertiseId}`
        );
        setAdDetails(response.data);
      } catch (error) {
        console.log("Error fetching ad", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, [advertiseId]);


  useEffect(()=>{
    const fetchIsSaved = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5278/advertises/isSavedAd/${advertiseId}`
        );
        if(response.data==id){
          setIsSaved(true);
        }
        else{
          setIsSaved(false);
        }
      } catch (error) {
        console.log("Error fetching ad", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    fetchIsSaved();
  },[advertiseId]);


  const imageUrls = adDetails.vehicleImages
    ? adDetails.vehicleImages.split(", ")
    : [];
  console.log(adDetails);
  if (isLoading) {
    return (
      <Container
        sx={{
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={9} md={9}>
        <Card
          sx={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}
        >
          <Carousel {...settings}>
            {imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Ad Image ${index}`}
                style={{
                  height: "400px",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            ))}
          </Carousel>
          <CardContent>
            <Typography variant="h5" component="div">
              Ad Details
            </Typography>
            {id !== undefined ? (
              
                <Button onClick={!isSaved ? handleSave : handleUnsave}>
                  {isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Button>
              
            ) : null}
          </CardContent>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <CalendarTodayIcon fontSize="large" />
                <Typography variant="subtitle1">
                  {adDetails.vehicleModelYear}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <SpeedIcon fontSize="large" />
                <Typography variant="subtitle1">{adDetails.mileage}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <ConstructionIcon fontSize="large" />
                <Typography variant="subtitle1">
                  {adDetails.assembly}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <DriveEtaIcon fontSize="large" />
                <Typography variant="subtitle1">
                  {adDetails.bodyType}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Registered In
                  </TableCell>
                  <TableCell align="right">
                    {adDetails.vehicleRegistrationCity}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Color
                  </TableCell>
                  <TableCell align="right">{adDetails.colour}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Assembly
                  </TableCell>
                  <TableCell align="right">{adDetails.assembly}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Engine Capacity
                  </TableCell>
                  <TableCell align="right">
                    {adDetails.engineCapacity}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Body Type
                  </TableCell>
                  <TableCell align="right">{adDetails.bodyType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Model
                  </TableCell>
                  <TableCell align="right">
                    {adDetails.vehicleModelYear}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Ad Ref #
                  </TableCell>
                  <TableCell align="right">{adDetails.advertiseID}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <CardContent>
            <Typography variant="h5" sx={{ marginTop: "20px" }}>
              Seller Comments
            </Typography>
            <Typography variant="body-1" sx={{ marginTop: "15px" }}>
              {adDetails.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card
          sx={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                marginTop: "10px",
                color: "primary.dark",
              }}
            >
              Price
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: "bold",
                marginTop: "10px",
                color: "success.main",
              }}
            >
              {adDetails.price} Rs
            </Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={<PhoneIcon />}
              fullWidth
              sx={{ marginTop: "20px" }}
            >
              Contact Seller
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ChatIcon />}
              fullWidth
              sx={{ marginTop: "10px" }}
            >
              Send Message
            </Button>
          </CardContent>
        </Card>

        <Card
          sx={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Seller Details
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
              <b>Name:</b> {adDetails.seller.userName}
            </Typography>
            <Typography variant="subtitle1">
              <b>Contact:</b> {adDetails.seller.userPhone}
            </Typography>

            <Typography variant="subtitle1">
              <b>Email:</b> {adDetails.seller.userEmail}
            </Typography>

            <Typography variant="subtitle1">
              <b>Address:</b> {adDetails.seller.userAddress}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdDetailPage;
