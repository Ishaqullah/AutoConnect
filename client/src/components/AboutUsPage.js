import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UserFeedbackCarousel from "./UserFeedbackCrousel";
const AboutUsPage = ({ onValueChange }) => {
  const { id } = useParams();
  useEffect(() => {
    onValueChange(id);
  }, [id, onValueChange]);
  const [feedbackData, setFeedbackData] = useState([
    {
      name: "John Doe",
      feedback: "Excellent service! Very satisfied with my purchase.",
    },
    {
      name: "Jane Smith",
      feedback: "AutoConnect made buying a car so easy. Highly recommend!",
    },
    {
      name: "Micheal Johnson",
      feedback: "Great platform. Found my dream car in no time.",
    },
  ]);
  return (
    <Container sx={{ paddingTop: "20px" }}>
      {/* <Typography
        variant="h3"
        component="h1"
        align="left"
        sx={{ color: "secondary.main" }}
        gutterBottom
      >
        About AutoConnect
      </Typography> */}
      <Grid container mt={"50px"} spacing={3}>
        <Grid item xs={6} >
          <Paper elevation={3} sx={{ padding: "20px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center text and buttons vertically
              alignItems: "center", }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#969595" }}>
              At AutoConnect, we're revolutionizing automotive commerce with a
              seamless platform for buying and selling vehicles. Our mission is
              to connect enthusiasts with their dream cars, ensuring a
              hassle-free experience. Through innovative technology and a
              customer-centric approach, we're setting new standards for
              convenience and trust. Our user-friendly platform empowers users
              with tools and resources to transact confidently. From browsing
              listings to finalizing deals, we prioritize simplicity and
              transparency. Join us in reshaping the automotive landscape, where
              finding your dream vehicle is as exciting as the drive itself.
            </Typography>
          </Paper>
        </Grid>
      
        <Grid item xs={6}>
          <Container maxWidth="sm">
            <div
              style={{
                width: "100%",
                minHeight: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "50px",
              }}
            >
              <img src={"/Images/about-us.png"} width={600} height={320}></img>
            </div>
          </Container>
        </Grid>
        <Grid item mt={"50px"} xs={12} md={6}>
          <Container maxWidth="sm">
            <div
              style={{
                width: "110%",
                minHeight: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "50px",
                // backgroundColor:"Blue",
              }}
            >
              <img src={"/Images/chat-bot.gif"} width={400} height={340}></img>
            </div>
          </Container>
        </Grid>
        <Grid item  mt={"50px"} xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Negotiation ChatBot
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#969595" }}>
              Introducing our Smart Negotiation Chatbot, a game-changer
              integrated into AutoConnect to simplify and streamline the
              deal-making process effortlessly. With advanced AI technology, our
              chatbot is your trusted companion, navigating negotiations with
              finesse and efficiency. Seamlessly integrated into our platform,
              it analyzes data in real-time, providing personalized insights and
              recommendations to facilitate smoother transactions. Whether
              you're a buyer or seller, our chatbot is there every step of the
              way, ensuring fair and satisfactory outcomes for all parties
              involved. Say goodbye to tedious negotiations and hello to a
              smarter, more efficient way to make deals. Experience the power of
              our Smart Negotiation Chatbot on AutoConnect today.
            </Typography>
          </Paper>
        </Grid>
        <Grid item mt={"50px"} xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Mechanics
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#969595" }}>
              Introducing our Mechanics Feature, an innovative addition to
              AutoConnect designed to enhance the car buying experience. With
              this feature, buyers can easily schedule inspections with trusted
              mechanics directly through our platform. Mechanics are carefully
              selected based on ratings and reviews, ensuring reliability and
              quality service. Buyers have the freedom to choose mechanics based
              on their preferences and ratings, providing peace of mind
              throughout the inspection process. From pre-purchase inspections
              to routine maintenance checks, our Mechanics Feature empowers
              buyers to make informed decisions with confidence. Experience the
              convenience and reliability of our Mechanics Feature, making car
              inspections effortless and stress-free on AutoConnect.{" "}
            </Typography>
          </Paper>
        </Grid>
        <Grid item mt={"50px"} xs={12} md={6}>
          <Container maxWidth="sm">
            <div
              style={{
                width: "100%",
                minHeight: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "50px",
                //  backgroundColor:"Blue",
              }}
            >
              <img src={"/Images/mechanics.jpg"} width={500} height={340}></img>
            </div>
          </Container>
        </Grid>
      </Grid>
      {/* Feedback Carousel */}
      <Grid item mt={"50px"} xs={12} md={12}>
        <Card sx={{ mt: "50px", padding: "15px", boxShadow: "0" }}>
          <UserFeedbackCarousel />
        </Card>
      </Grid>

      
      
    </Container>
  );
};

export default AboutUsPage;
