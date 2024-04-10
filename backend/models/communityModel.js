const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  communityName: {
    type: String,
    required: true,
  },
  communityLogo: {
    type: String,
    required: true,
  },
  communityBanner: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    default: 0,
  },
  peopleNames: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],


}, {
  timestamps: true,
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;