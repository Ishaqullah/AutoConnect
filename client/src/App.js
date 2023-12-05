import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { createTheme, colors, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Home from "./components/home";
import Footer from "./components/footer";
import Theme from "./components/customizedTheme";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SellCar from "./components/sellCar";
import BuyCar from "./components/BuyCar";
import UpdateProfileForm from "./components/UpdateProfileForm";
import MyAds from "./components/MyAds";
import AdDetailPage from "./components/AdDetails";
import { useState } from "react";
const theme = Theme;
function App() {
  const [id,setId]=useState('')
  const handleChildValueChange = (value) => {
    setId(value)
  };
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
              <Navbar id={id}/>
              
              <Routes>
                <Route exact path="/" element={<Home onValueChange={handleChildValueChange}/>}/>
                <Route path='/User/:id' element={<Home onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/sellCar" element={<SellCar />}/>
                <Route exact path="/sellCar/User/:id" element={<SellCar />}/>
                <Route exact path="/BuyCar" element={<BuyCar />}/>
                <Route exact path="/BuyCar/User/:id" element={<BuyCar />}/>
                <Route exact path="/UpdateProfileForm" element={<UpdateProfileForm />}/>
                <Route exact path="/UpdateProfileForm/User/:id" element={<UpdateProfileForm />}/>
                <Route exact path="/MyAds" element={<MyAds/>}/>
                <Route exact path="/AdDetails" element={<AdDetailPage/>}/>
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
