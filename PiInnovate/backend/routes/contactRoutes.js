const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getContactSubmissions,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');

// @route   POST /api/contact
router.post('/', submitContactForm);

// @route   GET /api/contact
router.get('/', getContactSubmissions);

// @route   GET /api/contact/:id
router.get('/:id', getContactById);

// @route   PUT /api/contact/:id
router.put('/:id', updateContactStatus);

// @route   DELETE /api/contact/:id
router.delete('/:id', deleteContact);

module.exports = router;
