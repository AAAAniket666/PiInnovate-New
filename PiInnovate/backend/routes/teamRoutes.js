const express = require('express');
const router = express.Router();
const {
  getTeamMembers,
  getFeaturedTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');

// @route   GET /api/team
router.get('/', getTeamMembers);

// @route   GET /api/team/featured
router.get('/featured', getFeaturedTeamMembers);

// @route   GET /api/team/:id
router.get('/:id', getTeamMemberById);

// @route   POST /api/team
router.post('/', createTeamMember);

// @route   PUT /api/team/:id
router.put('/:id', updateTeamMember);

// @route   DELETE /api/team/:id
router.delete('/:id', deleteTeamMember);

module.exports = router;
