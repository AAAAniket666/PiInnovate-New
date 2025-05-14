const express = require('express');
const router = express.Router();
const {
  getServices,
  getFeaturedServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

// @route   GET /api/services
router.get('/', getServices);

// @route   GET /api/services/featured
router.get('/featured', getFeaturedServices);

// @route   GET /api/services/:slug
router.get('/:slug', getServiceBySlug);

// @route   POST /api/services
router.post('/', createService);

// @route   PUT /api/services/:id
router.put('/:id', updateService);

// @route   DELETE /api/services/:id
router.delete('/:id', deleteService);

module.exports = router;
