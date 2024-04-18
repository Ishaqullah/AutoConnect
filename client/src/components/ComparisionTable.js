import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { carData } from "../utils/carData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#7B7272",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ComparisonTable({ vehicleOneData, vehicleTwoData }) {

  const vehicleOneModelIndex = carData.findIndex(
    (car) =>
      car.make === vehicleOneData.make &&
      car.models.some((model) => model.name === vehicleOneData.model)
  );
  const vehicleTwoModelIndex = carData.findIndex(
    (car) =>
      car.make === vehicleTwoData.make &&
      car.models.some((model) => model.name === vehicleTwoData.model)
  );

  
  const vehicleOneDimensions =
    carData[vehicleOneModelIndex]?.models.find(
      (model) => model.name === vehicleOneData.model
    )?.dimensions || {};
  const vehicleTwoDimensions =
    carData[vehicleTwoModelIndex]?.models.find(
      (model) => model.name === vehicleTwoData.model
    )?.dimensions || {};

  const vehicleOneEngine =
    carData[vehicleOneModelIndex]?.models.find(
      (model) => model.name === vehicleOneData.model
    )?.engine || {};
  const vehicleTwoEngine =
    carData[vehicleTwoModelIndex]?.models.find(
      (model) => model.name === vehicleTwoData.model
    )?.engine || {};

  const vehicleOneTransmission =
    carData[vehicleOneModelIndex]?.models.find(
      (model) => model.name === vehicleOneData.model
    )?.transmission || {};
  const vehicleTwoTransmission =
    carData[vehicleTwoModelIndex]?.models.find(
      (model) => model.name === vehicleTwoData.model
    )?.transmission || {};


    const vehicleOneWheelsNTires =
    carData[vehicleOneModelIndex]?.models.find(
      (model) => model.name === vehicleOneData.model
    )?.wheelsAndTires || {};
  const vehicleTwoWheelsNTires =
    carData[vehicleTwoModelIndex]?.models.find(
      (model) => model.name === vehicleTwoData.model
    )?.wheelsAndTires || {};

    const vehicleOneFuelEconomy =
    carData[vehicleOneModelIndex]?.models.find(
      (model) => model.name === vehicleOneData.model
    )?.fuelEconomy || {};
  const vehicleTwoFuelEconomy =
    carData[vehicleTwoModelIndex]?.models.find(
      (model) => model.name === vehicleTwoData.model
    )?.fuelEconomy || {};

  return (
    <div>
      {/* Dimensions Table*/}
      <TableContainer component={Paper} sx={{ mt: 10, width: "900px" }}>
        <Table aria-label="dimensions table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Dimensions</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneData.make} {vehicleOneData.model}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoData.make} {vehicleTwoData.model}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>Length</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneDimensions.length}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoDimensions.length}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Width</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneDimensions.width}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoDimensions.width}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Height</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneDimensions.height}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoDimensions.height}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Wheelbase</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneDimensions.wheelbase}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoDimensions.wheelbase}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Curb Weight</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneDimensions.curbWeight}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoDimensions.curbWeight}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Engine Table*/}
      <TableContainer component={Paper} sx={{ mt: 10, width: "900px" }}>
        <Table aria-label="Engine table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Engine</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneData.make} {vehicleOneData.model}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoData.make} {vehicleTwoData.model}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>Length</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneEngine.type}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoEngine.type}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Width</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneEngine.displacement}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoEngine.displacement}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Height</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneEngine.horsepower}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoEngine.horsepower}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Wheelbase</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneEngine.torque}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoEngine.torque}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Transmission Table*/}
      <TableContainer component={Paper} sx={{ mt: 10, width: "900px" }}>
        <Table aria-label="Transmission table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transmission</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneData.make} {vehicleOneData.model}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoData.make} {vehicleTwoData.model}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>Transmission Type</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneTransmission.type}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoTransmission.type}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>


      {/* Wheels and Tires Table*/}
      <TableContainer component={Paper} sx={{ mt: 10, width: "900px" }}>
        <Table aria-label="Wheels and Tires table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Wheels and Tires</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneData.make} {vehicleOneData.model}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoData.make} {vehicleTwoData.model}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>Wheels</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneWheelsNTires.wheels}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoWheelsNTires.wheels}
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell>Tires</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneWheelsNTires.tires}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoWheelsNTires.tires}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Fuel Economy*/}
      <TableContainer component={Paper} sx={{ mt: 10, width: "900px" }}>
        <Table aria-label="Fuel economy table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Fuel Economy</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneData.make} {vehicleOneData.model}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoData.make} {vehicleTwoData.model}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneFuelEconomy.city}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoFuelEconomy.city}
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell>Highway</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneFuelEconomy.highway}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoFuelEconomy.highway}
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell>Combined</StyledTableCell>
              <StyledTableCell align="left">
                {vehicleOneFuelEconomy.combined}
              </StyledTableCell>
              <StyledTableCell align="left">
                {vehicleTwoFuelEconomy.combined}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
