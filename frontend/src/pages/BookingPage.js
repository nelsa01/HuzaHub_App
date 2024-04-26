import React, {useState} from 'react';
import { Box, Typography, TextField, MenuItem, Button, Stack, Snackbar } from '@mui/material';
import { MobileDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { bookAppointment } from '../redux/actions/bookingAction';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// const { state } = useLocation();
// const serviceProviderId = state?.serviceProviderId;
// Adjust the validation schema if necessary
const informationSchema = yup.object({
  name: yup.string("Enter your username").required("Username is required"),
  phoneNumber: yup.string("Enter your phone number").required("PhoneNumber is required"),
  address: yup.string("Enter your address").required("Address is required"),
  date: yup.date().required("Date is required"),
  timeSlot: yup.date().required("Time is required"),
});
const timeSlots = [
  'Morning 9-10',
  'Morning 11-12',
  'Afternoon 1-2',
  'Afternoon 3-4',
  'Evening 5-6',
];

const BookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serviceProviderId } = useParams();
  const { serviceProviderUsername } = useParams();
  //const [searchParams, setSearchParams] = useSearchParams();
  //searchParams.get("serviceProviderId")
  
  const [selectedDate, setSelectedDate] = useState('2024-12-14'); // Default date
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);


  // Function to handle date change
  // const handleDateChange = (event) => {
  //    setSelectedDate(event.target.value);
  // };

  const { userInfo } = useSelector(state => state.signIn);
  // const { serviceProviderInfo } = useSelector(state => state.signIn);
  console.log("Booking user info",userInfo)
//   const renderTimeSlots = () => {
//     const slots = sampleBookings[selectedDate] || [];
//     return slots.map((slot, index) => (
//       <MenuItem key={index} value={slot}>
//         {slot}
//       </MenuItem>
//     ));
//  };
 
const fetchAvailableSlots = async (date) => {
  try {
    const formattedDate = date.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
    const response = await fetch(`/api/book?date=${formattedDate}`);
    if (!response.ok) {
      throw new Error('Failed to fetch available slots');
    }
    const data = await response.json();
    const slots = data.availableSlots;
    console.log("slots", slots);
    setAvailableTimeSlots(slots); // Update the available slots
  } catch (error) {
    console.error(error);
    // Handle errors, maybe set some error state to show in the UI
  }
};

// Update the handleDateChange function to also fetch slots
const handleDateChange = (value) => {
  formik.setFieldValue("date", value);
  fetchAvailableSlots(value); // Fetch slots when date changes
};

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      // status: "",
      phoneNumber: "",
      date: new Date(),
      timeSlot: "",
      bookedUserId: serviceProviderId,
      // bookedUsername: serviceProviderUsername,
      loggedInUsername: userInfo._username,
      loggedInUserId: userInfo._id

    },
    validationSchema: informationSchema,
    onSubmit: async(values, actions) => {
      try {
        const response = await fetch('/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Could not book the appointment');
        }
        actions.resetForm();
        navigate("/home");
      } catch (error) {
        actions.setFieldError('general', error.message);
      }
    },
  });
  

  return (
    <Box sx={{ p: 2, maxWidth: 400, mx: 'auto', bgcolor: 'background.paper', borderRadius: 2, mt: 10 }}>
      <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Book a service provider
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            label="Address"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              id="date"
              name="date"
              value={formik.values.date}
              onChange={handleDateChange}  // Use handleDateChange here
              renderInput={(params) => <TextField {...params} error={formik.touched.date && Boolean(formik.errors.date)} helperText={formik.touched.date && formik.errors.date} />}
            />
            <TextField
              select
              label="Time Slot"
              name="timeSlot"
              value={formik.values.timeSlot}
              onChange={(event) => formik.setFieldValue("timeSlot", event.target.value)}
              error={formik.touched.timeSlot && Boolean(formik.errors.timeSlot)}
              helperText={formik.touched.timeSlot && formik.errors.timeSlot}
            >
              {availableTimeSlots.map((slot, index) => (
                <MenuItem key={index} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </TextField>

          </LocalizationProvider>

          <Button variant="contained" color="primary" type="submit">
            Book
          </Button>
        </Stack>
        {/* {formik.errors.general && (
          <Snackbar
            open={Boolean(formik.errors.general)}
            autoHideDuration={6000}
            onClose={() => formik.setErrors({...formik.errors, general: undefined})}
            message={formik.errors.general}
          />
        )} */}
      </form>
    </Box>
  );
};

export default BookingPage;
