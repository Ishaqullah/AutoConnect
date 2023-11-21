import React from "react";
import Carousel from "react-material-ui-carousel";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
const adData = [
  {
    title: "Toyota Fortuner",
    price: "PKR 13,500,000",
    location: "Karachi",
    image: "Images/toyota-fortuner.webp",
  },
  {
    title: "Honda HR-V 2023",
    price: "PKR 75,000,000",
    location: "Lahore",
    image: "Images/honda-hr-v.webp",
  },
  {
    title: "Honda BR-V 2017",
    price: "PKR 4,250,000",
    location: "Karachi",
    image: "Images/honda-br-v.webp",
  },
  {
    title: "Toyota Fortuner",
    price: "PKR 13,500,000",
    location: "Karachi",
    image: "Images/toyota-fortuner.webp",
  },
  {
    title: "Honda HR-V 2023",
    price: "PKR 75,000,000",
    location: "Lahore",
    image: "Images/honda-hr-v.webp",
  },
  {
    title: "Honda BR-V 2017",
    price: "PKR 4,250,000",
    location: "Karachi",
    image: "Images/honda-br-v.webp",
  },
];

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const chunkedAdData = chunkArray(adData, 3);

const ListedVehicles = () => {
  return (
    <Box sx={{ marginTop: "100px" }}>
      <Typography variant="h4" sx={{ color: "secondary.main" }}>
        <b>Featured Listed Vehicles</b>
      </Typography>
      <a href="#">
        <Typography sx={{ color: "primary.main", textAlign: "right" }}>
          <u>View all listed Vehicles</u>
        </Typography>
      </a>
      <Carousel interval={2000}>
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
