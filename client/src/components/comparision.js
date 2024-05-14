import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const comparision = () => {

  const {id} =useParams();
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
      <Typography  component={Link} to={id ? `/Comparisions/User/${id}` : "/Comparisions"}  sx={{ color: "primary.main", textAlign: "right",display:"block" }}>
          <u>View all vehicle comparision</u>
        </Typography>
      </Typography>
      <Card
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{ textAlign: "center", textDecoration: "none", color: "inherit" }}
          component={Link}
        >
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
                  <Typography>VS</Typography>
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
            component={Link} 
            to={id ? `/Comparisions/User/${id}` : "/Comparisions"}
          >
            View All Comparisons
          </Button>
        </CardContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
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
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    <Typography>VS</Typography>
                  </span>
                </div>
              </div>
              <Typography>Mitsubishi Gto</Typography>
            </CardContent>
          </div>
          <div>
            <CardContent sx={{ textAlign: "center", marginLeft: "20px" }}>
              <Typography>Hyundai Sonata</Typography>
              <div
                style={{
                  backgroundColor: "#9D1515",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  marginLeft: "28px",
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
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    <Typography>VS</Typography>
                  </span>
                </div>
              </div>
              <Typography>Honda Civic</Typography>
            </CardContent>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default comparision;
