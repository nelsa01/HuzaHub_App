import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const StatusUpdateButton = ({ bookingId, userInfo, booking }) => {
  const [status, setStatus] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { booking: bookingParam } = useParams();
  // const handleStatusChange = (newStatus) => {
  //   setStatus(newStatus);
  //   setShowDropdown(false);
  // };

  useEffect(() => {
    // Update status in state when booking prop changes
    setStatus(booking?.status || "");
  }, [booking]);

  const handleStatusChange = async ( status) => {
    try {
      if (userInfo && userInfo.role === "service provider") {
        // Send a request to update the status
        await axios.patch("http://localhost:9000/api/updateServiceProviderStatus", {
          bookingId: booking._id,
          status: status,
        });
      } else {
        // Handle client button click here
        // For clients, you may want to show a message or disable the button
        console.log("Client button clicked");
      }
      // Optional: Reload the page or update the UI to reflect the new status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleButtonClick = async () => {
    try {
      // Handle client button click here
      // For clients, you may want to show a message or disable the button
      console.log("Client button clicked");
    } catch (error) {
      console.error("Error handling button click:", error);
    }
  };

  return (
    <div>
      {userInfo.role === "service provider" && (
        <div>
          <Button onClick={() => setShowDropdown(!showDropdown)} variant="contained">{status}</Button>
          {showDropdown && (
            <div>
              <Button onClick={() => handleStatusChange("confirmed")} variant="contained">Confirmed</Button>
              <Button onClick={() => handleStatusChange("completed")} variant="contained">Completed</Button>
              <Button onClick={() => handleStatusChange("canceled")} variant="contained">Canceled</Button>
            </div>
          )}
        </div>
      )}
      {(userInfo.role !== "service provider")&& (
        <Button onClick={handleButtonClick} variant="contained">{status}</Button>
      )}
    </div>
  );
};

export default StatusUpdateButton;
