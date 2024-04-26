// routes/bookingRoutes.js
const express = require("express");
const {
  createService,
  getAllServices,
  fetchServiceTypes
} = require("../controllers/serviceController");
const { isAuthenticated } = require("../middleware/auth"); // Assuming you have authentication middleware

const router = express.Router();

router.post("/createService", createService);
router.get("/fetchServices", fetchServiceTypes);

module.exports = router;
