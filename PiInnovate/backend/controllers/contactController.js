const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  // Create new contact submission
  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
    status: 'new'
  });

  if (contact) {
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.'
    });
  } else {
    res.status(400);
    throw new Error('Failed to submit contact form. Please try again later.');
  }
});

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private/Admin
const getContactSubmissions = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;
  
  // Filter by status if provided
  const filter = {};
  if (req.query.status && ['new', 'read', 'responded', 'archived'].includes(req.query.status)) {
    filter.status = req.query.status;
  }
  
  const count = await Contact.countDocuments(filter);
  
  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  
  res.status(200).json({
    contacts,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Get single contact submission
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact submission not found');
  }

  // If status is 'new', update to 'read'
  if (contact.status === 'new') {
    contact.status = 'read';
    await contact.save();
  }

  res.status(200).json(contact);
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact submission not found');
  }

  // Only allow updating the status
  if (!req.body.status || !['new', 'read', 'responded', 'archived'].includes(req.body.status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  contact.status = req.body.status;
  await contact.save();

  res.status(200).json({ 
    success: true, 
    message: 'Contact status updated',
    contact
  });
});

// @desc    Delete a contact submission
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact submission not found');
  }

  await contact.deleteOne();
  
  res.status(200).json({ 
    success: true,
    message: 'Contact submission removed' 
  });
});

module.exports = {
  submitContactForm,
  getContactSubmissions,
  getContactById,
  updateContactStatus,
  deleteContact
};
