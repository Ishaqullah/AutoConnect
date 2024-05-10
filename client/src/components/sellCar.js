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
  CircularProgress,
} from "@mui/material";
import PhotoUpload from "./photoUpload";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import { useEffect } from "react";
import { Country, State, City } from "country-state-city";
import Loader from "./loader"
import { toast } from "react-toastify";
const sellCar = ({ onValueChange }) => {
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [bodyType, setBodyType] = useState(null);
  const [variant, setVariant] = useState(null);
  const [modelYear, setModelYear] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
    engineCapacity: "",
    engineTransmission: "",
    assembly: "",
    minPrice: "",
    maxPrice: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://car-api2.p.rapidapi.com/api/makes",
        params: {
          sort: "id",
          direction: "asc",
          year: "2020",
          verbose: "yes",
        },
        headers: {
          "X-RapidAPI-Key":
            "cf6e6ca279mshd5ef3a24af2beeep19575djsn60dbef1c6631",
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
        },
      };
      try {
        axios.request(options).then((response) => {
          console.log(response.data);
          setMake(response.data);
          console.log("hello ", make);
        });
      } catch (error) {
        console.error(error);
        // Handle errors if any
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://car-api2.p.rapidapi.com/api/models",
        params: {
          sort: "id",
          direction: "asc",
          year: "2020",
          verbose: "yes",
          make: `${formData.make}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "cf6e6ca279mshd5ef3a24af2beeep19575djsn60dbef1c6631",
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
        },
      };
      try {
        axios.request(options).then((response) => {
          console.log(response.data);
          setModel(response.data);
          // console.log("hello ",make);
        });
      } catch (error) {
        console.error(error);
        // Handle errors if any
      }
    };

    fetchData();
  }, [formData.make]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://car-api2.p.rapidapi.com/api/vehicle-attributes",
        params: {
          attribute: "bodies.type",
        },

        headers: {
          "X-RapidAPI-Key":
            "cf6e6ca279mshd5ef3a24af2beeep19575djsn60dbef1c6631",
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
        },
      };
      try {
        axios.request(options).then((response) => {
          console.log(response.data);
          setBodyType(response.data);
          // console.log("hello ",make);
        });
      } catch (error) {
        console.error(error);
        // Handle errors if any
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://car-api2.p.rapidapi.com/api/trims",
        params: {
          direction: "asc",
          sort: "id",
          year: "2020",
          verbose: "yes",
          make: `${formData.make}`,
          model: `${formData.model}`,
        },

        headers: {
          "X-RapidAPI-Key":
            "cf6e6ca279mshd5ef3a24af2beeep19575djsn60dbef1c6631",
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
        },
      };
      try {
        axios.request(options).then((response) => {
          console.log(response.data);
          setVariant(response.data);
          // console.log("hello ",make);
        });
      } catch (error) {
        console.error(error);
        // Handle errors if any
      }
    };

    fetchData();
  }, [formData.make, formData.model]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://car-api2.p.rapidapi.com/api/years",
        params: {
          make: `${formData.make}`,
          model: `${formData.model}`,
        },

        headers: {
          "X-RapidAPI-Key":
            "cf6e6ca279mshd5ef3a24af2beeep19575djsn60dbef1c6631",
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
        },
      };
      try {
        axios.request(options).then((response) => {
          console.log(response.data);
          setModelYear(response.data);
          // console.log("hello ",make);
        });
      } catch (error) {
        console.error(error);
        // Handle errors if any
      }
    };

    fetchData();
  }, [formData.make, formData.model]);

  const cities = City.getCitiesOfCountry("PK");
  const countries = Country.getAllCountries();
  // console.log(countries);
  const { id, advertiseId } = useParams();
  useEffect(() => {
    onValueChange(id, advertiseId);
  }, [id, onValueChange]);

  const navigate = useNavigate();
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
        ? prevData.features.split(",").map((f) => f.trim())
        : [];

      const updatedFeatures = currentFeatures.includes(feature)
        ? currentFeatures.filter((f) => f !== feature)
        : [...currentFeatures, feature];

      const updatedFeaturesString =
        updatedFeatures.length > 0 ? updatedFeatures.join(", ") : "";

      return {
        ...prevData,
        features: updatedFeaturesString,
      };
    });
  };
  const handleReceiveImages = (imagesData) => {
    const imagesCSV = imagesData.map((image) => image.url).join(", ");
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: imagesCSV,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      if (id != undefined) {
        const response = await axios.post(
          `http://localhost:5278/advertises/submitAdvertises/${id}`,
          formData
        );
        toast.success("Add posted successfully")
        navigate(`/User/${id}`);
      } else {
        alert("Please signup or login to post Advertisements!");
      }
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:5278/vehicles/updateVehicle/${formData.vehicleId}`,
        formData
      )
      .then((resp) => {
        toast.success("Add Updated successfully")
        navigate(`/MyAds/User/${id}`);
      })
      .catch((error) => {
        toast.error("Error updating vehicle:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5278/advertises/getVehicles/${advertiseId}`)
      .then((response) => {
        console.log(response.data);
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
          mileage: String(response.data.mileage) || "",
          price: String(response.data.price) || "",
          bodyType: response.data.bodyType || "",
          description: response.data.description || "",
          engineCapacity: response.data.engineCapacity || "",
          engineTransmission: response.data.engineTransmission || "",
          assembly: response.data.assembly || "",
          minPrice: String(response.data.minPrice) || "",
          maxPrice: String(response.data.maxPrice) || "",
        });

        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching vehicle:", error));
  }, [id, advertiseId]);

  if (
    make == null ||
    model == null ||
    bodyType == null ||
    variant === null ||
    modelYear === null 
  ) {
    return (
      // Show full-page overlay with CircularProgress when loading state is true
      <Loader loading={true}></Loader>
    );
  }
  // console.log(make.data);
  return (
    <form onSubmit={id && advertiseId ? handleUpdate : handleSubmit}>
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
                    required
                  >
                    {cities.map((city, index) => (
                      <MenuItem key={index} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
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
                    required
                  >
                    {make.data.map((m, index) => (
                      <MenuItem key={index} value={m.name}>
                        {m.name}
                      </MenuItem>
                    ))}
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
                    required
                  >
                    {model.data.map((mod, index) => (
                      <MenuItem key={index} value={mod.name}>
                        {mod.name}
                      </MenuItem>
                    ))}
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
                    required
                  >
                    {variant.data.map((v, index) => (
                      <MenuItem key={index} value={v.description}>
                        {v.description}
                      </MenuItem>
                    ))}
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
                    required
                  >
                    {modelYear.map((m, index) => (
                      <MenuItem key={index} value={m.toString()}>
                        {m}
                      </MenuItem>
                    ))}
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
                    required
                  >
                    {modelYear.map((m, index) => (
                      <MenuItem key={index} value={m.toString()}>
                        {m}
                      </MenuItem>
                    ))}
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
                    required
                  >
                    {cities.map((city, index) => (
                      <MenuItem key={index} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
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
                    required
                  >
                    <MenuItem value="Red">Red</MenuItem>
                    <MenuItem value="Blue">Blue</MenuItem>
                    <MenuItem value="Silver">Silver</MenuItem>
                    <MenuItem value="Green">Green</MenuItem>
                    <MenuItem value="Yellow">Yellow</MenuItem>
                    <MenuItem value="Purple">Purple</MenuItem>
                    <MenuItem value="Orange">Orange</MenuItem>
                    <MenuItem value="Pink">Pink</MenuItem>
                    <MenuItem value="Cyan">Cyan</MenuItem>
                    <MenuItem value="Magenta">Magenta</MenuItem>
                    <MenuItem value="Brown">Brown</MenuItem>
                    <MenuItem value="Gray">Gray</MenuItem>
                    <MenuItem value="White">White</MenuItem>
                    <MenuItem value="Black">Black</MenuItem>
                    <MenuItem value="Teal">Teal</MenuItem>
                    <MenuItem value="Navy">Navy</MenuItem>
                    <MenuItem value="Olive">Olive</MenuItem>
                    <MenuItem value="Maroon">Maroon</MenuItem>
                    <MenuItem value="Lime">Lime</MenuItem>
                    <MenuItem value="Indigo">Indigo</MenuItem>
                    <MenuItem value="Turquoise">Turquoise</MenuItem>
                    <MenuItem value="Violet">Violet</MenuItem>
                    <MenuItem value="Aquamarine">Aquamarine</MenuItem>
                    <MenuItem value="Coral">Coral</MenuItem>
                    <MenuItem value="Gold">Gold</MenuItem>
                    <MenuItem value="Khaki">Khaki</MenuItem>
                    <MenuItem value="Lavender">Lavender</MenuItem>
                    <MenuItem value="Salmon">Salmon</MenuItem>
                    <MenuItem value="Tan">Tan</MenuItem>
                    <MenuItem value="Tomato">Tomato</MenuItem>
                    <MenuItem value="Wheat">Wheat</MenuItem>
                    <MenuItem value="Azure">Azure</MenuItem>
                    <MenuItem value="Crimson">Crimson</MenuItem>
                    <MenuItem value="Fuchsia">Fuchsia</MenuItem>
                    <MenuItem value="Ivory">Ivory</MenuItem>
                    <MenuItem value="Lemon">Lemon</MenuItem>
                    <MenuItem value="Plum">Plum</MenuItem>
                    <MenuItem value="Ruby">Ruby</MenuItem>
                    <MenuItem value="Slate">Slate</MenuItem>
                    <MenuItem value="Sage">Sage</MenuItem>
                    <MenuItem value="Ochre">Ochre</MenuItem>
                    <MenuItem value="Auburn">Auburn</MenuItem>
                    <MenuItem value="Bronze">Bronze</MenuItem>
                    <MenuItem value="Copper">Copper</MenuItem>
                    <MenuItem value="Emerald">Emerald</MenuItem>
                    <MenuItem value="Mauve">Mauve</MenuItem>
                    <MenuItem value="Peach">Peach</MenuItem>
                    <MenuItem value="Pearl">Pearl</MenuItem>
                    <MenuItem value="Periwinkle">Periwinkle</MenuItem>
                    <MenuItem value="Scarlet">Scarlet</MenuItem>
                    <MenuItem value="Tangerine">Tangerine</MenuItem>
                    <MenuItem value="Topaz">Topaz</MenuItem>
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
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price (PKR)"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
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
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Upload Photos</Typography>
            <PhotoUpload onImagesChange={handleReceiveImages} />
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
                    required
                  >
                      {bodyType.map((body, index) => (
                        <MenuItem key={index} value={body}>
                          {body}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Engine Capacity (cc)"
                  name="engineCapacity"
                  value={formData.engineCapacity}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Transmission</InputLabel>
                  <Select
                    name="engineTransmission"
                    value={formData.engineTransmission}
                    onChange={handleChange}
                    required
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
                    required
                  >
                    {countries.map((c, index) => (
                      <MenuItem key={index} value={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                   
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes("GPS Navigation")}
                          onChange={() =>
                            handleCheckboxChange("GPS Navigation")
                          }
                        />
                      }
                      label="GPS Navigation"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes("Sunroof")}
                          onChange={() => handleCheckboxChange("Sunroof")}
                        />
                      }
                      label="Sunroof"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes("Keyless Entry")}
                          onChange={() => handleCheckboxChange("Keyless Entry")}
                        />
                      }
                      label="Keyless Entry"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes(
                            "Parking Sensors"
                          )}
                          onChange={() =>
                            handleCheckboxChange("Parking Sensors")
                          }
                        />
                      }
                      label="Parking Sensors"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes("Leather Seats")}
                          onChange={() => handleCheckboxChange("Leather Seats")}
                        />
                      }
                      label="Leather Seats"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes("Heated Seats")}
                          onChange={() => handleCheckboxChange("Heated Seats")}
                        />
                      }
                      label="Heated Seats"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes(
                            "Bluetooth Connectivity"
                          )}
                          onChange={() =>
                            handleCheckboxChange("Bluetooth Connectivity")
                          }
                        />
                      }
                      label="Bluetooth Connectivity"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes("Cruise Control")}
                          onChange={() =>
                            handleCheckboxChange("Cruise Control")
                          }
                        />
                      }
                      label="Cruise Control"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes(
                            "Rearview Camera"
                          )}
                          onChange={() =>
                            handleCheckboxChange("Rearview Camera")
                          }
                        />
                      }
                      label="Rearview Camera"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes("Fog Lights")}
                          onChange={() => handleCheckboxChange("Fog Lights")}
                        />
                      }
                      label="Fog Lights"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes(
                            "Collision Detection"
                          )}
                          onChange={() =>
                            handleCheckboxChange("Collision Detection")
                          }
                        />
                      }
                      label="Collision Detection"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.features.includes(
                            "Lane Departure Warning"
                          )}
                          onChange={() =>
                            handleCheckboxChange("Lane Departure Warning")
                          }
                        />
                      }
                      label="Lane Departure Warning"
                    />
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
