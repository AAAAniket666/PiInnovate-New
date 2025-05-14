const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      unique: true,
      trim: true,
      lowercase: true
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Please add content']
    },
    excerpt: {
      type: String,
      required: [true, 'Please add an excerpt'],
      trim: true
    },
    featuredImage: {
      type: String,
      default: '/images/default-blog.jpg'
    },
    categories: {
      type: [String],
      default: []
    },
    tags: {
      type: [String],
      default: []
    },
    published: {
      type: Boolean,
      default: true
    },
    viewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BlogPost', BlogPostSchema);
