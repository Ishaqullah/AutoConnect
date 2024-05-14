import React from "react";
import Header from "./header";
import AboutUsDivision from "./aboutUsDivision";
import ListedVehicles from "./listedVehicles";
import Comparision from "./comparision";
import BrowseCars from "./browseCars";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const home = ({onValueChange}) => {
 
 
  const {id} = useParams()
  useEffect(() => {
    onValueChange(id);
  }, [id, onValueChange]);

  return (
    <div>
      <Header/>
      <AboutUsDivision />
      <ListedVehicles/>
      <Comparision/>
   
    </div>
  );
};

export default home;
