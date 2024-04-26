import { Box, Typography, Avatar, Chip, Button, Rating, Grid } from "@mui/material";
import React from "react";
import DrawerLeft from "../../component/DrawerLeft";
import Footer from "../../component/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { id } from "date-fns/locale";
import { useSelector } from 'react-redux';
// import jwtDecode from 'jwt-decode';
// import {useParams } from "react-router-dom";



const AdminDashboard = () => {
  // Assume user data is fetched from the backend and set here
  // const user = {
  //   username: 'Kim Parkinson',
  //   bio: 'I will inspire 10 million people to do what they love the best they can!',
  //   rating: 5,
  //   reviews: 26,
  //   price: 3.00,
  //   sessionTime: 5,
  //   sessions: 36,
  //   email: 'katein@mail.com',
  // };
  const { keyword, location } = useParams();
const [serviceProvider, setServiceProvider] = useState([]);
const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("serviceProviderInfo")))
console.log(userProfile && userProfile._id, "hehe")
const [setUniqueLocation, setSetUniqueLocation] = useState([]);
  const { serviceProviderInfo } = useSelector(state => state.signIn);
  console.log(serviceProviderInfo)


  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  // const [serviceProvider, setServiceProvider] = useState(null);

  useEffect(() => {
    const fetchServiceProvider = async () => {
      try {
        // Assuming the logged-in user's ID is stored in localStorage under "userInfo"
        const serviceProviderInfo = JSON.parse(localStorage.getItem("serviceProviderInfo"));
        const serviceProviderId = serviceProviderInfo && serviceProviderInfo._id;
        if (!serviceProviderId) {
          throw new Error("User ID not found");
        }

        // Fetch the service provider by ID
        const response = await fetch(`http://localhost:9000/api/serviceProvider/${userProfile?._id}`, {
          credentials: "include", // Include cookies with the request
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data, "data");
        setServiceProvider(data.serviceProvider);
        console.log(serviceProvider, "Got it")
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchServiceProvider();
  }, [serviceProviderInfo]);

  if (error) {
      return <div>Error: {error}</div>;
  }

  if (!serviceProvider) {
      return <div>Loading...</div>;
  }


  return (
    <>
      <DrawerLeft>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            bgcolor: "background.paper",
            py: 8,
          }}>
          <Avatar
            sx={{ width: 140, height: 140, mb: 2 }}
            src="/static/images/avatar/1.jpg"
          />
          {/* {serviceProvider.map((serviceProvider) => ( */}
            <Grid>
              <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center"}}>
                {serviceProvider.username}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, mb: 2, textAlign: "center" }}>
                {serviceProvider.description}
              </Typography>
              <Rating name="read-only" value={serviceProvider.rating} readOnly />
              {/* <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {user.reviews} reviews
              </Typography> */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}>
                <Chip
                  label={`$${serviceProvider.fee} per service`}
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
                {/* <Chip label={`${user.sessionTime} mins min talk time`} variant="outlined" sx={{ mb: 1 }} />
                <Chip label={`${user.sessions} sessions`} variant="outlined" /> */}
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                <Button variant="contained" sx={{ alignSelf: "flex-start" }}>
                  Change profile
                </Button>
              </Box>
           </Grid>  
          {/* ))} */}
        </Box>
        <Footer />
      </DrawerLeft>
    </>
  );
};

export default AdminDashboard;
