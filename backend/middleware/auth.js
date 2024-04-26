const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

// check is user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('You must log in!', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse('You must log in!', 401));
    }
}

//middleware for admin
exports.isServiceProvider = (req, res, next) => {
    if (req.user.role !== 'service provider') {
        return next(new ErrorResponse('Access denied, you must be a service provider', 401));
    }
    next();
}