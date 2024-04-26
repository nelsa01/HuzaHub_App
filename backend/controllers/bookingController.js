// controllers/bookingController.js
// const Booking = require("../models/BookingModel");
const User = require("../models/userModel"); // Assuming you have a User model
const BookingServiceProvider = require("../models/BookingServiceProviderMode");
// Create a new booking
// exports.createBooking = async (req, res) => {
//   try {
//     const { serviceType, date, timeSlot, address, serviceProviderId } =
//       req.body;
//     const customer = req.user._id; // Assuming user ID is attached to the request by authentication middleware
//     const name = req.user.username;

//     const newBooking = new Booking({
//       serviceType,
//       date,
//       timeSlot,
//       customer,
//       name,
//       address,
//       serviceProvider: serviceProviderId,
//       status: "Pending",
//     });

//     await newBooking.save();

//     res.status(201).json({
//       success: true,
//       data: newBooking,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// POST: Book a time slot
exports.book = async (req, res) => {
  const { date, name, address, timeSlot, loggedInUserId, loggedInUsername, bookedUserId, status, phoneNumber} =
    req.body;
  console.log(req.body);
  const booking = new BookingServiceProvider({
    date,
    name,
    address,
    timeSlot,
    phoneNumber,
    loggedInUserId,
    loggedInUsername,
    status,
    bookedUserId,
  });

  try {
    await booking.save();
    res.send({ message: "Booking successful", booking });
  } catch (error) {
    console.log(error)
    res.status(400).send("error here");
  }
};

exports.bookSlot = async (req, res) => {
  const { date } = req.query; // Assume date is passed as a query parameter
  serviceProviderId = req.params.id;

  console.log('service prov', serviceProviderId)
  console.log(new Date(date))
  var nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate()+1)
  try {
    // Fetch all time slots that are already booked for the given date
    const bookedSlots = await BookingServiceProvider.find({ bookedUserId: serviceProviderId, date: {
      $gte: new Date(date),
      $lte: nextDate
    } }).select('timeSlot');
    console.log("bookedSlots", bookedSlots)

    // Assume timeSlots is an array containing all possible time slots in a day
    const allTimeSlots = [
      'Morning 9-10', 'Morning 11-12', 'Afternoon 1-2', 'Afternoon 3-4', 'Evening 5-6'
    ];

    // Filter out the booked slots from the list of all time slots
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.some(bookedSlot => bookedSlot.timeSlot == slot));
    console.log("availableSlots", availableSlots)

    // Send the available slots as response
    res.status(200).json({
      date: date,
      availableSlots: availableSlots
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while processing your request");
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingServiceProvider.find(); // Use Mongoose's find() to retrieve all documents
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    user_id = req.params.id; // Debugging: Log the user ID

    if(!user_id){
      res.status(400).send("Missing id in params");
      console.log("Missing id in params")
    }

    const bookings = await BookingServiceProvider.find({
      $or: [{ loggedInUserId: user_id }, { bookedUserId: user_id }],
    }).populate("bookedUserId");

    console.log("Bookings found:", bookings); // Debugging: Log found bookings

    if (bookings.length === 0) {
      console.log("No bookings found for this user."); // Debugging: Log when no bookings are found
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error.message); // Debugging: Log any errors
    res.status(400).json({ success: false, message: error.message });
  }
};
// Update booking status for the service provider
exports.updateServiceProviderStatus = async (req, res) => {
  const { bookingId, status } = req.body;

  try {
    // Update the status for the service provider's booking
    await BookingServiceProvider.findByIdAndUpdate(bookingId, { status });

    // Fetch the corresponding client's booking
    // const clientBooking = await BookingClient.findOneAndUpdate({ /* query to find the corresponding client's booking */ }, { status });

    // Send success response
    res.status(200).json({ success: true, message: "Booking status updated successfully" });
    // location.reload();
  } catch (error) {
    // Handle errors
    console.error("Error updating booking status:", error);
    res.status(400).json({ success: false, message: "Error updating booking status", error: error.message });
  }
};

// Update booking status for the client
exports.updateClientStatus = async (req, res) => {
  const { bookingId, status } = req.body;

  try {
    // Update the status for the client's booking
    await BookingClient.findByIdAndUpdate(bookingId, { status });

    // Fetch the corresponding service provider's booking
    const serviceProviderBooking = await BookingServiceProvider.findOneAndUpdate({ /* query to find the corresponding service provider's booking */ }, { status });

    // Send success response
    res.status(200).json({ success: true, message: "Booking status updated successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error updating booking status:", error);
    res.status(400).json({ success: false, message: "Error updating booking status", error: error.message });
  }
};


// exports.getAllBookings = async (req, res) => {
//   try {
//     console.log("Fetching all bookings...");

//     // Fetch all bookings without filtering by user ID
//     const bookings = await Booking.find().populate(
//       "customer serviceProvider",
//       "username"
//     );

//     console.log("Total bookings found:", bookings.length); // Debugging: Log the total number of bookings found

//     if (bookings.length === 0) {
//       console.log("No bookings found."); // Debugging: Log when no bookings are found
//     }

//     res.status(200).json({
//       success: true,
//       count: bookings.length,
//       bookings,
//     });
//   } catch (error) {
//     console.error("Error fetching all bookings:", error.message); // Debugging: Log any errors
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// Add more controller functions as needed (updateBooking, deleteBooking, etc.)

// module.exports = { createBooking, getUserBookings };