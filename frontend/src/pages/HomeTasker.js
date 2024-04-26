import React from "react";
import {
 Box,
 Container,
 Typography,
 Tooltip,
 Popover, 
 List, 
 ListItem, 
 ListItemText,
} from "@mui/material";
import DrawerLeft from "../component/DrawerLeft";
import Calendar from "../component/Calendar";
import Footer from "../component/Footer";

const HomeTasker = () => {
 const bookedSlots = ['Day 1 Morning 9-10', 'Day 2 Afternoon 1-2'];

 return (
    <>
      <DrawerLeft>
        <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
            }}>
            <Container maxWidth="sm">
              <Typography
                variant="h2"
                component="h1"
                color="primary.main"
                gutterBottom
                sx={{ fontWeight: "bold" }}>
                Welcome Service Provider!
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                 mb: 2,
                 color: "black",
                 fontWeight: "bold",
                 marginBottom: "100px",
                }}>
                Provide services easily with HuzaHub.
              </Typography>

              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{
                 fontWeight: 'bold',
                 color: 'black'
                }}>
                 What's your daily availability to take bookings with potential clients?
                </Typography>

                {/* Availability Preview - Calendar */}
                <Box sx={{ marginTop: 4, marginBottom: 4 }}>
                 <Calendar bookedSlots={bookedSlots} />
                </Box>
              </Box>
            </Container> 
          </Box>
        </Box>
        <Footer />
      </DrawerLeft>
    </>
 );
};

export default HomeTasker;
