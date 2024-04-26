import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Box, Button, IconButton, TextField, Typography, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import mtn from "../images/image 2.png";
import airte from "../images/image 3.png";
import visa from "../images/visa.PNG";
import { useNavigate } from 'react-router-dom'; 
import { Alert } from '@mui/material';
// import nesa from '../images/nesa.png';

const Payment = () => {
  // State to keep track of the selected payment method
  const [paymentMethod, setPaymentMethod] = useState('VISA');
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    phoneNumber: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const navigate = useNavigate(); // Hook to navigate programmatically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
    // Immediately update the submitDisabled state
    setSubmitDisabled(!checkFormValidity());
  };
  
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Add your form submit handler here
  // ...
  const handleFormSubmit = () => {
    if (!submitDisabled) {
      setOpenSnackbar(true);
      // Assuming you handle the actual payment process here
      // ...
  
      setTimeout(() => {
        navigate('/confirm');
      }, 3000);
    }
  };
  
  // Call this function whenever the payment method or card details change
  useEffect(() => {
    setSubmitDisabled(!checkFormValidity());
  }, [cardDetails, paymentMethod]);
  
  const checkFormValidity = () => {
    if (paymentMethod === 'VISA') {
      return cardDetails.cardName && cardDetails.cardNumber && cardDetails.expDate && cardDetails.cvv;
    } else {
      return cardDetails.phoneNumber;
    }
  };
  useEffect(() => {
    setSubmitDisabled(!checkFormValidity());
  }, [cardDetails, paymentMethod]);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ margin: "auto", width: "80%", maxWidth: 400, paddingTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Payment
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 4,
        }}>
        {/* Images as button icons */}
        <IconButton onClick={() => handlePaymentMethodChange('VISA')} color={paymentMethod === 'VISA' ? "primary" : "default"}>
          <img src={visa} alt="VISA" style={{ width: 70, height: 50 }} />
        </IconButton>
        <IconButton onClick={() => handlePaymentMethodChange('MTN')} color={paymentMethod === 'MTN' ? "primary" : "default"}>
          <img src={mtn} alt="MTN" style={{ width: 50, height: 50 }} />
        </IconButton>
        <IconButton onClick={() => handlePaymentMethodChange('AIRTEL')} color={paymentMethod === 'AIRTEL' ? "primary" : "default"}>
          <img src={airte} alt="AIRTEL" style={{ width: 50, height: 50 }} />
        </IconButton>
      </Box>

      {/* Conditionally rendering form fields */}
      {paymentMethod === 'VISA' && (
        <>
          <TextField
            fullWidth
            label="Card holder name"
            placeholder="eg. Mike Augustin"
            margin="normal"
            variant="outlined"
            name="cardName"
            value={cardDetails.cardName}
            // ...other props
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Card number"
            placeholder="XXXX XXXX XXXX XXXX"
            margin="normal"
            variant="outlined"
            name="cardNumber"
            value={cardDetails.cardNumber}
            // ...other props
            onChange={handleInputChange}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Exp date"
              placeholder="eg. 10/10"
              margin="normal"
              variant="outlined"
              sx={{ width: "48%" }}
              name="expDate"
              value={cardDetails.expDate}
              // ...other props
              onChange={handleInputChange}
            />
            <TextField
              label="CVV"
              placeholder="eg. 123"
              margin="normal"
              variant="outlined"
              sx={{ width: "48%" }}
              name="cvv"
              value={cardDetails.cvv}
              // ...other props
              onChange={handleInputChange}
            />
          </Box>
        </>
      )}

      {['MTN', 'AIRTEL'].includes(paymentMethod) && (
        <TextField
          fullWidth
          name="phoneNumber"
          label="Phone number"
          placeholder="eg. 0777123456"
          margin="normal"
          variant="outlined"
          value={cardDetails.phoneNumber}
          onChange={handleInputChange}

        />
      )}

        <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <Button variant="text" onClick={() => navigate('/home')}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<CreditCardIcon />}
          onClick={handleFormSubmit}
          disabled={submitDisabled} // The button is disabled if the form is invalid
        >
          Confirm
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Payment successful!"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // This positions the snackbar at the top center.
      />
    </Box>
  );
};

export default Payment;
