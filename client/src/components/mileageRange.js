import * as React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { OutlinedInput, Tooltip, Typography, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SpeedIcon from "@mui/icons-material/Speed";
import Popover from "@mui/material/Popover";
import Search from "@mui/icons-material/Search";
const MileageRange = ({ onRangeSearch }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);


  const [mileageFrom, setMileageFrom] = React.useState("");
  const [mileageTo, setMileageTo] = React.useState("");

  const handleMileageChange = (value, setMileageFunction) => {
    setMileageFunction(Number(value));
  };

  const handleMileageFromChange = (event) => {
    handleMileageChange(event.target.value, setMileageFrom);
  };

  const handleMileageToChange = (event) => {
    handleMileageChange(event.target.value, setMileageTo);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleMileageToBlur = () => {
    // Check if 'To' is less than 'From' and clear 'From' if needed
    if (
      mileageFrom &&
      mileageTo &&
      parseInt(mileageTo.replace(/,/g, "")) <
        parseInt(mileageFrom.replace(/,/g, ""))
    ) {
      setMileageFrom("");
    }
  };

  return (
    <Grid container spacing={-10}>
      <Grid item xs={10}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-mileage-from">
            From
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-mileage-from"
            startAdornment={
              <InputAdornment position="start">
                <SpeedIcon fontSize="small" />
              </InputAdornment>
            }
            label="From"
            value={mileageFrom}
            onChange={handleMileageFromChange}
            sx={{ width: "200px" }}
            // aria-owns={open ? "mouse-over-popover" : undefined}
            // aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onFocus={handlePopoverClose}
            // Adjust the width as needed
          />

          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
              //   width: "200px",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
          >
            <Typography
              sx={{
                p: 1,
                width: "100px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Mileage
            </Typography>
          </Popover>
        </FormControl>
      </Grid>

      <Grid item xs={10}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-mileage-to">To</InputLabel>
          <OutlinedInput
            id="outlined-adornment-mileage-to"
            startAdornment={
              <InputAdornment position="start">
                <SpeedIcon fontSize="small" />
              </InputAdornment>
            }
            label="To"
            value={mileageTo}
            onChange={handleMileageToChange}
            onBlur={handleMileageToBlur}
            sx={{ width: "200px" }}
            endAdornment={
              <InputAdornment>
                {" "}
                <Button
                  onClick={() => {
                    onRangeSearch(mileageFrom, mileageTo);
                  }}
                >
                  <Search />
                </Button>
              </InputAdornment>
            } // Adjust the width as needed
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default MileageRange;
