import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import NavBar from "../component/Navbar2"; // Ensure this is responsive if custom built
import SlickSlider from "../component/SlickSlider"; // Ensure responsiveness
import TaskerSuggestions from "../component/TaskerSuggestions"; // Ensure responsiveness
import HowItWorks from "../component/HowItWorks"; // Ensure responsiveness
import Services2 from "../component/Services2"; // Ensure responsiveness
import Footer from "../component/Footer"; // Ensure responsiveness
import Navbarr from "../component/Navbar2"; // Ensure this is responsive if custom built


const LandingPage = () => {
  const theme = useTheme();
  
  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Navbarr />
        
        <Box
          sx={{
            position: 'relative',
            textAlign: "center",
            py: { xs: 4, sm: 8 }, // Adjust padding based on screen size
            color: "white",
            height: { xs: "60vh", md: "80vh" }, // Adjust height based on screen size
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* SlickSlider as a background */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
            <SlickSlider />
          </Box>

          <Typography variant="h2" sx={{ mb: { xs: 4, md: 10 }, zIndex: 1, fontWeight: 'bold', fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
            Welcome to HuzaHub!
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" sx={{ mb: 2, bgcolor: theme.palette.primary.main, zIndex: 1 }}>
              <Link to="/register" style={{ textDecoration: "none", color: "white" }}>Request for service</Link>
            </Button>
            <Button variant="outlined" sx={{ mb: 2, zIndex: 1, borderColor: 'white', "&:hover": { bgcolor: theme.palette.primary.main, color: 'white' } }}>
              <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>Start Working</Link>
            </Button>
          </Box>
        </Box>

        <Container maxWidth="xl" sx={{ py: { xs: 5, md: 10 } }}>
          <Grid container alignItems="stretch" spacing={4}>
            <Services2 />
            <Grid item xs={12} md={8}>
              <HowItWorks />
            </Grid>
            <Grid item xs={12} md={4}>
              <TaskerSuggestions />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;
