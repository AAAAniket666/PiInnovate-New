const express = require('express');
const router = express.Router();
const {
  subscribeToNewsletter,
  unsubscribeNewsletter,
  getSubscribers,
  deleteSubscriber,
} = require('../controllers/newsletterController');

// @route   POST /api/newsletter
router.post('/', subscribeToNewsletter);

// @route   DELETE /api/newsletter/unsubscribe
router.delete('/unsubscribe', unsubscribeNewsletter);

// @route   GET /api/newsletter
router.get('/', getSubscribers);

// @route   DELETE /api/newsletter/:id
router.delete('/:id', deleteSubscriber);

module.exports = router;
