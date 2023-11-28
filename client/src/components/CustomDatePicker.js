import React, { useState } from 'react';
import {
  TextField,
  Popover,
  Box,
  Typography,
  Button,
  IconButton,
  makeStyles,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const useStyles = makeStyles((theme) => ({
  calendar: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '16px',
    backgroundColor: '#fff',
    width: '300px',
  },
  calendarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  calendarBody: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  },
  dayCell: {
    textAlign: 'center',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
}));

const CustomDatePicker = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-popover' : undefined;

  // Function to generate calendar days
  const generateCalendar = () => {
    const daysInMonth = 31; // Change this to actual days in the selected month
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className={classes.dayCell}>
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <TextField
        label="Select Date"
        onClick={openPopover}
        InputProps={{
          endAdornment: (
            <IconButton onClick={openPopover}>
              <CalendarTodayIcon />
            </IconButton>
          ),
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box className={classes.calendar}>
          <Box className={classes.calendarHeader}>
            <IconButton onClick={closePopover}>
              <Typography>Close</Typography>
            </IconButton>
            <Typography variant="h6">November 2023</Typography>
            <Button variant="contained" color="primary" size="small">
              Today
            </Button>
          </Box>
          <Box className={classes.calendarBody}>{generateCalendar()}</Box>
        </Box>
      </Popover>
    </div>
  );
};

export default CustomDatePicker;
