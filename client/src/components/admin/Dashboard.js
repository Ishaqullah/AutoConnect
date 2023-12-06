import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SideNavBar from "./SideNavBar";
import UsersTable from "./UsersTable";
import SearchBar from "./SearchBar";
const Dashboard = () => {
  


  return (
    <>
    <SearchBar/>
    <UsersTable/>
    </>
  );
};

export default Dashboard;
