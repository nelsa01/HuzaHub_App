const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

//load all users
exports.allUsers = async (req, res, next) => {
    //enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    const keyword = req.query.keyword ? {
        serviceType: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    //jobs by location
    let locations = [];
    const jobByLocation = await User.find({role: 'service provider'}, { location: 1 });
    jobByLocation.forEach(val => {
        if(val !== null){
        locations.push(val.location);
    }
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;

    try {
        const users = await User.find({...keyword, location: locationFilter }).sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            setUniqueLocation,
            page,
            pages: Math.ceil(count / pageSize),
            count

        })
        next();
    } catch (error) {
        return next(error);
    }
}

//show single user
exports.singleUser = async (req, res, next) => {
    try {
        // Extract the ID from the request parameters
        const user = await User.findById(req.params.id);
        
        // Check if the user was found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Respond with the user if found
        res.status(200).json({
            success: true,
            user
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


//edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}


//jobs history
exports.createUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location } = req.body;

    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse("You must log In", 401));
        } else {
            const addJobHistory = {
                title,
                description,
                salary,
                location,
                user: req.user._id
            }
            currentUser.jobsHistory.push(addJobHistory);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}








