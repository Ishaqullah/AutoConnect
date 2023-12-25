import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import {Link,useParams } from "react-router-dom";
import { useEffect } from "react";

const CarAd = ({ car }) => {
  const [showCarAd, setShowCarAd] = useState(false);
  const {id}=useParams();
  const handleNegotiateClick = async () => {
    try {
      const response = await axios.post("http://localhost:8000/negotiate", {
        carDetails: car,
      });
      console.log("car details sent to server ");

      setShowCarAd(true);
    } catch (error) {
      console.error("Error occurred while negotiating for the car:", error);
    }
  };

  const handleCloseChatBot = async () => {
    setShowCarAd(false);
  };

  const [advertiseId, setAdvertises] = useState([]);

  useEffect(() => {
    // Assuming car.vehicleID is a simple value, such as a number or a string

    
    axios
      .get(`http://localhost:5278/advertises/getAdvertiseIdByVehicleId/${car.vehicleID}`)
      .then((response) => setAdvertises(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
}, [car.vehicleID]); // Include car.vehicleID in the dependency array to react to changes


  return (
    
    <Grid item xs={12} sm={6} md={4}>
      <Link to={id!==undefined?`/AdDetails/${advertiseId}/User/${id}`:`/AdDetails/${advertiseId}`} style={{textDecoration:"none" ,color:"inherit"}}>
      <Card>
        <img
          src={car.vehicleImages.split(', ')[0]}
          alt="Car"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {car.make + " " + car.model + " " + car.variant}
          </Typography>
          <Typography variant="body2" component="p">
            {car.vehicleCity}
          </Typography>
          <br />
          <Typography variant="body2" component="p">
            {car.vehicleRegistrationYear.substr(0,4)} | {car.mileage} | {car.bodyType} | {car.engineCapacity}cc |{" "}
            {car.engineTransmission}
          </Typography>
          <Typography
            variant="h5"
            color="success.main"
            style={{ marginTop: "10px" }}
          >
            Price: ${car.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleNegotiateClick}
            variant="outlined"
            color="primary"
          >
            Negotiate for this car
          </Button>
          <Button variant="outlined" color="secondary">
            Chat with seller
          </Button>
        </CardActions>
      </Card>
      {showCarAd && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "1000", // Ensure it's on top of other content
          }}
        >
          <Card>
            {/* Card content */}
            <CardContent>
              <iframe
                allow="microphone;"
                width="350"
                height="430"
                src="https://console.dialogflow.com/api-client/demo/embedded/6210cad5-f700-43a8-af42-088baaad7db5"
              ></iframe>
            </CardContent>
            {/* Actions */}
            <CardActions>
              <Button
                onClick={handleCloseChatBot}
                variant="outlined"
                color="primary"
              >
                Close
              </Button>
              {/* Add other actions */}
            </CardActions>
          </Card>
        </div>
      )}
      </Link>
    </Grid>
    
  );
};

export default CarAd;
