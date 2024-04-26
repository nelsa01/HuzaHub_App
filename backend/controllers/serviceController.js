const Service = require("../models/services");
const ServiceType = require("../models/serviceType");
const ErrorResponse = require("../utils/errorResponse");
const ServiceProvider = require('../models/serviceProviderModel');

//create job
exports.createService = async (req, res, next) => {
  try {
    const service = await service.create({
      // description: req.body.description,
      fee: req.body.fee,
      // location: req.body.location,
      serviceType: req.body.serviceType,
      // user: req.user.id
    });
    res.status(201).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchServiceTypes = async () => {
  try {
    const serviceTypes = await ServiceProvider.distinct('serviceType');
    return serviceTypes;
  } catch (error) {
    console.error('Error fetching service types:', error);
    throw error;
  }
};

//single job
exports.singleService = async (req, res, next) => {
  try {
    const service = await Job.findById(req.params.id);
    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

//get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await service.find(); // Use Mongoose's find() to retrieve all documents
    res.send(services);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
