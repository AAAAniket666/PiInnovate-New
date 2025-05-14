const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');

// @route   GET /api/testimonials
router.get('/', getTestimonials);

// @route   GET /api/testimonials/featured
router.get('/featured', getFeaturedTestimonials);

// @route   GET /api/testimonials/:id
router.get('/:id', getTestimonialById);

// @route   POST /api/testimonials
router.post('/', createTestimonial);

// @route   PUT /api/testimonials/:id
router.put('/:id', updateTestimonial);

// @route   DELETE /api/testimonials/:id
router.delete('/:id', deleteTestimonial);

module.exports = router;
