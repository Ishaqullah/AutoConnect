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

const CarModal = ({ open, onClose, carData }) => {
  const classes = useStyles();
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [variant, setVariant] = useState(null);
  const handleClose = () => {
    onClose();
  };

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
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://car-api2.p.rapidapi.com/api/models",
        params: {
          sort: "id",
          direction: "asc",
          year: "2020",
          verbose: "yes",
          make: `${make}`,
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
    };

    fetchData();
  }, [make]);
  if (
    make === null ||
    model === null
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
                <MenuItem key={index} value={m.name}>
                  {m.name}
                </MenuItem>
              ))}
            </FormControl>
          </Grid>

          <Grid item md={4}>
            <FormControl>
              {model.data.map((mod, index) => (
                <MenuItem key={index} value={mod.name}>
                  {mod.name}
                </MenuItem>
              ))}
            </FormControl>
          </Grid>

          <Grid item md={4}>
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemText primary="Trash" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText primary="Spam" />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CarModal;
