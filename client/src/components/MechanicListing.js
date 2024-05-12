import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Stack, Avatar } from '@mui/material';
import { Rating } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Link,useParams } from 'react-router-dom';
import AppointmentModal from './AppointmentModal';
import ReviewModal from './ReviewModal'; // Import ReviewModal component
import { toast } from 'react-toastify';

const MechanicListing = ({ onValueChange }) => {
  const {  id } = useParams();
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false); 
  const [appointmentModalOpen, setApoointmentModalOpen] = useState(false);// State for review modal visibility
  useEffect(() => {
    onValueChange(id);
  }, [id, onValueChange]);
  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get('http://localhost:5278/mechanics');
        setMechanics(response.data);
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      }
    };

    fetchMechanics();
  }, []);

  const handleAppointment = (mechanic) => {
    setSelectedMechanic(mechanic);
    setApoointmentModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMechanic(null);
    setApoointmentModalOpen(false);
  };

  const handleOpenReviewModal = (mechanic) => {
    setSelectedMechanic(mechanic);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedMechanic(null);
    setReviewModalOpen(false);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      {mechanics.map(mechanic => (
        <Card key={mechanic.mechanicId} variant="outlined" style={{ marginBottom: '35px' }}>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Typography variant="h5" gutterBottom>
                  {mechanic.mechanicName.charAt(0).toUpperCase() + mechanic.mechanicName.slice(1)}
                </Typography>
                <Rating name="half-rating-read" defaultValue={mechanic.averageRating} precision={0.5} readOnly />
              </div>
              <div>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<RateReviewIcon />}
                    onClick={()=>{id!=undefined ? (handleOpenReviewModal(mechanic)) : (toast.warning("Please login first"))}} // Add onClick handler to open review modal
                  >
                    Give Review
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CalendarMonthIcon />}
                    onClick={() => {id!=undefined ? (handleAppointment(mechanic)) : (toast.warning("Please login first"))}}
                  >
                    Book Appointment
                  </Button>
                </Stack>
              </div>
            </div>
            <Typography variant="body1" gutterBottom>
              Email: {mechanic.mechanicEmail}
            </Typography>
           
            <Typography variant="body1" gutterBottom>
              Address: {mechanic.mechanicAddress}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Number of reviews: {mechanic.numberOfReviews}
            </Typography>
          </CardContent>
        </Card>
      ))}
      {selectedMechanic && (
        <AppointmentModal
          open={appointmentModalOpen}
          mechanic={selectedMechanic}
          onClose={handleCloseModal}
          id={id}
        />
      )}
      <ReviewModal open={reviewModalOpen} onClose={handleCloseReviewModal} mechanic={selectedMechanic} id={id}/> {/* Render ReviewModal */}
    </div>
  );
};

export default MechanicListing;
