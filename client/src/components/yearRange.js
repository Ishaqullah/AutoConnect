import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

const YearRange = () => {
    const [yearFrom, setYearFrom] = React.useState('');
    const [yearTo, setYearTo] = React.useState('');

    const handleYearChange = (value, setYearFunction) => {
        const formattedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        const validatedValue = formattedValue.length > 4 ? formattedValue.slice(0, 4) : formattedValue; // Limit to 4 digits
        setYearFunction(validatedValue);
    };

    const handleYearFromChange = (event) => {
        handleYearChange(event.target.value, setYearFrom);
    };

    const handleYearToChange = (event) => {
        handleYearChange(event.target.value, setYearTo);
    };

    const handleYearToBlur = () => {
        // Check if 'To' is less than 'From' and clear 'From' if needed
        if (yearFrom && yearTo && parseInt(yearTo) < parseInt(yearFrom)) {
            setYearFrom('');
        }
    };

    return (
        <Grid container spacing={-10}>
            <Grid item xs={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-year-from">From</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-year-from"
                        startAdornment={<InputAdornment position="start">{yearFrom ? '' : 'Year'}</InputAdornment>}
                        label="From"
                        value={yearFrom}
                        onChange={handleYearFromChange}
                        sx={{ width: '70%' }} // Adjust the width as needed
                    />
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-year-to">To</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-year-to"
                        startAdornment={<InputAdornment position="start">{yearTo ? '' : 'Year'}</InputAdornment>}
                        label="To"
                        value={yearTo}
                        onChange={handleYearToChange}
                        onBlur={handleYearToBlur}
                        sx={{ width: '70%' }} // Adjust the width as needed
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default YearRange;
