import React, { useState } from "react";
import {
  Modal,
  Typography,
  TextField,
  Button,
  Rating,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "axios";
const ReviewModal = ({ open, onClose, id, mechanic }) => {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    review: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `http://localhost:5278/mechanics/ratings/${mechanic.mechanicId}/${id}`,
        formData
      );
      console.log("Server response:", response.data);
      toast.success("Thanks for your review");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Sorry try again");
    }

    setFormData({
      review: "",
      rating: 0,
    });
    setRating(0);
    onClose();
  };

  return (
    
      <Modal open={open} onClose={onClose}>
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
          <Typography variant="h6" gutterBottom>
            Leave a Review
          </Typography>
          <form onSubmit={handleSubmit}>
          <TextField
            name="review"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Write your review"
            value={formData.review}
            onChange={handleChange}
            style={{ marginBottom: 20 }}
          />
          <Typography variant="body1" gutterBottom>
            Rate your experience
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, value) => {
              setRating(value);
              setFormData({ ...formData, rating: value });
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary"  type="submit">
              Submit
            </Button>
          </div>
          </form>
        </div>
        
      </Modal>
  
  );
};

export default ReviewModal;
