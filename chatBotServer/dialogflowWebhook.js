const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3002;

app.use(bodyParser.json());

let discountRequests = 0; // Counter to track discount requests
let prevDiscount=0;
app.post("/dialogflow-webhook", async (req, res) => {
  try {
    
    const carDetailsResponse = await axios.get(
      "http://localhost:8000/getCarDetails"
    );

    const userDetailsResponse = await axios.get(
      "http://localhost:8000/getUserDetails"
    );
    const receivedCarDetails = carDetailsResponse.data;
    const receivedUserDetails= userDetailsResponse.data;
    const intentName = req.body.queryResult.intent.displayName; 
    let responseMessage = `Here are the details for the car you are looking for \n Make:${receivedCarDetails.make} \n  Location:${receivedCarDetails.vehicleCity} \n Year:${receivedCarDetails.vehicleModelYear} \n Mileage:${receivedCarDetails.mileage} \n Model:${receivedCarDetails.model} \n Variant:${receivedCarDetails.variant} \n Engine Tranmission:${receivedCarDetails.engineTransmission} \n Features:${receivedCarDetails.features} \n Price:${receivedCarDetails.price}`;
    let fulfillmentMessage = "";

    
    if(intentName=="Default Welcome Intent"){
      fulfillmentMessage=`Hello ${receivedUserDetails.userName}! Excited to negotiate for a new ride? Let's dive into the details and work out a great offer.`
    }
    else if (intentName === "Request-Car-Details") {
      fulfillmentMessage = responseMessage;
    } else if (intentName === "negotitation-intent") {
      if (discountRequests > 2) {
        
        const minPrice = receivedCarDetails.minPrice; 
        let currentPrice = parseFloat(receivedCarDetails.price);
        if(prevDiscount!=0){
          currentPrice=prevDiscount;
        }
        
        let discountedPrice = currentPrice - (currentPrice * (Math.random() * (0.1 - 0.05) + 0.05)); 
        discountedPrice = Math.max(minPrice, discountedPrice);
        
        fulfillmentMessage = `We understand your interest! The special discounted price for this car is $${discountedPrice.toFixed(2)}. Are you interested in this offer?`;
        discountRequests=0;
        prevDiscount=discountRequests;
      } else {
        // console.log("hello");
        // Resistance messages to persuade users to purchase at the same price
        const resistanceMessages = [
          "This car is worth every penny for its incredible features and quality.",
          "The value this car provides at its current price is unparalleled.",
          "You won't find a better deal elsewhere for a car of this caliber.",
          
        ];
        const randomResistanceMessage = resistanceMessages[Math.floor(Math.random() * resistanceMessages.length)];
        fulfillmentMessage = randomResistanceMessage;
        
      }
      discountRequests++;
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
