import React from "react";
// import "./App.css";
import Navbar from "./components/navbar";
import "./style.scss";
import { ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Home from "./components/home";
import Footer from "./components/footer";
import Theme from "./components/customizedTheme";
import { BrowserRouter as Router, Routes, Route,useNavigate} from "react-router-dom";
import SellCar from "./components/sellCar";
import BuyCar from "./components/BuyCar";
import UpdateProfileForm from "./components/UpdateProfileForm";
import MyAds from "./components/MyAds";
import AdDetailPage from "./components/AdDetails";
import AboutUsPage from "./components/AboutUsPage";
import ContactForm from "./components/ContactForm";
import ChatBox from "./components/ChatBox";
import { useState,useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import MyAppBar from "./components/MyAppBar";
import MySavedAds from "./components/MySavedAds";
import AllComparisions from "./components/allComparisions";
import {supabase} from "./lib/supabase";
import {AuthContext} from "./context/AuthContext";

const theme = Theme;
function App() {
  const [id,setId]=useState('')
  const navigate = useNavigate();
  const [advertiseId,setAdvertiseId]=useState('')


  useEffect (()=>{
    const fetchAds = async () =>{
      let { data: advertise, error } = await supabase.from('advertise').select('*')
    
      console.log("error from supabase",error);
      console.log("ads from supabase",advertise)
    };
fetchAds();
   
  },[]);
          

  // const {userId}=useParams();
  // console.log(userId);
  // if (id===''){
  //   setId(userId);
  // }
  const  currentUser  = useContext(AuthContext);
  console.log("The details of current user logged in",currentUser)
  useEffect(() => {
    // Check if user is logged in (you can replace this with your authentication logic)
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    const userId = window.localStorage.getItem("userId");
    // If the user is logged in, redirect to localhost:3000/User/1
    if (isLoggedIn) {
      navigate(`/User/${userId}`);
    }
  },[]);
  const handleChildValueChange = (value) => {
    setId(value)
  };

  const handleTwoChildValueChanges = (value,advertiseId) => {
    setId(value);
    setAdvertiseId(advertiseId);
  };
  // useEffect(() => {
  //   // This code will run when the component mounts
  //   window.location.reload();
  // }, []);

  
  return (
   
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
                <Route exact path="/sellCar/User/:id" element={<SellCar onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/sellCar/User/:id/:advertiseId" element={<SellCar onValueChange={handleTwoChildValueChanges} />}/>
                <Route exact path="/BuyCar" element={<BuyCar onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/BuyCar/User/:id" element={<BuyCar onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/UpdateProfileForm/User/:id" element={<UpdateProfileForm onValueChange={handleChildValueChange}/>}/>
                <Route exact path= "/MySavedAds/User/:id" element={<MySavedAds onValueChange={handleChildValueChange}/>}/> 
                <Route exact path="/MyAds/User/:id" element={<MyAds onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/MyApp/User/:id" element={<MyAppBar onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/AdDetails/:advertiseId" element={<AdDetailPage onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/AdDetails/:advertiseId/User/:id" element={<AdDetailPage onValueChange={handleTwoChildValueChanges} />}/>
                <Route exact path="/About" element={<AboutUsPage onValueChange={handleChildValueChange} />}/>
                <Route exact path="/Contact" element={<ContactForm onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/About/User/:id" element={<AboutUsPage onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/Contact/User/:id" element={<ContactForm onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/Comparisions/User/:id" element={<AllComparisions onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/Comparisions" element={<AllComparisions onValueChange={handleChildValueChange}/>}/>
                <Route exact path="/ChatBox/User/:id" element={<ChatBox onValueChange={handleChildValueChange}/>}/>
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
   
  );
}

export default App;
