const asyncHandler = require('express-async-handler');
const TeamMember = require('../models/TeamMember');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getTeamMembers = asyncHandler(async (req, res) => {
  const teamMembers = await TeamMember.find().sort({ order: 1, createdAt: -1 });
  res.status(200).json(teamMembers);
});

// @desc    Get featured team members
// @route   GET /api/team/featured
// @access  Public
const getFeaturedTeamMembers = asyncHandler(async (req, res) => {
  const teamMembers = await TeamMember.find({ featured: true }).sort({ order: 1 });
  res.status(200).json(teamMembers);
});

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
const getTeamMemberById = asyncHandler(async (req, res) => {
  const teamMember = await TeamMember.findById(req.params.id);

  if (!teamMember) {
    res.status(404);
    throw new Error('Team member not found');
  }

  res.status(200).json(teamMember);
});

// @desc    Create new team member
// @route   POST /api/team
// @access  Private/Admin
const createTeamMember = asyncHandler(async (req, res) => {
  const { name, position, bio, image, socialMedia, featured, order } = req.body;

  const teamMember = await TeamMember.create({
    name,
    position,
    bio,
    image: image || '/images/default-avatar.jpg',
    socialMedia: socialMedia || {},
    featured: featured || false,
    order: order || 0,
  });

  if (teamMember) {
    res.status(201).json(teamMember);
  } else {
    res.status(400);
    throw new Error('Invalid team member data');
  }
});

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Private/Admin
const updateTeamMember = asyncHandler(async (req, res) => {
  const teamMember = await TeamMember.findById(req.params.id);

  if (!teamMember) {
    res.status(404);
    throw new Error('Team member not found');
  }

  const updatedTeamMember = await TeamMember.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedTeamMember);
});

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
const deleteTeamMember = asyncHandler(async (req, res) => {
  const teamMember = await TeamMember.findById(req.params.id);

  if (!teamMember) {
    res.status(404);
    throw new Error('Team member not found');
  }

  await teamMember.deleteOne();
  
  res.status(200).json({ message: 'Team member removed' });
});

module.exports = {
  getTeamMembers,
  getFeaturedTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
