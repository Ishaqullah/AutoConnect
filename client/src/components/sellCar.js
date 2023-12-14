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
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import { useEffect } from "react";
const sellCar = () => {
  const [formData, setFormData] = useState({
    vehicleId:'',
    images: "",
    selectedCity: "",
    make: "",
    model: "",
    variant: "",
    modelYear: "",
    features: "",
    registeredCity: "",
    registeredYear: "",
    color: "",
    mileage: "",
    price: "",
    bodyType: "",
    description: "",
    engineCapacity:"",
    engineTransmission: "",
    assembly: "",
    minPrice: "",
    maxPrice: "",
  });
  const {id,advertiseId} = useParams()
  console
  const navigate = useNavigate()
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (feature) => {
    setFormData((prevData) => {
      const currentFeatures = prevData.features
        ? prevData.features.split(',').map((f) => f.trim())
        : [];

      const updatedFeatures = currentFeatures.includes(feature)
        ? currentFeatures.filter((f) => f !== feature)
        : [...currentFeatures, feature];

      const updatedFeaturesString = updatedFeatures.length > 0
        ? updatedFeatures.join(', ')
        : '';

      return {
        ...prevData,
        features: updatedFeaturesString,
      };
    });
  };
  const handleReceiveImages = (imagesData) => {
    const imagesCSV = imagesData.map((image) => image.url).join(', ');
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: imagesCSV,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (id != undefined)
      {
        const response = await axios.post(
          `http://localhost:5278/advertises/submitAdvertises/${id}`,
          formData
        );
        console.log("Server response:", response.data);
        navigate(`/User/${id}`);
      }
      else{
        alert("Please signup or login to post Advertisements!")
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5278/vehicles/updateVehicle/${formData.vehicleId}`, formData)
      .then((resp) => {
        console.log("Vehicle updated successfully:", resp.data);
        navigate(`/User/${id}`);
      })
      .catch((error) => {
        console.error("Error updating vehicle:", error);
      });
  };

  useEffect(() => {
    
      axios
        .get(`http://localhost:5278/advertises/getVehicles/${advertiseId}`)
        .then((response) => {
          console.log(response.data)
          setFormData({
            vehicleId: response.data.vehicleID || "",
            images: response.data.vehicleImages || "",
            selectedCity: response.data.vehicleCity || "",
            make: response.data.make || "",
            model: response.data.model || "",
            variant: response.data.variant || "",
            modelYear: response.data.vehicleModelYear || "",
            features: response.data.features || "",
            registeredCity: response.data.vehicleRegistrationCity || "",
            registeredYear: response.data.vehicleRegistrationYear || "",
            color: response.data.colour || "",
            mileage: response.data.mileage || "",
            price: response.data.price || "",
            bodyType: response.data.bodyType || "",
            description: response.data.description || "",
            engineCapacity: response.data.engineCapacity || "",
            engineTransmission: response.data.engineTransmission || "",
            assembly: response.data.assembly || "",
            minPrice: response.data.minPrice || "",
            maxPrice: response.data.maxPrice || "",
          });
          
          console.log(response.data);
        })
        .catch((error) => console.error("Error fetching vehicle:", error));
    
  }, [id,advertiseId]);

  return (
    <form onSubmit={id && advertiseId? handleUpdate: handleSubmit}>
      <Container maxWidth="md" sx={{ marginTop: "50px", marginBottom: "50px" }}>
        <Card sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6">Car Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="selectedCity"
                    value={formData.selectedCity}
                    onChange={handleChange}
                  >
                    <MenuItem value="Karachi">Karachi</MenuItem>
                    <MenuItem value="Lahore">Lahore</MenuItem>
                    <MenuItem value="Multan">Multan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                {/* <CustomModal /> */}
                <FormControl fullWidth>
                  <InputLabel>Make</InputLabel>
                  <Select
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                  >
                    <MenuItem value="Honda">Honda</MenuItem>
                    <MenuItem value="Toyota">Toyota</MenuItem>
                    <MenuItem value="Nissan">Nissan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                {/* <CustomModal /> */}
                <FormControl fullWidth>
                  <InputLabel>Model</InputLabel>
                  <Select
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  >
                    <MenuItem value="HRV">HRV</MenuItem>
                    <MenuItem value="Corolla">Corolla</MenuItem>
                    <MenuItem value="X-Trail">X-Trail</MenuItem>
                    {/* Add more registered locations */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                {/* <CustomModal /> */}
                <FormControl fullWidth>
                  <InputLabel>Variant</InputLabel>
                  <Select
                    name="variant"
                    value={formData.variant}
                    onChange={handleChange}
                  >
                    <MenuItem value="VTI">VTI</MenuItem>
                    <MenuItem value="GLI">GLI</MenuItem>
                    <MenuItem value="SE">SE</MenuItem>
                    {/* Add more registered locations */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Model Year</InputLabel>
                  <Select
                    name="modelYear"
                    value={formData.modelYear}
                    onChange={handleChange}
                  >
                    <MenuItem value="2021-01-01">2021-01-01</MenuItem>
                    <MenuItem value="2022-05-01">2022-05-01</MenuItem>
                    <MenuItem value="2020-08-01">2020-08-01</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Registered In (Year)</InputLabel>
                  <Select
                    name="registeredYear"
                    value={formData.registeredYear}
                    onChange={handleChange}
                  >
                    <MenuItem value="2021-01-01">2021-01-01</MenuItem>
                    <MenuItem value="2022-05-01">2022-05-01</MenuItem>
                    <MenuItem value="2020-08-01">2020-08-01</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Registered In (City)</InputLabel>
                  <Select
                    name="registeredCity"
                    value={formData.registeredCity}
                    onChange={handleChange}
                  >
                    <MenuItem value="Karachi">Karachi</MenuItem>
                    <MenuItem value="Multan">Multan</MenuItem>
                    <MenuItem value="Lahore">Lahore</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Exterior Color</InputLabel>
                  <Select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  >
                    <MenuItem value="Red">Red</MenuItem>
                    <MenuItem value="Blue">Blue</MenuItem>
                    <MenuItem value="Silver">Silver</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mileage (KM)"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price (PKR)"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-multiline-flexible"
                  label="Ad Description"
                  multiline
                  maxRows={4}
                  variant="standard"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Upload Photos</Typography>
            <PhotoUpload onImagesChange={handleReceiveImages}/>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h6">Additional Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Body Type</InputLabel>
                  <Select
                    name="bodyType"
                    value={formData.bodyType}
                    onChange={handleChange}
                  >
                    <MenuItem value="SUV">SUV</MenuItem>
                    <MenuItem value="Sedan">Sedan</MenuItem>
                    {/* Add more engine types */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Engine Capacity (cc)" name="engineCapacity"
                  value={formData.engineCapacity}
                  onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Transmission</InputLabel>
                  <Select
                    name="engineTransmission"
                    value={formData.engineTransmission}
                    onChange={handleChange}
                  >
                    <MenuItem value="Automatic">Automatic</MenuItem>
                    <MenuItem value="Manual">Manual</MenuItem>
                    {/* Add more transmission types */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Assembly</InputLabel>
                  <Select
                    name="assembly"
                    value={formData.assembly}
                    onChange={handleChange}
                  >
                    <MenuItem value="Japan">Japan</MenuItem>
                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    {/* Add more assembly options */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography>Features</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes("ABS")}
                          onChange={() => handleCheckboxChange("ABS")}
                        />
                      }
                      label="ABS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes("Air Bags")}
                          onChange={() => handleCheckboxChange("Air Bags")}
                        />
                      }
                      label="Air Bags"
                    />
                    {/* Add more feature checkboxes */}
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: "20px" }}>
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

        <Card sx={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h6">
              Price for Negotiation{" "}
              <Typography variant="caption">
                (Note: The maximum & minimum prices you enter will be
                confidential and hidden from potential customers.)
              </Typography>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Max Price (PKR)"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Min Price (PKR)"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </Container>
    </form>
  );
};

export default sellCar;
