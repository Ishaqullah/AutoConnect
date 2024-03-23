import * as React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Button, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";

const PriceRange = ({ onRangeSearch }) => {
  const formatCurrency = (value) => {
    // Format the input value with commas
    const formattedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    const numberWithCommas = Number(formattedValue).toLocaleString("en-US");
    return formattedValue === "" ? "" : numberWithCommas;
  };

  const [amountFrom, setAmountFrom] = React.useState("");
  const [amountTo, setAmountTo] = React.useState("");

  const handleAmountFromChange = (event) => {
    const formattedValue = formatCurrency(event.target.value);
    setAmountFrom(event.target.value || ""); // Set empty string if formattedValue is falsy
  };

  const handleAmountToChange = (event) => {
    const formattedValue = formatCurrency(event.target.value);
    setAmountTo(event.target.value || ""); // Set empty string if formattedValue is falsy
  };

  const handleAmountToBlur = () => {
    // Check if 'To' is less than 'From' and clear 'From' if needed

    if (
      amountFrom &&
      amountTo &&
      parseInt(amountTo.replace(/,/g, "")) <
        parseInt(amountFrom.replace(/,/g, ""))
    ) {
      setAmountFrom("");
    }
  };

  return (
    <Grid container spacing={-10} alignItems={"center"}>
      <Grid item xs={12}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount-from">From</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount-from"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="From"
            value={amountFrom}
            onChange={handleAmountFromChange}
            sx={{ width: "200px" }}
            // Adjust the width as needed
          />
        </FormControl>
      </Grid>

      <Grid item xs={10}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount-to">To</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount-to"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="To"
            value={amountTo}
            onChange={handleAmountToChange}
            onBlur={handleAmountToBlur}
            sx={{ width: "200px" }} 
            endAdornment={<InputAdornment> <Button
                onClick={() => {
                  onRangeSearch(amountFrom, amountTo);
                }}
              >
                <Search />
              </Button></InputAdornment>}// Adjust the width as needed
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
       
      </Grid>
    </Grid>
  );
};

export default PriceRange;
