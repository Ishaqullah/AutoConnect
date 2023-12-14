let carDetailsData = {}; // Initialize an empty object to store car details

const setCarDetails = (data) => {
  return new Promise((resolve, reject) => {
    carDetailsData = data;
    resolve('Car details set successfully');
  });
};
console.log(carDetailsData);
const getCarDetails = () => {
  return new Promise((resolve, reject) => {
    resolve(carDetailsData);
  });
};

module.exports = { setCarDetails, getCarDetails };
