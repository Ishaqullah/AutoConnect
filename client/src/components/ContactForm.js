import React, { useState, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Modal,
  Box,
  Rating,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios  from "axios";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";

const ContactForm = ({ onValueChange }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(2);
  useEffect(() => {
    onValueChange(id);
  }, [id, onValueChange]);

  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const [feedBackFormData, setFeedbackFormData] = useState({
    feedback: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFeedbackFormData({ ...feedBackFormData, [name]: value });
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_o590how', 'template_dgyr6yw', form.current, {
        publicKey: 'ZnCUom1i8FBylSvIF',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

    setMessage("Email submitted");
    setTimeout(() => {
      setMessage("");
    }, 3000);
    setFormData({
      from_name: "",
      reply_to: "",
      message: "",
    });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `http://localhost:5278/users/feedback/${id}`,
        feedBackFormData
      );
      console.log("Server response:", response.data);
      toast.success("Thanks for your feedback");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert(error.message);
    }
   
    setFeedbackFormData({
      feedback: "",
      rating: 0,
    });
    console.log("User feedback", feedBackFormData.feedback, feedBackFormData.rating);
  };
  const handleFeedbackModalOpen = () => {
    setShowFeedbackModal(true);
    console.log(showFeedbackModal);
  };

  const handleFeedbackModalClose = () => {
    setShowFeedbackModal(false);
  };
  console.log()
  return (
    <Container sx={{ paddingTop: "80px" }}>
      <Grid container spacing={3}>
        {/* Feedback Button */}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {id!==undefined ? (handleFeedbackModalOpen()) : (toast.warning("Login first to give feedback "))}}
          >
            Give Feedback
          </Button>
        </Grid>

        {/* Left half for the large picture */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              {/* Your large picture here */}
              <img
                src="/Images/contact-us.png"
                alt="Large Picture"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Right half for the contact form */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "#f0f0f0", height: "100%" }}>
            <CardContent>
              {message ? <Alert severity="success">{message}</Alert> : <></>}
              <Typography variant="h5" component="h2" gutterBottom>
                Contact Us
              </Typography>
              <form ref={form} onSubmit={sendEmail}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      variant="outlined"
                      name="reply_to"
                      value={formData.reply_to}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Feedback Modal */}
      <Modal
        open={showFeedbackModal}
        onClose={handleFeedbackModalClose}
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#f0f0f0",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Card sx={{ backgroundColor: "#f0f0f0", height: "100%" }}>
            <CardContent>
              {message ? <Alert severity="success">{message}</Alert> : <></>}
              <Typography variant="h5" component="h2" gutterBottom>
                Give us feedback
              </Typography>
              <form onSubmit={submitFeedback}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={6}
                      name="feedback"
                      value={feedBackFormData.feedback}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={(event, value) => {
                        setRating(value);
                        setFeedbackFormData({ ...feedBackFormData, rating: value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Container>
  );
};

export default ContactForm;
