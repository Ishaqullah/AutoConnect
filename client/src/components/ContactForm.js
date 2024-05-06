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
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ChatWidget from "../ChatWidget";
import emailjs from "@emailjs/browser";
import Chat from "../chat/Chat";
import Alert from "@mui/material/Alert";
const ContactForm = ({ onValueChange }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  useEffect(() => {
    onValueChange(id);
  }, [id, onValueChange]);

  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // emailjs
    //   .sendForm('service_o590how', 'template_dgyr6yw', form.current, {
    //     publicKey: 'ZnCUom1i8FBylSvIF',
    //   })
    //   .then(
    //     () => {
    //       console.log('SUCCESS!');
    //     },
    //     (error) => {
    //       console.log('FAILED...', error.text);
    //     },
    //   );
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

  return (
    <Container sx={{ paddingTop: "80px" }}>
      <Grid container spacing={3}>
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
        <Grid item xs={12} sm={6} mt={10}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <div className="home with-small-margin">
                <div className="container with-small-margin">
                  <Chat />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} mt={10}>
          <Card
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", 
              alignItems: "center",
            }}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/Images/chat_2.png"
                  style={{
                    marginBottom: "10px",
                    height: "150px",
                    width: "150px",
                  }}
                />
                <span
                  style={{
                    color: "#7B7272",
                    fontSize: "64px",
                    fontWeight: "500",
                    fontFamily: "Maven-Pro",
                  }}
                >
                  Chat with our support team
                </span>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactForm;
