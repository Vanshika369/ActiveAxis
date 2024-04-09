const Community = require('../models/communityModel');

// Controller functions for CRUD operations
const createCommunity = async (req, res) => {
  try {
    const community = new Community(req.body);
    await community.save();
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    res.json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCommunityById = async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    res.json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCommunityById = async (req, res) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    res.json({ message: 'Community deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunityById,
  deleteCommunityById
};