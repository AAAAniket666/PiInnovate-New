const asyncHandler = require('express-async-handler');
const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ order: 1, createdAt: -1 });
  res.status(200).json(services);
});

// @desc    Get featured services
// @route   GET /api/services/featured
// @access  Public
const getFeaturedServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ featured: true }).sort({ order: 1 });
  res.status(200).json(services);
});

// @desc    Get single service by slug
// @route   GET /api/services/:slug
// @access  Public
const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  res.status(200).json(service);
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const { title, description, icon, slug, details, image, featured, order } = req.body;

  // Check if service with this slug already exists
  const serviceExists = await Service.findOne({ slug });

  if (serviceExists) {
    res.status(400);
    throw new Error('Service with this slug already exists');
  }

  const service = await Service.create({
    title,
    description,
    icon,
    slug,
    details,
    image: image || '/images/default-service.jpg',
    featured: featured || false,
    order: order || 0,
  });

  if (service) {
    res.status(201).json(service);
  } else {
    res.status(400);
    throw new Error('Invalid service data');
  }
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedService);
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  await service.deleteOne();
  
  res.status(200).json({ message: 'Service removed' });
});

module.exports = {
  getServices,
  getFeaturedServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
