const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');



const port = 8000;

let carDetailsData = {}; // Initialize an empty object to store car details
let userData={};
app.use(bodyParser.json());
app.use(cors());

app.post('/negotiate', (req, res) => {
  const carDetails = req.body.carDetails; // Extract carDetails from the request body
  const userDetails = req.body.userDetails;
  carDetailsData = carDetails;
  userData=userDetails; // Set carDetails
  console.log(carDetailsData);  
  console.log(userData);
  res.status(200).send('Car details received successfully');
});

app.get('/getUserDetails',(req,res)=>{
  res.json(userData);
});
app.get('/getCarDetails', (req, res) => {
  res.json(carDetailsData); // Return stored carDetails when requested
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
