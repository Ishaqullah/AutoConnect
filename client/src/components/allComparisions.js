import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import { MenuItem, InputLabel } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import CarModal from "./carModal";
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

  const [carData, setCarData] = useState({
    make: 'Toyota',
    model: 'Corolla',
    variant: 'LE',
  });
  const [make1, setMake1] = React.useState("");
  const [model1, setModel1] = React.useState("");
  const [variant1, setVariant1] = React.useState("");

  const [make2, setMake2] = React.useState("");
  const [model2, setModel2] = React.useState("");
  const [variant2, setVariant2] = React.useState("");
  const [open,setOpen] =useState(false);
  const handleMake1Change = (event) => {
    setMake1(event.target.value);
  };

  const handleModel1Change = (event) => {
    setModel1(event.target.value);
  };

  const handleVariant1Change = (event) => {
    setVariant1(event.target.value);
  };

  const handleMake2Change = (event) => {
    setMake2(event.target.value);
  };

  const handleModel2Change = (event) => {
    setModel2(event.target.value);
  };

  const handleVariant2Change = (event) => {
    setVariant2(event.target.value);
  };

  const handleCompareClick = () => {
    setOpen(true);
  };
  const handleModalClose = () =>{
    setOpen(false);
  }

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#9D1515",
        padding: "20px",
        minHeight: "150px",
        marginBottom: "500px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "150%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <CarModal open={open} onClose={handleModalClose} carData={carData} />
        <Card
          style={{
            backgroundColor: "white",
            margin: "0 auto",
            width: "700px",
          }}
        >
          <CardHeader title="Compare Cars" />
          <CardContent>
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Car 1
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ m: 1, width: 200 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Make
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={make1}
                    onChange={handleMake1Change}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                  >
                    <MenuItem>Honda</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 200 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Model
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={model1}
                    onChange={handleModel1Change}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                  >
                    <MenuItem>Accord</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 200 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Variant
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={variant1}
                    onChange={handleVariant1Change}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                  >
                    <MenuItem>EX-L</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div>
              <Typography variant="h6" gutterBottom>
                Car 2
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ m: 1, width: 200 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Make
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={make2}
                    onChange={handleMake2Change}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                  >
                    <MenuItem>Honda</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 200 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Model
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={model2}
                    onChange={handleModel2Change}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                  >
                    <MenuItem>Accord</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 200 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Variant
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={variant2}
                    onChange={handleVariant2Change}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                  >
                    <MenuItem>EX-L</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={handleCompareClick}
              style={{
                backgroundColor: "#7B7272",
                color: "white",
                marginTop: "20px",
              }}
            >
              Compare
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllComparisions;
