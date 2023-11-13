import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import PhotoUpload from "./photoUpload";
import CustomModal from "./modal";
const sellCar = () => {
  return (
    

            <Container maxWidth="md" sx={{marginTop:'50px',marginBottom:'50px'}}>
              <Card sx={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h6">Car Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>City</InputLabel>
                        <Select>
                          <MenuItem value="city1">City 1</MenuItem>
                          <MenuItem value="city2">City 2</MenuItem>
                          {/* Add more cities */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomModal />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Registered In</InputLabel>
                        <Select>
                          <MenuItem value="registered1">Registered 1</MenuItem>
                          <MenuItem value="registered2">Registered 2</MenuItem>
                          {/* Add more registered locations */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Exterior Color</InputLabel>
                        <Select>
                          <MenuItem value="color1">Color 1</MenuItem>
                          <MenuItem value="color2">Color 2</MenuItem>
                          {/* Add more colors */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Mileage (KM)" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Price (PKR)" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                      id="standard-multiline-flexible"
                      label="Ad Description"
                      multiline
                      maxRows={4}
                      variant="standard"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card >
                <CardContent>
                  <Typography variant="h6">Upload Photos</Typography>
                  <PhotoUpload/>
                </CardContent>
              </Card>

              <Card sx={{ marginTop: '20px' }}>
                <CardContent>
                  <Typography variant="h6">Additional Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Engine Type</InputLabel>
                        <Select>
                          <MenuItem value="engine1">Engine 1</MenuItem>
                          <MenuItem value="engine2">Engine 2</MenuItem>
                          {/* Add more engine types */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Engine Capacity (cc)" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Transmission</InputLabel>
                        <Select>
                          <MenuItem value="transmission1">
                            Transmission 1
                          </MenuItem>
                          <MenuItem value="transmission2">
                            Transmission 2
                          </MenuItem>
                          {/* Add more transmission types */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Assembly</InputLabel>
                        <Select>
                          <MenuItem value="assembly1">Assembly 1</MenuItem>
                          <MenuItem value="assembly2">Assembly 2</MenuItem>
                          {/* Add more assembly options */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <Typography>Features</Typography>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="ABS"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Air Bags"
                          />
                          {/* Add more feature checkboxes */}
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card sx={{ marginTop: '20px' }}>
                <CardContent>
                  <Typography variant="h6">Contact Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Mobile Number" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Secondary Mobile Number (Optional)"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card sx={{ marginTop: '20px' }}>
                <CardContent>
                  <Typography variant="h6">Price for Negotiation <Typography variant = "caption">(Note: The maximum & minimum prices you enter will be confidential and hidden from potential customers.)</Typography></Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Max Price (PKR)" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Min Price (PKR)" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Button variant="contained" color="secondary" sx={{marginTop:"20px"}}>
                Submit
              </Button>
            </Container>
         
  );
};

export default sellCar;
