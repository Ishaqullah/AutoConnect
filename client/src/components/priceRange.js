import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

const PriceRange = () => {
    const formatCurrency = (value) => {
        // Format the input value with commas
        const formattedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        const numberWithCommas = Number(formattedValue).toLocaleString('en-US');
        return formattedValue === '' ? '' : numberWithCommas;
    };

    const [amountFrom, setAmountFrom] = React.useState('');
    const [amountTo, setAmountTo] = React.useState('');
    const [isToValueEntered, setIsToValueEntered] = React.useState(false);

    const handleAmountFromChange = (event) => {
        const formattedValue = formatCurrency(event.target.value);
        setAmountFrom(formattedValue || ''); // Set empty string if formattedValue is falsy
    };

    const handleAmountToChange = (event) => {
        const formattedValue = formatCurrency(event.target.value);
        setAmountTo(formattedValue || ''); // Set empty string if formattedValue is falsy
        setIsToValueEntered(true); // Set the flag to indicate 'to' value is entered
    };

    const handleAmountToBlur = () => {
        // Check if 'To' is less than 'From' and clear 'From' if needed
        if (amountFrom && amountTo && parseInt(amountTo.replace(/,/g, '')) < parseInt(amountFrom.replace(/,/g, ''))) {
            setAmountFrom('');
        }
    };

    return (
        <Grid container spacing={-10}>
            <Grid item xs={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount-from">From</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount-from"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="From"
                        value={amountFrom}
                        onChange={handleAmountFromChange}
                        sx={{ width: '70%' }} // Adjust the width as needed
                    />
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount-to">To</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount-to"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="To"
                        value={amountTo}
                        onChange={handleAmountToChange}
                        onBlur={handleAmountToBlur}
                        sx={{ width: '70%' }} // Adjust the width as needed
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default PriceRange;
