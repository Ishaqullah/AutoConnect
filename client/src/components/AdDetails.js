import React, { useCallback, useEffect, useState } from "react";
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
import VideocamIcon from "@mui/icons-material/Videocam";
import ConstructionIcon from "@mui/icons-material/Construction";
import ChatIcon from "@mui/icons-material/Chat";
import { resolvePath, useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import SimilarAds from "./SimilarAds";
import { supabase } from "../lib/supabase";
import Loader from "./loader";
import { toast } from "react-toastify";
import ChatBot from "./ChatBot";
const AdDetailPage = ({ onValueChange }) => {
  const { advertiseId, id } = useParams();
  const [showCarAd, setShowCarAd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onValueChange(id, advertiseId);
  }, [id, onValueChange]);
  const [advertise, setAdvertise] = useState(null);
  const [similarAds, setSimilarAds] = useState(null);
  const [adDetails, setAdDetails] = useState("");
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
  });
  const {vehicleImages, ...adDetailsWithoutImages}=adDetails;
  const [isLoading, setIsLoading] = useState(true);
  const [isBotLoading, setIsBotLoading] = useState(false);
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

  const [isSaved, setIsSaved] = useState(false);
  const BuyerId = {
    id: id,
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
        toast.success("Ad saved successfully!");
      } else {
        toast.error("Error saving ad:", response.data);
      }
    } catch (error) {
      console.error("Error saving ad:", error);
    }
  };
  const handleUnsave = () => {
    axios.delete(
      `http://localhost:5278/advertises/user/${id}/adId/${advertiseId}`

    );

    setIsSaved(false);
    toast.success("Ad removed from saved ads!");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if(id!=undefined){
        axios.get(`http://localhost:5278/users/getUser/${id}`).then((resp) =>
        setUserData({
          userID:resp.data.userID || "",
          userName: resp.data.userName || "",
          userEmail: resp.data.userEmail || "",
          userPhone: resp.data.userPhone || "",
          userAddress: resp.data.userAddress || "",
        })
      );}
        const response = await axios.get(
          `http://localhost:5278/advertises/adDetails/${advertiseId}`
        );
        setAdDetails(response.data);
        try {
          const response = await axios.get(
            `http://localhost:5278/advertises/isSavedAd/${advertiseId}`
          );
          if (response.data == id) {
            setIsSaved(true);
          } else {
            setIsSaved(false);
          }
        } catch (error) {
          console.log("Error fetching ad", error);
        }
        const { data: ads } = await supabase
          .from("advertise")
          .select("*")
          .eq("advertise_id", advertiseId);

        if (ads == null) {
          setIsLoading(true);
        } else {
          console.log("data from supa", ads);
          if (!ads[0]?.embedding) {
            return;
          }
          const { data: simAds } = await supabase.rpc("match_advertises", {
            query_embedding: ads[0].embedding, // Pass the embedding you want to compare
            match_threshold: 0.78, // Choose an appropriate threshold for your data
            match_count: 3, // Choose the number of matches
          });

          setSimilarAds(simAds);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error fetching ad", error);
      }
    };

    fetchData();
  }, [advertiseId,id]);

  const handleNegotiateClick = async () => {
    try {
      // Set loading to true to show the loader
      setIsBotLoading(true);

      // Simulate a delay using setTimeout
      setTimeout(async () => {
        const response = await axios.post("http://localhost:8000/negotiate", {
          carDetails: adDetailsWithoutImages,
          userDetails: userData,
        });
        setShowCarAd(true);

        setIsBotLoading(false);
        
      }, 2000); // Simulate a 3-second delay
    } catch (error) {
      console.error("Error occurred while negotiating for the car:", error);

      // Reset loading state in case of an error
    }
  };

  const imageUrls = adDetails.vehicleImages
    ? adDetails.vehicleImages.split(", ")
    : [];
  console.log("use",userData);
  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  return (
    <Grid container spacing={3}>
      <Loader loading={isBotLoading} />
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
           
            {id!=adDetails.seller.userID && <Button
              variant="outlined"
              color="secondary"
              startIcon={<ChatIcon />}
              fullWidth
              component={Link}
              to={id !== undefined ? `/ChatBox/User/${id}/${adDetails.seller.userID}` : ``}
              sx={{ marginTop: "10px" }}
            >
              Send Message
            </Button>}

            {id && id!=adDetails.seller.userID && <Button
              variant="outlined"
              color="primary"
              fullWidth
              
              onClick={handleNegotiateClick}
              sx={{ marginTop: "10px" }}
            >
              Negotiate for this car
            </Button>}
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
              {adDetails.seller.userID!=id ? ("Seller ") : ("Your ")} Details
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
      <Grid item xs={12} md={12}>
        <SimilarAds similarAds={similarAds} />
      </Grid>
      {showCarAd ? (
        <ChatBot user={userData} 
        handleClose={() => setShowCarAd(false)} />
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default AdDetailPage;
