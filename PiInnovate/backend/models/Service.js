const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true
    },
    icon: {
      type: String,
      required: [true, 'Please add an icon class']
    },
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      unique: true,
      trim: true,
      lowercase: true
    },
    details: {
      type: String,
      required: [true, 'Please add service details']
    },
    image: {
      type: String,
      default: '/images/default-service.jpg'
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

module.exports = mongoose.model('Service', ServiceSchema);
