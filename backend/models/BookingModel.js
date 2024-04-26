// models/BookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    serviceType: {
        type:String,
        required: false
    },
    date: Date,
    address: String,
    timeSlot: {
        type: String,
        required: true,
        enum: ['Morning 9-10', 'Morning 11-12', 'Afternoon 1-2', 'Afternoon 3-4', 'Evening 5-6'],
        validate: {
          validator: function(v) {
            return /^Morning \d-\d$|^Afternoon \d-\d$|^Evening \d-\d$/.test(v);
          },
          message: props => `${props.value} is not a valid time slot!`
        }
    },
    
    name: {
        type: String,
        required: true

    },
    customer: {
        type: String,
        ref: 'User',
        required: true
    },
    serviceProvider: {
        type: String,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
