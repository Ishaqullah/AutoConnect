const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3002;

app.use(bodyParser.json());

app.post("/dialogflow-webhook", async (req, res) => {
  try {
    // Fetch carDetails from server.js
    const carDetailsResponse = await axios.get(
      "http://localhost:8000/getCarDetails"
    );
    const receivedCarDetails = carDetailsResponse.data;

    const intentName = req.body.queryResult.intent.displayName; // Extract intent name from the request
    let responseMessage=`Here are the details for the car you are looking for \n Name:${receivedCarDetails.name} \n  Location:${receivedCarDetails.location} \n Year:${receivedCarDetails.year} \n Mileage:${receivedCarDetails.fueltype} `;    
    let fulfillmentMessage = "";

    // Your logic to construct the fulfillment message using receivedCarDetails and intentName
    if (intentName === "Request-Car-Details") {
      fulfillmentMessage = responseMessage;
    } else {
      fulfillmentMessage = "Default fulfillment message";
    }

    const response = {
      fulfillmentText: fulfillmentMessage,
    };

    res.json(response);
  } catch (error) {
    res.status(500).send("Error fetching car details");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
