import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { createTheme, colors, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Comparision from "./components/comparision";
import ListedVehicles from "./components/listedVehicles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#9D1515",
    },
    primary: {
      main: "#7B7272",
      light: "#969595",
      dark: "#2E2D31",
    },
    success: {
      main: "#42A432",
    },
  },
  typography: {
    fontFamily: '"Maven Pro", sans-serif', // Use "Maven Pro" as the default font
  },
});
function App() {
  return (
    <Grid container>
      <Grid item xs={1}>
        <item></item>
      </Grid>

      <Grid item xs={10}>
        <ThemeProvider theme={theme}>
          <Navbar />
          <ListedVehicles />
          <Comparision />
        </ThemeProvider>
      </Grid>

      <Grid item xs={1}>
        <item></item>
      </Grid>
    </Grid>
  );
}

export default App;
