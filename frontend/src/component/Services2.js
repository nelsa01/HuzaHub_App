import React from "react";
import { Container, Grid, Box, Typography} from "@mui/material";
import ServiceCard from "../component/Services"; // Import ServiceCard component

const Services2 = () => {
  // Variants for animation with framer-motion
  const variants = {
    visible: (i) => ({
      opacity: 1,
      translateY: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: { opacity: 0, translateY: 50 },
  };

  // Dummy data for services
  const services = [
    { title: "Plumbing", description: "At HuzaHub, our experienced professionals are equipped to handle any plumbing challenge, delivering top-quality workmanship with prompt and courteous service. " },
    { title: "Electricity", description: "Our certified electricians provide comprehensive electrical services, from basic wiring and fixture installations to complex electrical system upgrades, ensuring safety and efficiency for your home or business." },
    { title: "Cleaning", description: "We pride ourselves on reliable, and thorough cleaning services tailored to meet your specific needs and schedule. our skilled cleaning crew ensures every corner of your home or office is spotless and hygienic. " },
    { title: "Furniture Assembly", description: "At HuzaHub, our adept assembly specialists make the process of setting up new furniture seamless and stress-free, offering efficient services that transform your space with ease and professionalism." },
    { title: "Gardening", description: "At HuzaHub, our skilled gardeners bring expert care to your green spaces, providing meticulous and creative gardening services that enhance the beauty and vitality of your outdoor areas." },
    { title: "Heavy Lifting", description: "Our heavy lifting services at HuzaHub are designed to take the strain off your shoulders, offering reliable and efficient assistance for moving heavy items with the utmost care and precision." },
    // Add more services as needed
  ];

  return (
    <Container maxWidth="md" sx={{ pb: 10 }}> {/* Adjust the maxWidth to control the grid width */}
    <Typography variant="h5" sx={{mt: 5, mb: 4, fontWeight: 'bold', textAlign: 'center'}}>
            Our services
    </Typography>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={10} justifyContent="center" > {/* Adjust spacing and justifyContent */}
            {services.map((service, index) => (
            <ServiceCard
                key={index}
                service={service}
                index={index}
                variants={variants}
                
            />
            ))}
        </Grid>
        </Box>
  </Container>
  );
};

export default Services2;
