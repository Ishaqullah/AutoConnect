import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import ChatBot from "./ChatBot";

const CarAd = ({ car }) => {
  const [showCarAd, setShowCarAd] = useState(false);
  const { id } = useParams();
  const [advertiseId, setAdvertises] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5278/advertises/getAdvertiseIdByVehicleId/${car.vehicleID}`
      )
      .then((response) => setAdvertises(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, [car.vehicleID]); // Include car.vehicleID in the dependency array to react to changes

  return (
    <Grid item xs={12} sm={6} md={3} minWidth={"270px"}>
     
      <Card>
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
          <CardContent
            style={{
              height: "150px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
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
       
      </Card>

      {showCarAd ? (
        <ChatBot user={userData} 
        handleClose={() => setShowCarAd(false)} />
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default CarAd;

{
  /* <Helmet>
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
</Helmet> */
}
