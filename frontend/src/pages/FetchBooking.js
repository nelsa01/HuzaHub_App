import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import DrawerLeft from "../component/DrawerLeft";
import Footer from "../component/Footer";
import {
  Box,
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from "@mui/material";
import axios from "axios";
import StatusUpdateButton from "../component/StatusUpdateButton";
import { useNavigate } from "react-router-dom";

const FetchBookings = ({ bookingId, serviceProviderInfo }) => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { userInfo } = useSelector(state => state.signIn);
  const { userId } = useParams();
  // const { bookingId } = useParams();
  console.log("Booking user info",userInfo)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Check if userInfo and userId are defined
        if (!userInfo || !userInfo._id) {
          console.log("User ID is not defined. Cannot fetch bookings.");
          return;
        }
  
        const response = await fetch(`http://localhost:9000/api/bookings/${userInfo._id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("all bookings", data.bookings);
  
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchBookings();
  }, [userInfo]);
  console.log("all bookings", bookings);
  // const user = JSON.parse(localStorage.getItem("userInfo"));
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // setUser(userInfo);
  const navigate = useNavigate();
  const handleConfirmService = (serviceId) => {
    // Handle the confirmation action here
    // You might want to call an API to update the service status
    navigate("/payment");
  };
// const responseObject = {"success":true,"role":"client","userId":"65ef38b4699c443b0c2a66a6","user":{"_id":"65ef38b4699c443b0c2a66a6","username":"meenie","password":"$2a$10$zeFDS6fywTfAx4efQRO0y.wNSe1kSzQUCPaKaGgM.qg5tI4EGBqEO","role":"client","createdAt":"2024-03-11T17:00:36.032Z","updatedAt":"2024-03-25T19:02:32.653Z","__v":0}};

// const userId = responseObject.userId;

// console.log("userrrrrr id", userId); // Outputs: 65ef38b4699c443b0c2a66a6
// const [status, setStatus] = useState("");

//   const handleChange = (event) => {
//     setStatus(event.target.value);
//   };



  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setShowDropdown(false);
  };




  return (
    <>
    <DrawerLeft>
    {/* <p> user id {userDts?.userId}</p> */}
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time Slot</TableCell>
            <TableCell>Booked by</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Booked</TableCell>
            <TableCell>Status</TableCell>
            {userInfo && userInfo.role === "client" && (
            <TableCell>Confirm booking</TableCell>
          )}

          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
              <TableCell>{booking.timeSlot}</TableCell>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.phoneNumber}</TableCell>
              <TableCell>{booking.bookedUserId.username}</TableCell>
              <TableCell> 
                <StatusUpdateButton 
                  bookingId={booking.id} 
                  userInfo={userInfo} 
                  booking={booking}
                />
              </TableCell>
              <TableCell>
              {userInfo.role === "client" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleConfirmService(booking.id)}
                >
                  Confirm
                </Button>
              )}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    <Footer />
    </DrawerLeft>
    </>
  );
};

export default FetchBookings;
