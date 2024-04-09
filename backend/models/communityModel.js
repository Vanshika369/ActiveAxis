const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  communityName: {
    type: String,
    required: true
  },
  communityLogo: {
    type: String, 
    required: true
  },
  numberOfPeople: {
    type: Number,
    default: 0 
  },
  people: {
    type: [String],
    default: [] 
  },
}, {
  timestamps: true 
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;