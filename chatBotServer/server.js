const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');



const port = 8000;

let carDetailsData = {}; // Initialize an empty object to store car details

app.use(bodyParser.json());
app.use(cors());

app.post('/negotiate', (req, res) => {
  const carDetails = req.body.carDetails; // Extract carDetails from the request body

  carDetailsData = carDetails; // Set carDetails
  console.log(carDetailsData);  
  res.status(200).send('Car details received successfully');
});

app.get('/getCarDetails', (req, res) => {
  res.json(carDetailsData); // Return stored carDetails when requested
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
