const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
  res.status(200).json(testimonials);
});

// @desc    Get featured testimonials
// @route   GET /api/testimonials/featured
// @access  Public
const getFeaturedTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ featured: true }).sort({ order: 1 });
  res.status(200).json(testimonials);
});

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Private/Admin
const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  res.status(200).json(testimonial);
});

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
const createTestimonial = asyncHandler(async (req, res) => {
  const { name, position, company, content, image, rating, featured, order } = req.body;

  const testimonial = await Testimonial.create({
    name,
    position,
    company,
    content,
    image: image || '/images/default-avatar.jpg',
    rating: rating || 5,
    featured: featured || false,
    order: order || 0,
  });

  if (testimonial) {
    res.status(201).json(testimonial);
  } else {
    res.status(400);
    throw new Error('Invalid testimonial data');
  }
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  const updatedTestimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedTestimonial);
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  await testimonial.deleteOne();
  
  res.status(200).json({ message: 'Testimonial removed' });
});

module.exports = {
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
