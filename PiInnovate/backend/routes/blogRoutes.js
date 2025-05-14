const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostBySlug,
  getFeaturedBlogPosts,
  getBlogPostsByCategory,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');

// @route   GET /api/blog
router.get('/', getBlogPosts);

// @route   GET /api/blog/featured
router.get('/featured', getFeaturedBlogPosts);

// @route   GET /api/blog/category/:category
router.get('/category/:category', getBlogPostsByCategory);

// @route   GET /api/blog/:slug
router.get('/:slug', getBlogPostBySlug);

// @route   POST /api/blog
router.post('/', createBlogPost);

// @route   PUT /api/blog/:id
router.put('/:id', updateBlogPost);

// @route   DELETE /api/blog/:id
router.delete('/:id', deleteBlogPost);

module.exports = router;
