import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoginModal from "./LoginModal";
const images = [
  "/Images/image01.jpg",
  "/Images/image2.jpg",
  "/Images/image3.jpg",
];

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: 500,
    height: 500,
  },
  carouselItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.2)", // Semi-transparent gray background
  },
}));

const Header = () => {
  const { id } = useParams();
  console.log(id);
  const classes = useStyles();
  const [openLogin,setOpenLogin]=useState(false);

  const handleClick = () =>{
    if(id===undefined)
    {
      setOpenLogin(true)
    }
  }
  const handleLoginClose = () => {
    setOpenLogin(false);
  };
  return (
    <Grid container>
      {openLogin && <LoginModal open={openLogin} handleClose={handleLoginClose}/>}
      <Grid item xs={6}>
        <Container maxWidth="sm">
          <Card
            sx={{
              width: "100%",
              marginTop: "50px",
              position: "relative",
              height: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center text and buttons vertically
              alignItems: "center", // Center text and buttons horizontally
            }}
          >
            <CardContent>
              <span
                style={{
                  color: "#7B7272",
                  fontSize: "64px",
                  fontWeight: "500",
                  fontFamily: "Maven-Pro",
                }}
              >
                Driving your dreams, <br />
                One click at a time
              </span>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Link
                  to={id === undefined ? "/sellCar" : `/sellCar/User/${id}`}
                >
                  <Button onClick={handleClick} color="secondary" variant="contained" component={Link} to={id !== undefined ? `/sellCar/User/${id}` : "/"}>
                    <b>Sell Your Car</b>
                  </Button>
                </Link>
                <Link to="/BuyCar">
                  <Button color="secondary" variant="contained">
                    <b>Buy Your Car</b>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Grid>
      <Grid item xs={6}>
        <div
          style={{
            width: "100%",
            minHeight: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "120px",
          }}
        >
          <Carousel
            className={classes.carousel}
            animation="fade"
            interval={2000}
            navButtonsAlwaysInvisible={true}
            indicators={false}
          >
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className={classes.carouselItem}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className={classes.image}
                  />
                  <div className={classes.overlay}></div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </Grid>
    </Grid>
  );
};

export default Header;
