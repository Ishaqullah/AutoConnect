import React, { useState } from 'react';
import { Modal, Stack, Button, Typography, TextField, IconButton } from '@mui/material';
import { StaticTimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

const AppointmentModal = ({ mechanic, onClose,id ,open}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs()); // Default time set to current time
  const [confirmationText, setConfirmationText] = useState(null);
  const [datePickerDisabled, setDatePickerDisabled] = useState(false);
  const [timePickerDisabled, setTimePickerDisabled] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setConfirmationText(null); // Reset confirmation text when date changes
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setConfirmationText(null); // Reset confirmation text when time changes
  };

  const handleConfirmAppointment = () => {
    // Logic to send appointment request
    setConfirmationText(`Your request for inspection is sent to ${mechanic.mechanicName} on ${selectedDate.format('YYYY-MM-DD')} at ${selectedTime.format('HH:mm')}`);
    setDatePickerDisabled(true);
    setTimePickerDisabled(true);
  };

  const handleCancelAppointment = () =>{
    setConfirmationText(null);
    setDatePickerDisabled(false);
    setTimePickerDisabled(false);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="appointment-modal-title"
      aria-describedby="appointment-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography variant="h6" id="appointment-modal-title" gutterBottom>
          Book Appointment with {mechanic.mechanicName.charAt(0).toUpperCase() + mechanic.mechanicName.slice(1)}
        </Typography>
        <DesktopDatePicker
          defaultValue={dayjs()}
          disablePast
          disabled={datePickerDisabled}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          />
        <StaticTimePicker
          defaultValue={dayjs()}
          disablePast
          disabled={timePickerDisabled}
          onChange={handleTimeChange}
          renderInput={(params) => <TextField {...params} />}
          orientation="landscape"
        />
        {confirmationText && (
          <Stack direction="column" spacing={1} justifyContent="flex-end" marginTop="20px">
            <Typography variant="h6" gutterBottom>
              {confirmationText}
            </Typography>
            <Button onClick={handleCancelAppointment} variant="contained" color="secondary">
              Cancel Appointment
            </Button>
          </Stack>
        )}
        {!confirmationText && (<Stack direction="row" spacing={1} justifyContent="flex-end" marginTop="20px">
          <Button onClick={handleConfirmAppointment} variant="contained" color="primary">
            Confirm
          </Button>
        </Stack>)}
      </div>
    </Modal>
  );
};

export default AppointmentModal;
