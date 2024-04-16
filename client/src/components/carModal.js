import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Loader from "./loader";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
}));

const CarModal = ({ open, onClose,onSelectedData }) => {
  const classes = useStyles();
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [variant, setVariant] = useState(null);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedData, setSelectedData] = useState({
    make: null,
    model: null,
    variant: null,
  });
  const handleClose = () => {
    onClose();
  };
  
  const handleMakeClick = (m) => {
   
    const options = {
      method: "GET",
      url: "https://car-api2.p.rapidapi.com/api/models",
      params: {
        sort: "id",
        direction: "asc",
        year: "2020",
        verbose: "yes",
        make: m,
      },
      headers: {
        "X-RapidAPI-Key":
          "cf6e6ca279mshd5ef3a24af2beeep19575djsn60dbef1c6631",
        "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
      },
    };

    try {
      axios.request(options).then((response) => {
        console.log(response.data);
        setModel(response.data);
        // console.log("hello ",make);
      });
    } catch (error) {
      console.error(error);
      // Handle errors if any
    }
    console.log(m);
    setSelectedMake(m);

    setSelectedData({
      ...selectedData,
      make: m,
    });
    onSelectedData({ ...selectedData, make: m },);
  };

  const handleModelClick = (mod) => {
    
    

    const options = {
      method: "GET",
      url: "https://car-api2.p.rapidapi.com/api/trims",
      params: {
        direction: "asc",
        sort: "id",
        year: "2020",
        verbose: "yes",
        make: selectedMake,
        model: mod,
      },

      headers: {
        "X-RapidAPI-Key":
          "cf6e6ca279mshd5ef3a24af2beeep19575djsn60dbef1c6631",
        "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
      },
    };
    try {
      axios.request(options).then((response) => {
        console.log(response.data);
        setVariant(response.data);
        // console.log("hello ",make);
      });
    } catch (error) {
      console.error(error);
      // Handle errors if any
    }
    setSelectedModel(mod);

    setSelectedData({
      ...selectedData,
      model: mod,
    });
    onSelectedData({
      ...selectedData,
      model: mod,
    });
  };



  const handleVariantClick = (variant) =>{
    setSelectedVariant(variant);

    setSelectedData({
      ...selectedData,
      variant:variant,
    });
    onSelectedData({
      ...selectedData,
      variant:variant,
    });
    handleClose();
  }
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://car-api2.p.rapidapi.com/api/makes",
        params: {
          sort: "id",
          direction: "asc",
          year: "2020",
          verbose: "yes",
        },
        headers: {
          "X-RapidAPI-Key":
            "cf6e6ca279mshd5ef3a24af2beeep19575djsn60dbef1c6631",
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
        },
      };
      try {
        axios.request(options).then((response) => {
          console.log(response.data);
          setMake(response.data);
          console.log("hello ", make);
        });
      } catch (error) {
        console.error(error);
        // Handle errors if any
      }
    };

    fetchData();
  }, []);
  
  if (
    make === null 
    // variant === null ||
  ) {
    return (
      // Show full-page overlay with CircularProgress when loading state is true
      <Loader loading={true}></Loader>
    );
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={classes.closeIcon}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item md={4}>
            <FormControl fullWidth>
              {make.data.map((m, index) => (
                <Button
                  key={index}
                  onClick={() => handleMakeClick(m.name)}
                  variant={selectedMake === m.name ? "contained" : "outlined"}
                >
                  {m.name}
                </Button>
              ))}
            </FormControl>
          </Grid>

          <Grid item md={4}>
           {model ?( <FormControl>
              {model.data.map((mod, index) => (
                <Button
                  key={index}
                  onClick={() => handleModelClick(mod.name)}
                  variant={
                    selectedModel === mod.name ? "contained" : "outlined"
                  }
                >
                  {mod.name}
                </Button>
              ))}
            </FormControl>): (<Typography>Select Make</Typography>)}
          </Grid>

          <Grid item md={4}>
            {variant ?(<FormControl fullWidth>
              {variant.data.map((v, index) => (
                <Button
                  key={index}
                  onClick={() => handleVariantClick(v.name)}
                  variant={selectedVariant === v.name ? "contained" : "outlined"}
                >
                  {v.name}
                </Button>
              ))}
            </FormControl>) : (<Typography>Select Make/Model</Typography>)}
          </Grid>

        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CarModal;
