const mongoose = require('mongoose');

const bookingServiceProviderSchema = new mongoose.Schema({
  date: Date,
  address: String,
  name: String,
  phoneNumber: String,
  timeSlot: String,
  loggedInUserId: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
  loggedInUsername: String,
  bookedUserId: {type:mongoose.Schema.Types.ObjectId, ref: "serviceProvider"},
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
},
  // bookedUsername: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('BookingServiceProvider', bookingServiceProviderSchema);
4