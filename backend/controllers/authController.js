const serviceProvider = ('../models/serviceProviderModel')
const serviceProviderModel = require('../models/serviceProviderModel');
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');


exports.signup = async (req, res, next) => {
    const { username, password} = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) {
        return next(new ErrorResponse("Username already registred", 400));
    }
    try {
        const user = await User.create(req.body);
        console.log(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

exports.registerServiceProvider = async (req, res, next) => {
    const { username, password, location, fee, serviceType, description } = req.body;
    const serviceProviderExist = await serviceProvider.findOne({ username });
    if (serviceProviderExist) {
        return next(new ErrorResponse("Username already registred", 400));
    }
    try {
        const serviceProvider = await serviceProvider.create(req.body);
        console.log(req.body);
        res.status(201).json({
            success: true,
            serviceProvider
        })
    } catch (error) {
        next(error);
    }
}


exports.signin = async (req, res, next) => {

        try {
            const { username, password } = req.body;
            // Validation
            if (!username || !password) {
                return next(new ErrorResponse("Please provide username and password", 400));
            }
    
            // Check username
            const user = await User.findOne({ username });
            if (!user) {
                return next(new ErrorResponse("Invalid credentials", 400));
            }
    
            // Check password
            const isMatched = await user.comparePassword(password);
            if (!isMatched) {
                return next(new ErrorResponse("Invalid credentials", 400));
            }
    
            sendTokenResponse(user, 200, res);
        } catch (error) {
            next(error);
        }
};
exports.loginserviceProvider = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // Validation
        if (!username || !password) {
            return next(new ErrorResponse("Please provide username and password", 400));
        }

        // Check username
        const serviceProvider = await serviceProviderModel.findOne({ username });
        if (!serviceProvider) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        // Check password
        const isMatched = await serviceProvider.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        // If the username and password are valid, proceed to send the token response
        sendTokenResponseServiceProvider(serviceProvider, 200, res);
    } catch (error) {
        // Handle any errors that occur during the login process
        next(error);
    }
};


const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
        .status(codeStatus)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            role: user.role,
            userId: user._id,
            user: user,
        })
}
// const sendTokenResponseServiceProvider = async (serviceProvider, codeStatus, res) => {
//     const token = await serviceProvider.getJwtToken();
//     res
//         .status(codeStatus)
//         .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
//         .json({
//             success: true,
//             role: serviceProvider.role,
//             userId: serviceProvider._id,
//             user: serviceProvider,
//         })
// }



// log out
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}


// user profile
exports.userProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
        success: true,
        user
    })
}




