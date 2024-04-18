import * as React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import ComparisionTable from "./ComparisionTable";
import { carData } from "../utils/carData"; // Import carData JSON

export default function ComparisionContent({ vehicleOneData, vehicleTwoData }) {
  // Find the car data for vehicleOneData and vehicleTwoData
  const vehicleOneCar = carData.find(
    (car) =>
      car.make === vehicleOneData.make &&
      car.models.some((model) => model.name === vehicleOneData.model)
  );
  const vehicleTwoCar = carData.find(
    (car) =>
      car.make === vehicleTwoData.make &&
      car.models.some((model) => model.name === vehicleTwoData.model)
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "900px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              justifyContent: "space-between", // Distribute content horizontally
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    vehicleOneCar?.models.find(
                      (model) => model.name === vehicleOneData.model
                    )?.image
                  } // Display vehicleOneCar image
                  alt={vehicleOneCar?.make} // Alt text based on make
                  style={{ width: "261px", height: "196px" }}
                />
                <Typography variant="h6">
                  {vehicleOneCar?.make} {vehicleOneData.model}
                </Typography>{" "}
                {/* Display make and model */}
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    marginTop: "10px",
                    color: "success.main",
                  }}
                >
                  {
                    vehicleOneCar?.models.find(
                      (model) => model.name === vehicleOneData.model
                    )?.price
                  }{" "}
                  {/* Display price */}
                </Typography>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                backgroundColor: "#9D1515",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
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
                    fontSize: "150px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  <Typography>VS</Typography>
                </span>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    vehicleTwoCar?.models.find(
                      (model) => model.name === vehicleTwoData.model
                    )?.image
                  } // Display vehicleTwoCar image
                  alt={vehicleTwoCar?.make} // Alt text based on make
                  style={{ width: "261px", height: "196px" }}
                />
                <Typography variant="h6">
                  {vehicleTwoCar?.make} {vehicleTwoData.model}
                </Typography>{" "}
                {/* Display make and model */}
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    marginTop: "10px",
                    color: "success.main",
                  }}
                >
                  {
                    vehicleTwoCar?.models.find(
                      (model) => model.name === vehicleTwoData.model
                    )?.price
                  }{" "}
                  {/* Display price */}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
        <ComparisionTable
          vehicleOneData={vehicleOneData}
          vehicleTwoData={vehicleTwoData}
        />
      </Box>
    </>
  );
}
