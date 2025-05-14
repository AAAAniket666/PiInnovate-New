const asyncHandler = require('express-async-handler');
const BlogPost = require('../models/BlogPost');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = asyncHandler(async (req, res) => {
  // Add pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  
  // Filter for published posts only if not admin
  const filter = { published: true };
  
  const count = await BlogPost.countDocuments(filter);
  
  const posts = await BlogPost.find(filter)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  
  res.status(200).json({
    posts,
    page,
    pages: Math.ceil(count / pageSize),
    totalPosts: count
  });
});

// @desc    Get blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
const getBlogPostBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ 
    slug: req.params.slug,
    published: true 
  });

  if (!post) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Increment view count
  post.viewCount += 1;
  await post.save();

  res.status(200).json(post);
});

// @desc    Get featured blog posts
// @route   GET /api/blog/featured
// @access  Public
const getFeaturedBlogPosts = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find({ published: true })
    .sort({ viewCount: -1, createdAt: -1 })
    .limit(3);
  
  res.status(200).json(posts);
});

// @desc    Get blog posts by category
// @route   GET /api/blog/category/:category
// @access  Public
const getBlogPostsByCategory = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  
  const category = req.params.category;
  
  const filter = { 
    categories: { $in: [category] },
    published: true
  };
  
  const count = await BlogPost.countDocuments(filter);
  
  const posts = await BlogPost.find(filter)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  
  res.status(200).json({
    posts,
    page,
    pages: Math.ceil(count / pageSize),
    totalPosts: count
  });
});

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private/Admin
const createBlogPost = asyncHandler(async (req, res) => {
  const { 
    title, 
    slug, 
    author, 
    content, 
    excerpt, 
    featuredImage, 
    categories, 
    tags,
    published
  } = req.body;

  // Check if post with this slug already exists
  const postExists = await BlogPost.findOne({ slug });

  if (postExists) {
    res.status(400);
    throw new Error('Blog post with this slug already exists');
  }

  const blogPost = await BlogPost.create({
    title,
    slug,
    author,
    content,
    excerpt,
    featuredImage: featuredImage || '/images/default-blog.jpg',
    categories: categories || [],
    tags: tags || [],
    published: published !== undefined ? published : true
  });

  if (blogPost) {
    res.status(201).json(blogPost);
  } else {
    res.status(400);
    throw new Error('Invalid blog post data');
  }
});

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
const updateBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // If updating slug, check if the new slug already exists in another post
  if (req.body.slug && req.body.slug !== blogPost.slug) {
    const slugExists = await BlogPost.findOne({ 
      slug: req.body.slug,
      _id: { $ne: req.params.id }
    });

    if (slugExists) {
      res.status(400);
      throw new Error('Blog post with this slug already exists');
    }
  }

  const updatedBlogPost = await BlogPost.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedBlogPost);
});

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  await blogPost.deleteOne();
  
  res.status(200).json({ message: 'Blog post removed' });
});

module.exports = {
  getBlogPosts,
  getBlogPostBySlug,
  getFeaturedBlogPosts,
  getBlogPostsByCategory,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
