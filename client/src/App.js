import React from "react";
// import "./App.css";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@mui/material";
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
import AboutUsPage from "./components/AboutUsPage";
import ContactForm from "./components/ContactForm";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import MyAppBar from "./components/MyAppBar";
import MySavedAds from "./components/MySavedAds";
const theme = Theme;
function App() {
  const [id,setId]=useState('')
  // const {userId}=useParams();
  // console.log(userId);
  // if (id===''){
  //   setId(userId);
  // }
  const handleChildValueChange = (value) => {
    setId(value)
  };
  // useEffect(() => {
  //   // This code will run when the component mounts
  //   window.location.reload();
  // }, []);

  
  return (
    <Router>
    <ThemeProvider theme={Theme}>
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
                <Route exact path='/User/:id' element={<Home onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/sellCar" element={<SellCar />}/>
                <Route exact path="/sellCar/User/:id" element={<SellCar />}/>
                <Route exact path="/sellCar/User/:id/:advertiseId" element={<SellCar />}/>
                <Route exact path="/BuyCar" element={<BuyCar />}/>
                <Route exact path="/BuyCar/User/:id" element={<BuyCar />}/>
                <Route exact path="/UpdateProfileForm" element={<UpdateProfileForm />}/>
                <Route exact path="/UpdateProfileForm/User/:id" element={<UpdateProfileForm />}/>
                {/* <Route exact path="/MyAds" element={<MyAds/>}/> */}
                <Route exact path= "/MySavedAds/User/:id" element={<MySavedAds/>}/>
                <Route exact path="/MyAds/User/:id" element={<MyAds/>}/>
                <Route exact path="/MyApp/User/:id" element={<MyAppBar/>}/>
                <Route exact path="/AdDetails/:advertiseId" element={<AdDetailPage/>}/>
                <Route exact path="/AdDetails/:advertiseId/User/:id" element={<AdDetailPage/>}/>
                <Route exact path="/About" element={<AboutUsPage/>}/>
                <Route exact path="/Contact" element={<ContactForm/>}/>
                <Route exact path="/About/User/:id" element={<AboutUsPage/>}/>
                <Route exact path="/Contact/User/:id" element={<ContactForm/>}/>
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
