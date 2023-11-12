import React from "react";
import Header from "./header";
import AboutUsDivision from "./aboutUsDivision";
import ListedVehicles from "./listedVehicles";
import Comparision from "./comparision";
import BrowseCars from "./browseCars";
const home = () => {
  return (
    <div>
      <Header/>
      <AboutUsDivision />
      <ListedVehicles/>
      <Comparision/>
      <BrowseCars/>
    </div>
  );
};

export default home;
