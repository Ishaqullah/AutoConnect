import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Card, CardContent, Typography, Box ,CircularProgress} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
const adData = [
  {
    title: "Toyota Fortuner",
    price: "PKR 13,500,000",
    location: "Karachi",
    image: "/Images/toyota-fortuner.webp",
  },
  {
    title: "Honda HR-V 2023",
    price: "PKR 75,000,000",
    location: "Lahore",
    image: "/Images/honda-hr-v.webp",
  },
  {
    title: "Honda BR-V 2017",
    price: "PKR 4,250,000",
    location: "Karachi",
    image: "/Images/honda-br-v.webp",
  },
  {
    title: "Toyota Fortuner",
    price: "PKR 13,500,000",
    location: "Karachi",
    image: "/Images/toyota-fortuner.webp",
  },
  {
    title: "Honda HR-V 2023",
    price: "PKR 75,000,000",
    location: "Lahore",
    image: "/Images/honda-hr-v.webp",
  },
  {
    title: "Honda BR-V 2017",
    price: "PKR 4,250,000",
    location: "Karachi",
    image: "/Images/honda-br-v.webp",
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
  showThumbs:false
};


const ListedVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const {id} =useParams();
  useEffect(() => {
    axios
      .get("http://localhost:5278/vehicles")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  console.log(vehicles);
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };
  
  const chunkedAdData = chunkArray(adData, 3);
  if(vehicles==[])
  {
    return(
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
    )
  }
  return (
    <Box sx={{ marginTop: "100px" }}>
      <Typography variant="h4" sx={{ color: "secondary.main" }} >
        <b>Featured Listed Vehicles</b>
      </Typography>
      
        <Typography  component={Link} to={id ? `/BuyCar/User/${id}` : "/BuyCar"}  sx={{ color: "primary.main", textAlign: "right",display:"block" }}>
          <u>View all listed Vehicles</u>
        </Typography>
      
      <Carousel {...settings}>
        {chunkedAdData.map((chunk, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            {chunk.map((ad, adIndex) => (
              <Card
                key={adIndex}
                sx={{ width: 300, height: 330, marginRight: 2 }}
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                <CardContent>
                  <Typography>
                    <b>{ad.title}</b>
                  </Typography>
                  <Typography sx={{ color: "success.main" }}>
                    {ad.price}
                  </Typography>
                  <Typography sx={{ color: "primary.light" }}>
                    {ad.location}
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

export default ListedVehicles;
