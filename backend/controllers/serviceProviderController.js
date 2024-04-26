// const { default: ServiceProvider } = require('../../frontend/src/pages/Signup');
const ServiceProvider = require('../models/serviceProviderModel');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

//load all ServiceProviders
exports.signupServiceProvider = async (req, res, next) => {
    const { username, password, location, fee, serviceType, description } = req.body;
    const userExist = await ServiceProvider.findOne({ username });
    if (userExist) {
        return next(new ErrorResponse("Username already registred", 400));
    }
    try {
        const user = await ServiceProvider.create(req.body);
        console.log(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

// Function to create and send token in a cookie
const sendTokenResponse = async (serviceProvider, codeStatus, res) => {
    const token = await serviceProvider.getJwtToken();
    res
        .status(codeStatus)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            role: serviceProvider.role,
            userId: serviceProvider._id,
            user: serviceProvider,
        })
}

exports.signinServiceProvider = async (req, res, next) => {
   
    try {
        const { username, password } = req.body;
        // Validation
        if (!username || !password) {
            return next(new ErrorResponse("Please provide username and password", 400));
        }

        // Check username
        const serviceProvider = await ServiceProvider.findOne({ username });
        if (!serviceProvider) {
            return next(new ErrorResponse("Invalid credentials: user does not exist", 400));
        }

        // Check password
        const isMatched = await serviceProvider.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials: wrong password", 400));
        }

        sendTokenResponse(serviceProvider, 200, res);
    } catch (error) {
        next(error);
    }
};


exports.allServiceProviders = async (req, res, next) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await ServiceProvider.find({}).estimatedDocumentCount();

    const keyword = req.query.keyword ? {
        serviceType: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    //jobs by location
    let locations = [];
    const jobByLocation = await ServiceProvider.find({role: 'service provider'}, { location: 1 });
    jobByLocation.forEach(val => {
        if(val !== null){
        locations.push(val.location);
    }
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;

    try {
        const serviceProviders = await ServiceProvider.find({...keyword, location: locationFilter }).sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            serviceProviders,
            setUniqueLocation,
            page,
            pages: Math.ceil(count / pageSize),
            count

        })
        next();
    } catch (error) {
        return next(error);
    }
};


//show single serviceProvider
exports.singleServiceProvider = async (req, res, next) => {
    try {
        // Extract the ID from the request parameters
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        
        // Check if the serviceProvider was found
        if (!serviceProvider) {
            return res.status(404).json({
                success: false,
                message: "serviceProvider not found"
            });
        }

        // Respond with the serviceProvider if found
        res.status(200).json({
            success: true,
            serviceProvider
        });

    } catch (error) {
        // Handle potential errors, such as invalid ID formats
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


//edit serviceProvider
exports.editServiceProvider = async (req, res, next) => {
    try {
        const serviceProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            serviceProvider
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//delete serviceProvider
exports.deleteServiceProvider = async (req, res, next) => {
    try {
        const serviceProvider = await ServiceProvider.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "serviceProvider deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}


//jobs history
exports.createserviceProviderJobsHistory = async (req, res, next) => {
    const { title, description, salary, location } = req.body;

    try {
        const currentServiceProvider = await ServiceProvider.findOne({ _id: req.serviceProvider._id });
        if (!currentserviceProvider) {
            return next(new ErrorResponse("You must log In", 401));
        } else {
            const addJobHistory = {
                title,
                description,
                salary,
                location,
                serviceProvider: req.serviceProvider._id
            }
            currentServiceProvider.jobsHistory.push(addJobHistory);
            await currentServiceProvider.save();
        }

        res.status(200).json({
            success: true,
            currentserviceProvider
        })
        next();

    } catch (error) {
        return next(error);
    }
}

exports.serviceProviderlogout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}






