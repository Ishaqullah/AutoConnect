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
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Loader from "./loader";
const CarAd = ({ car }) => {
  const [showCarAd, setShowCarAd] = useState(false);
  const { id } = useParams();
  const { vehicleImages, ...carDetailsWithoutImages } = car;
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
  });
  const [loading, setLoading] = useState(false);
  if (id != undefined) {
    useEffect(() => {
      axios.get(`http://localhost:5278/users/getUser/${id}`).then((resp) =>
        setUserData({
          userName: resp.data.userName || "",
          userEmail: resp.data.userEmail || "",
          userPhone: resp.data.userPhone || "",
          userAddress: resp.data.userAddress || "",
        })
      );
    }, [id]);
  }
  console.log(userData);

  const handleNegotiateClick = async () => {
    try {
      // Set loading to true to show the loader
      setLoading(true);

      // Simulate a delay using setTimeout
      setTimeout(async () => {
        const response = await axios.post("http://localhost:8000/negotiate", {
          carDetails: carDetailsWithoutImages,
          userDetails: userData,
        });
        console.log("car details sent to server ");
        setShowCarAd(true);
        setLoading(false);
        // if (window.Botcopy) {
        //   window.Botcopy.clearHistory();
        //   setLoading(false);
        //   window.Botcopy.openWindow();
          
        // } else {
        //   console.error("Botcopy is not initialized");
        // }

        // Reset loading state after completing the negotiation
        
      }, 5000); // Simulate a 3-second delay
    } catch (error) {
      console.error("Error occurred while negotiating for the car:", error);

      // Reset loading state in case of an error
      
    }
  };

  const handleCloseChatBot = async () => {
    setShowCarAd(false);
  };

  const [advertiseId, setAdvertises] = useState([]);

  useEffect(() => {
    // Assuming car.vehicleID is a simple value, such as a number or a string

    axios
      .get(
        `http://localhost:5278/advertises/getAdvertiseIdByVehicleId/${car.vehicleID}`
      )
      .then((response) => setAdvertises(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, [car.vehicleID]); // Include car.vehicleID in the dependency array to react to changes

  return (
    <Grid item xs={12} sm={6} md={3} minWidth={"270px"}>
      <Loader loading={loading}/>
      <Card  >
        <Link
          to={
            id !== undefined
              ? `/AdDetails/${advertiseId}/User/${id}`
              : `/AdDetails/${advertiseId}`
          }
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={car.vehicleImages.split(", ")[0]}
            alt="Car"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <CardContent style={{  height: "150px",flex:1, display: "flex", flexDirection: "column", }}>
            <Typography variant="h6" gutterBottom>
              {car.make + " " + car.model + " " + car.variant}
            </Typography>
            <Typography variant="body2" component="p">
              {car.vehicleCity}
            </Typography>
            <br />
            <Typography variant="body2" component="p">
              {car.vehicleModelYear.substr(0, 4)} | {car.mileage} |{" "}
              {car.bodyType} | {car.engineCapacity}cc | {car.engineTransmission}
            </Typography>
           
          </CardContent>
          <CardContent>
          <Typography
              variant="h5"
              color="success.main"
              style={{ marginTop: "10px" }}
            >
              Price:{car.price} Rs
            </Typography>
          </CardContent>
         
        </Link>
        {id != undefined ? (
          <CardActions>
             
            <Button
              onClick={handleNegotiateClick}
              variant="outlined"
              color="primary"
            >
              Negotiate for this car
            </Button>
          </CardActions>
        ) : (
          <></>
        )}
      </Card>

      {showCarAd?(<div
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
      ):(<></>)
      }
    </Grid>
  );
};

export default CarAd;


{/* <Helmet>
<script
  type="text/javascript"
  id="botcopy-embedder-d7lcfheammjct"
  class="botcopy-embedder-d7lcfheammjct"
  data-botId="658b28d8d1756400082917a0"
>
  var s = document.createElement('script'); s.type =
  'text/javascript'; s.async = true; s.src =
  'https://widget.botcopy.com/js/injection.js';
  document.getElementById('botcopy-embedder-d7lcfheammjct').appendChild(s);
</script>
</Helmet> */}