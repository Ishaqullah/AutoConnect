import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";

const comparision = () => {
  return (
    <Box
      sx={{
        
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "secondary.main", alignSelf: "flex-start" }}
      >
        <b>Car Comparisons</b>
      </Typography>
      <Typography sx={{ color: "primary.main", alignSelf: "flex-end" }}>
        <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
          <u>View all listed Vehicles</u>
        </a>
      </Typography>
      <Card
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={"/Images/Audi.jpg"}
                alt="Car 1"
                style={{ width: "261px", height: "196px" }}
              />
              <Typography variant="h6">Audi A3</Typography>
            </div>

            <div
              style={{
                position: "relative",
                backgroundColor: "#9D1515",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  VS
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={"/Images/BMW.jpg"}
                alt="Car 2"
                style={{ width: "261px", height: "196px" }}
              />
              <Typography variant="h6">BMW 3 Series</Typography>
            </div>
          </div>

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "50px" }}
          >
            View All Comparisons
          </Button>
        </CardContent>
        <CardContent sx={{ textAlign: "center", marginLeft: "20px" }}>
          <Typography>Mazda Rx</Typography>
          <div
            style={{
              backgroundColor: "#9D1515",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              marginLeft: "23px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
              >
                VS
              </span>
            </div>
          </div>
          <Typography>Mitsubishi Gto</Typography>
        </CardContent>
        <CardContent sx={{ textAlign: "center", marginLeft: "20px" }}>
          <Typography>Hyundai Sonata</Typography>
          <div
            style={{
              backgroundColor: "#9D1515",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              marginLeft: "23px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
              >
                VS
              </span>
            </div>
          </div>
          <Typography>Honda Civic</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default comparision;
