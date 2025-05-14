const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true
    },
    position: {
      type: String,
      required: [true, 'Please add a position'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Please add testimonial content'],
      trim: true
    },
    image: {
      type: String,
      default: '/images/default-avatar.jpg'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);
