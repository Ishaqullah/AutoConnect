import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Divider
} from "@mui/material";
import React from "react";
import SavedAdsGrid from "./SavedAdsGrid";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { MyLocation } from "@mui/icons-material";
import MyAppBar from "./MyAppBar";
import axios from "axios";
const MySavedAds = ({onValueChange}) => {
  const [advertises, setAdvertises] = useState([]);
  const {id}=useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5278/advertises/savedAdsDetails/${id}`);
        // console.log('API Response:', response.data);
        
        
        setAdvertises(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };
    
    fetchData();
  }, [id]);
  console.log(advertises);
  return (
        <>
        <MyAppBar onValueChange={onValueChange}/>
        
        <Grid container spacing={2} sx={{marginBottom:"500px"}}>
          
        <Grid item xs={2}>
            <Card sx={{ textAlign: "center" }}>
              <CardContent>
                <Typography component="div">
                  <Typography component="div">Active Ads</Typography>
                  <Divider sx={{ margin: "10px 0" }} />
                </Typography>
                <Typography component="div">
                  <Typography component="div">Removed Ads</Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10}>
            <Card>
              <CardContent>
                <Container maxWidth="md" sx={{ marginTop: "50px" }}>
                  <SavedAdsGrid carAds={advertises ?? []} />
                </Container>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
      </>
  );
};
export default MySavedAds;
