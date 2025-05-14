const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema(
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
    bio: {
      type: String,
      required: [true, 'Please add a bio'],
      trim: true
    },
    image: {
      type: String,
      default: '/images/default-avatar.jpg'
    },
    socialMedia: {
      linkedin: String,
      twitter: String,
      github: String,
      email: String
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

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
