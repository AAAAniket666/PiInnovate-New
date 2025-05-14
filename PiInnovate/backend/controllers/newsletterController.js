const asyncHandler = require('express-async-handler');
const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
const subscribeToNewsletter = asyncHandler(async (req, res) => {
  const { email, name } = req.body;

  // Validate email
  if (!email) {
    res.status(400);
    throw new Error('Please provide an email address');
  }

  // Check if email already exists
  const existingSubscription = await Newsletter.findOne({ email });

  if (existingSubscription) {
    // If subscription exists but is inactive, reactivate it
    if (!existingSubscription.active) {
      existingSubscription.active = true;
      await existingSubscription.save();
      
      return res.status(200).json({
        success: true,
        message: 'Your subscription has been reactivated!'
      });
    }
    
    // If already active, return success but inform it's already subscribed
    return res.status(200).json({
      success: true,
      message: 'You are already subscribed to our newsletter!'
    });
  }

  // Create new subscription
  const subscription = await Newsletter.create({
    email,
    name: name || '',
    active: true
  });

  if (subscription) {
    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
  } else {
    res.status(400);
    throw new Error('Failed to subscribe. Please try again later.');
  }
});

// @desc    Unsubscribe from newsletter
// @route   DELETE /api/newsletter/unsubscribe
// @access  Public
const unsubscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Please provide an email address');
  }

  const subscription = await Newsletter.findOne({ email });

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found for this email'
    });
  }

  // Update active status instead of deleting
  subscription.active = false;
  await subscription.save();

  res.status(200).json({
    success: true,
    message: 'You have been unsubscribed from our newsletter'
  });
});

// @desc    Get all newsletter subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
const getSubscribers = asyncHandler(async (req, res) => {
  const pageSize = 50;
  const page = Number(req.query.pageNumber) || 1;
  
  // Filter by active status if specified
  const filter = {};
  if (req.query.active === 'true') {
    filter.active = true;
  } else if (req.query.active === 'false') {
    filter.active = false;
  }
  
  const count = await Newsletter.countDocuments(filter);
  
  const subscribers = await Newsletter.find(filter)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  
  res.status(200).json({
    subscribers,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Delete a subscriber
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
const deleteSubscriber = asyncHandler(async (req, res) => {
  const subscriber = await Newsletter.findById(req.params.id);

  if (!subscriber) {
    res.status(404);
    throw new Error('Subscriber not found');
  }

  await subscriber.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Subscriber removed'
  });
});

module.exports = {
  subscribeToNewsletter,
  unsubscribeNewsletter,
  getSubscribers,
  deleteSubscriber
};
