// routes/bookingRoutes.js
const express = require("express");
const {
  // createBooking,
  getUserBookings,
  // bookingController,
  bookSlot,
  book,
  getAllBookings,
  updateServiceProviderStatus,
} = require("../controllers/bookingController");
const { isAuthenticated } = require("../middleware/auth"); // Assuming you have authentication middleware

const router = express.Router();

// router.post("/bookings", isAuthenticated, createBooking);
router.get("/bookings/:id", getUserBookings);
router.get("/book/:id", bookSlot);
router.post("/booking", book);
router.patch("/updateServiceProviderStatus", updateServiceProviderStatus);
router.get("/fetchAll", getAllBookings);

module.exports = router;
