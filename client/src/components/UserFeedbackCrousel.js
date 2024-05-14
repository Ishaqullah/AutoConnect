import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Fab,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
const feedbackData = [
  {
    avatar: "/Images/1.png", // Example avatar URL
    name: "John Doe",
    comment: "Excellent service! Very satisfied with my purchase.",
  },
  {
    avatar: "/Images/1.png", // Example avatar URL
    name: "Jane Smith",
    comment: "AutoConnect made buying a car so easy. Highly recommend!",
  },
  {
    avatar: "/Images/1.png", // Example avatar URL
    name: "Michael Johnson",
    comment: "Great platform. Found my dream car in no time.",
  },
  {
    avatar: "/Images/1.png", // Example avatar URL
    name: "John Doe",
    comment: "Excellent service! Very satisfied with my purchase.",
  },
];
const settings = {
  showArrows: false,
  showStatus: false,
  showIndicators: false,
  infiniteLoop: true,
  autoPlay: true, // Enable autoplay
  stopOnHover: true,
  interval: 2000, // Set the autoplay interval in milliseconds
  transitionTime: 1000, // Set the transition time in milliseconds
  dynamicHeight: false,
  // labels:{leftArrow: 'previous slide / item', rightArrow: 'next slide / item'}
  showThumbs: false,
};

const UserFeedbackCarousel = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get("http://localhost:5278/admins/allFeedbacks")
      .then((response) => setFeedbacks(response.data))
      .catch((error) =>
        console.error("Error fetching mechanics review:", error)
      );
  };
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunkedFeedbackData = chunkArray(feedbacks, 3);
  if (feedbacks.length === 0) {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Grey shadow background
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="secondary" /> {/* Centered CircularProgress */}
      </div>
    );
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h5"
        sx={{ color: "secondary.main", marginBottom: "0px" }}
      >
        Our Valuable Customer
      </Typography>

      <Carousel {...settings}>
        {chunkedFeedbackData.map((chunk, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "1SS0px",
              justifyContent: "center",
            }}
          >
            {chunk.map((feedback, feedbackIndex) => (
              <Card
                key={feedbackIndex}
                sx={{ width: 300, height: 330, marginRight: 2, boxShadow: "0" }}
              >
                <CardContent style={{ textAlign: "center" }}>
                  <Fab
                    color="secondary"
                    size="medium"
                    sx={{ color: "#ffffff" }}
                  >
                    <PersonIcon width={24} />
                  </Fab>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    {feedback.userName}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {feedback.feedbackText}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default UserFeedbackCarousel;
