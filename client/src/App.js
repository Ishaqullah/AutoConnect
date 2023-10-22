import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { createTheme, colors, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Comparision from "./components/comparision";
import ListedVehicles from "./components/listedVehicles";
import Header from "./components/header";
import AboutUs from "./components/aboutUsDivision";
import Browse from "./components/browseCars";
import Footer from "./components/footer";
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
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
          
        
        <main style={{ flex: 1 }}>
          <Grid container>
            <Grid item xs={1}>
              {/* Left empty for spacing */}
            </Grid>

            <Grid item xs={10}>
              <Navbar />
              <Header />
              <AboutUs />
              <ListedVehicles />
              <Comparision />
              <Browse />
            </Grid>

            <Grid item xs={1}>
              {/* Right empty for spacing */}
            </Grid>
          </Grid>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
