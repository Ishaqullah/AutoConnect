import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardActions, Typography, Box } from "@mui/material";
import { Button } from "@mui/material";
import CarModal from "./carModal";
import ComparisonContent from "./comparisonContent";
import Alert from "@mui/material/Alert";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AllComparisions = ({ onValueChange }) => {
  const { id } = useParams();
  useEffect(() => {
    onValueChange(id);
  }, [id, onValueChange]);
  //   const classes = useStyles();

  const [vehicleOneData, setVehicleOneData] = useState(null);
  const [vehicleTwoData, setVehicleTwoData] = useState(null);
  const [vehicleIndex, setClickedVehicleIndex] = useState(1);
  const [errorMessage, setErrorMessage] = useState();
  const [table, setTable] = useState(false);
  // Callback function to receive selected data from child
  const handleSelectedData = (data) => {
    console.log(data, vehicleIndex);
    switch (vehicleIndex) {
      case 1:
        setVehicleOneData(data);
        break;
      case 2:
        setVehicleTwoData(data);
        break;
      case 3:
        setVehicleThreeData(data);
        break;
      default:
        break;
    }
  };
  const [open, setOpen] = useState(false);

  const handleCarClick = (vehicleIndex) => {
    setClickedVehicleIndex(vehicleIndex);
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  const handleCompareClick = () => {
    if (vehicleOneData && vehicleTwoData) {
      setTable(true);
      setErrorMessage("");
    } else {
     setErrorMessage("Please select both cars")
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          backgroundColor: "#2E2D31",
          padding: "20px",
          minHeight: "150px",
          marginBottom: "150px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <CarModal
            open={open}
            onClose={handleModalClose}
            onSelectedData={(data) => handleSelectedData(data)}
          />

          <Box
            sx={{
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              // padding:"5px",
              // border:"1px solid #9D1515"
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "secondary.main", alignSelf: "flex-start" }}
            >
              <b>Compare Cars</b>
            </Typography>
            <Card
              style={{
                backgroundColor: "transparent",
                // margin: "0 auto",
                width: "800px",
                borderRadius: "10px",
              }}
            >
              {/* <CardHeader title="Compare Cars" /> */}
              <CardContent
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ textAlign: "center" }}>
                  <Typography variant="body1" gutterBottom color={"GrayText"}>
                    Select Car-1
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleCarClick(1)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#7B7272",
                      marginTop: "10px",
                      minWidth: "160px",
                      textTransform: "capitalize",
                    }}
                  >
                    {vehicleOneData ? (
                      <>
                        {vehicleOneData.make} / {vehicleOneData.model} /{" "}
                        {vehicleOneData.variant}
                      </>
                    ) : (
                      <Typography>Make / Model / Variant</Typography>
                    )}
                  </Button>
                </div>

                <div style={{ textAlign: "center", marginLeft: "30px" }}>
                  <Typography variant="body1" gutterBottom color={"GrayText"}>
                    Select Car-2
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleCarClick(2)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#7B7272",
                      marginTop: "10px",
                      minWidth: "160px",
                      textTransform: "capitalize",
                    }}
                  >
                    {vehicleTwoData ? (
                      <>
                        {vehicleTwoData.make} / {vehicleTwoData.model}/{" "}
                        {vehicleTwoData.variant}
                      </>
                    ) : (
                      <Typography>Make / Model / Variant</Typography>
                    )}
                  </Button>
                </div>
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  onClick={handleCompareClick}
                  style={{
                    backgroundColor: "#7B7272",
                    color: "white",
                    marginTop: "10px",
                    minWidth: "160px",
                    marginLeft: "30px",
                  }}
                >
                  <Typography>Compare</Typography>


                </Button>

                {errorMessage?(<Alert severity="error">{errorMessage}</Alert>):(<></>)}
              </CardActions>
            </Card>
          </Box>
        </div>
      </div>
      {table && (
        <ComparisonContent
          vehicleOneData={vehicleOneData}
          vehicleTwoData={vehicleTwoData}
        />
      )}
    </>
  );
};

export default AllComparisions;
