// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import {
  Modal,
  Stack,
  Button,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { StaticTimePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";

// Define the AppointmentModal component
const AppointmentModal = ({ mechanic, onClose, id, open }) => {
  // Define state variables
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [confirmationText, setConfirmationText] = useState(null);
  const [datePickerDisabled, setDatePickerDisabled] = useState(false);
  const [timePickerDisabled, setTimePickerDisabled] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [appointmentDateTime, setAppointmentDateTime] = useState(null);

  // Fetch appointment status and date-time when modal is opened
  useEffect(() => {
    const fetchAppointmentStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5278/users/appointmentStatus/${id}/${mechanic.mechanicId}`
        );
        setAppointmentStatus(response.data.appointmentStatus);
        setAppointmentDateTime(response.data.appointmentDate);
      } catch (error) {
        console.error("Error fetching appointment status:", error);
      }
    };

    if (open) {
      fetchAppointmentStatus();
    }
  }, [open, id, mechanic.mechanicID]);

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setConfirmationText(null);
  };

  // Handle time change
  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setConfirmationText(null);
  };

  // Handle appointment confirmation
  const handleConfirmAppointment = async () => {
    try {
      const dateTimeString =
        selectedDate.format("YYYY-MM-DD") + " " + selectedTime.format("HH:mm");
      const formData = {
        appointmentDate: dateTimeString,
        status: "pending",
      };
      await axios.post(`http://localhost:5278/users/appointment/${id}/${mechanic.mechanicId}`, formData);
      setConfirmationText(
        `Your request for an appointment with ${mechanic.mechanicName} on ${dateTimeString} is sent.`
      );
      setDatePickerDisabled(true);
      setTimePickerDisabled(true);
      toast.success("Request sent to mechanic")
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  // Handle appointment cancellation
  const handleCancelAppointment = async () => {
    try {
      await axios.delete(
        `http://localhost:5278/users/appointment/${id}/${mechanic.mechanicId}`
      );
      setConfirmationText(null);
      setDatePickerDisabled(false);
      setTimePickerDisabled(false);
      onClose();
      toast.success("Appoinment cancelled")
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  // Return the JSX for the AppointmentModal component
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="appointment-modal-title"
      aria-describedby="appointment-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
      >
        <Stack direction="row" justifyContent="flex-end">
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography variant="h6" id="appointment-modal-title" gutterBottom>
          Book Appointment with{" "}
          {mechanic.mechanicName.charAt(0).toUpperCase() +
            mechanic.mechanicName.slice(1)}
        </Typography>
        {appointmentStatus === "accepted" ? (
          <Typography variant="body1" gutterBottom>
            Your appointment is booked with {mechanic.mechanicName}. Contact him on {mechanic.mechanicPhone}.
          </Typography>
        ) : appointmentStatus === "rejected" ? (
          <Typography variant="body1" gutterBottom>
            We're sorry, {mechanic.mechanicName} has rejected your appointment request.
          </Typography>
        ) : (
          <React.Fragment>
            <DesktopDatePicker
              defaultValue={dayjs()}
              disablePast
              disabled={appointmentStatus === 'pending' || datePickerDisabled}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <StaticTimePicker
              defaultValue={dayjs()}
              disablePast
              disabled={appointmentStatus === 'pending' || timePickerDisabled}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} />}
              orientation="landscape"
            />
            {confirmationText && (
              <Stack
                direction="column"
                spacing={1}
                justifyContent="flex-end"
                marginTop="20px"
              >
                <Typography variant="h6" gutterBottom>
                  {confirmationText}
                </Typography>
                <Button
                  onClick={handleCancelAppointment}
                  variant="contained"
                  color="secondary"
                >
                  Cancel Appointment
                </Button>
              </Stack>
            )}
            {!confirmationText && appointmentStatus === "pending" && (
              <Stack
                direction="column"
                spacing={1}
                justifyContent="flex-end"
                marginTop="20px"
              >
                <Typography variant="h6" gutterBottom>
                  Your request for appointment at {appointmentDateTime} is sent to {mechanic.mechanicName}
                </Typography>
                <Button
                  onClick={handleCancelAppointment}
                  variant="contained"
                  color="secondary"
                >
                  Cancel Appointment
                </Button>
              </Stack>
            )}
            {!confirmationText && !appointmentStatus && (
              <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                marginTop="20px"
              >
                <Button
                  onClick={handleConfirmAppointment}
                  variant="contained"
                  color="primary"
                >
                  Confirm
                </Button>
              </Stack>
            )}
          </React.Fragment>
        )}
      </div>
    </Modal>
  );
};

// Export the AppointmentModal component
export default AppointmentModal;
