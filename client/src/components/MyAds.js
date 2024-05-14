import { Card, CardContent, Container, Grid } from "@mui/material";
import React from "react";
import UserAdGrid from "./UserAdGrid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Typography,Divider} from "@mui/material";
import MyAppBar from "./MyAppBar";
const MyAds = ({onValueChange}) => {
  const { id } = useParams();
  const [advertises, setAdvertises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5278/advertises/myAds/${id}`
        );
        // console.log('API Response:', response.data);
        setAdvertises(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <MyAppBar onValueChange={onValueChange}/>
      
      <Grid container spacing={2} sx={{marginBottom:"500px"}}>
        
      <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={10}>
          <Card>
            <CardContent>
              <Container maxWidth="md" sx={{ marginTop: "50px" }}>
                <UserAdGrid carAds={advertises ?? []} />
              </Container>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
    </>
  );
};
export default MyAds;
