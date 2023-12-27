import React from 'react'
import { Avatar, IconButton } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import PaymentIcon from "@mui/icons-material/Payment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import {
    Card,
    CardContent,
    Typography,
    Container,
    Grid,
    AppBar,
    Toolbar,
  } from "@mui/material";
import { useEffect ,useState} from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';  
import { Link } from 'react-router-dom';
import {CircularProgress} from '@mui/material';
const MyAppBar = ({onValueChange}) => {
    const [user, setUser] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        onValueChange(id);
      }, [id, onValueChange]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5278/users/getUser/${id}`);
            // console.log('API Response:', response.data);
            setUser(response.data);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        
        fetchData();
      }, [id]);
    if(user==null)
    {
      return(
        <CircularProgress/>
      )
    }     
  return (
    <Container sx={{marginTop:"50px",marginBottom:"50px"}}>
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                {/* Avatar */}
                <Grid item>
                  <Avatar
                    alt="Profile Picture"
                    src="/Images/1.png"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "10px",
                      marginLeft: "50px",
                    }}
                  />
                </Grid>
                {/* Typography */}
                <Grid item>
                  <Typography variant="h5" component="div">
                    {user.userName}
                  </Typography>
                  <Typography component={Link} to={`/UpdateProfileForm/User/${id}`} color="text.secondary">
                    <u>Edit Profile</u> | <u>Change Password</u>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <AppBar
            position="static"
            sx={{ color: "primary.main" }}
            color="default"
          >
            <Toolbar style={{ display: "flex", justifyContent: "center" }}>
              <LocalOfferIcon />
              <Typography
                variant="h6"
                style={{
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                  textDecoration:"none",
                  color:'inherit'
                }}
                component={Link}
                to={`/MyAds/User/${id}`}
                
              >
                 My Ads
              </Typography>
              <FavoriteIcon />
              <Typography
                variant="h6"
                style={{
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                  textDecoration:"none",
                  color:'inherit'
                }}
                
                component={Link}
                to={`/MySavedAds/User/${id}`}
              >
                My Saved Ads
              </Typography>
              
              <NotificationsIcon />
              <Typography
                variant="h6"
                style={{
                  cursor: "pointer",
                  borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                }}
              >
                My Alerts
              </Typography>
              <MessageIcon />
              <Typography
                variant="h6"
                style={{
                  cursor: "pointer",
                  // borderRight: "1px solid #ccc",
                  padding: "5px",
                  paddingRight: "10px",
                }}
              >
                My Messages
              </Typography>
              
            </Toolbar>
          </AppBar>
        </Grid>

        {/* First Card */}
        
        

        </Grid>
        </Container>
  )
}

export default MyAppBar