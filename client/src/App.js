import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { createTheme, colors, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Home from "./components/home";
import Footer from "./components/footer";
import Theme from "./components/customizedTheme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SellCar from "./components/sellCar";
const theme = Theme;
function App() {
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <main style={{ flex: 1 }}>
          <Grid container>
            <Grid item xs={1}>
              {/* Left empty for spacing */}
            </Grid>

            <Grid item xs={10}>
              <Navbar />
              
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/sellCar" element={<SellCar />}/>
              </Routes>
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
    </Router>
  );
}

export default App;
