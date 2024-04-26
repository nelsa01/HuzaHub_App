  // import React, { useEffect, useState } from 'react';
  // import {
  //   Box,
  //   Card,
  //   CardActionArea,
  //   CardMedia,
  //   CardContent,
  //   Typography,
  //   Grid
  // } from '@mui/material';
  // import axios from 'axios'; // Import axios for making API requests
  
  // const [services, setServices] = useState([]);
  // const projects = [
  //   { title: {service.serviceType}, startingPrice: 49, image: 'https://img.freepik.com/free-photo/plumbing-repair-service_181624-27146.jpg?w=900&t=st=1709380581~exp=1709381181~hmac=6db72d32fe96444c7fd21195d8c2b24bcfe2861e44113d8cc1734eed606c3a4c' },
  //   { title: 'Mount Art or Shelves', startingPrice: 65, image: 'https://img.freepik.com/free-photo/plumbing-repair-service_181624-27146.jpg?w=900&t=st=1709380581~exp=1709381181~hmac=6db72d32fe96444c7fd21195d8c2b24bcfe2861e44113d8cc1734eed606c3a4c' },
  //   { title: 'Mount Art or Shelves', startingPrice: 65, image: 'https://img.freepik.com/free-photo/plumbing-repair-service_181624-27146.jpg?w=900&t=st=1709380581~exp=1709381181~hmac=6db72d32fe96444c7fd21195d8c2b24bcfe2861e44113d8cc1734eed606c3a4c' },
  //   { title: 'Mount Art or Shelves', startingPrice: 65, image: 'https://img.freepik.com/free-photo/plumbing-repair-service_181624-27146.jpg?w=900&t=st=1709380581~exp=1709381181~hmac=6db72d32fe96444c7fd21195d8c2b24bcfe2861e44113d8cc1734eed606c3a4c' },// ... more projects
  // ];
  // // Define a single service card component
  // const ServiceCard = ({ serviceType, fee, image }) => {
  //   return (
  //     <Card>
  //       <CardActionArea>
  //         <CardMedia
  //           component="img"
  //           height="140"
  //           image={image}
  //           alt={serviceType}
  //         />
  //         <CardContent>
  //           <Typography gutterBottom variant="h6" component="div">
  //             {serviceType}
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             Services starting at ${fee}
  //           </Typography>
  //         </CardContent>
  //       </CardActionArea>
  //     </Card>
  //   );
  // };
  
  // // Main component for the Popular Services section
  // const PopularServices = () => {
  //   const [services, setServices] = useState([]);
  //   useEffect(() => {
  //     const fetchServices = async () => {
  //       try {
  //         // Fetch services from the backend
  //         const response = await fetch('http://localhost:9000/api/fetchServices');
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         const data = await response.json();
  //         setServices(data);
  //       } catch (error) {
  //         console.error('Error fetching services:', error);
  //       }
  //     };
  
  //     fetchServices();
  //   }, []);
    
  
  //   return (
  //     <Box sx={{ flexGrow: 1 }}>
  //       <Grid container spacing={4} marginLeft={10}>
  //         {services.map((service, index) => (
  //           <Grid item key={index} xs={12} sm={6} md={3}>
  //             <ServiceCard
  //               serviceType={service.serviceType}
  //               fee={service.fee}
  //               image={service.image}
  //             />
  //             {/* <p>service: {service.serviceType}</p>
  //             <p>service: {service.fee}</p> */}
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </Box>
  //   );
  // };
  
  // export default PopularServices;
  

