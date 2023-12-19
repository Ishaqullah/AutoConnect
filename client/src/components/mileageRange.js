import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

const MileageRange = () => {
    const formatMileage = (value) => {
        // Format the mileage value with commas
        const formattedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        const numberWithCommas = Number(formattedValue).toLocaleString('en-US');
        return formattedValue === '' ? '' : numberWithCommas;
    };

    const [mileageFrom, setMileageFrom] = React.useState('');
    const [mileageTo, setMileageTo] = React.useState('');

    const handleMileageChange = (value, setMileageFunction) => {
        const formattedValue = formatMileage(value);
        setMileageFunction(formattedValue);
    };

    const handleMileageFromChange = (event) => {
        handleMileageChange(event.target.value, setMileageFrom);
    };

    const handleMileageToChange = (event) => {
        handleMileageChange(event.target.value, setMileageTo);
    };

    const handleMileageToBlur = () => {
        // Check if 'To' is less than 'From' and clear 'From' if needed
        if (mileageFrom && mileageTo && parseInt(mileageTo.replace(/,/g, '')) < parseInt(mileageFrom.replace(/,/g, ''))) {
            setMileageFrom('');
        }
    };

    return (
        <Grid container spacing={-10}>
            <Grid item xs={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-mileage-from">From</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-mileage-from"
                        startAdornment={<InputAdornment position="start">{mileageFrom ? '' : 'Mileage'}</InputAdornment>}
                        label="From"
                        value={mileageFrom}
                        onChange={handleMileageFromChange}
                        sx={{ width: '70%' }} // Adjust the width as needed
                    />
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-mileage-to">To</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-mileage-to"
                        startAdornment={<InputAdornment position="start">{mileageTo ? '' : 'Mileage'}</InputAdornment>}
                        label="To"
                        value={mileageTo}
                        onChange={handleMileageToChange}
                        onBlur={handleMileageToBlur}
                        sx={{ width: '70%' }} // Adjust the width as needed
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default MileageRange;
