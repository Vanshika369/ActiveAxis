const Community = require('../models/communityModel');

const createCommunity = async (req, res) => {
  try {
    // Create a new community instance with the provided data
    const newCommunity = new Community({
      communityName: req.body.communityName,
      communityLogo: req.body.communityLogo,
      communityBanner: req.body.communityBanner,
      numberOfPeople: req.body.numberOfPeople || 0, // Default to 0 if not provided
      peopleNames: req.body.peopleNames || [], // Default to an empty array if not provided
      description: req.body.description,
      code: req.body.code,
      createdBy: req.body.createdBy,
      owner: req.body.owner,
      members: req.body.members || [], // Default to an empty array if not provided

    });

    // Save the new community to the database
    await newCommunity.save();

    // Send a success response
    res.status(201).json({ message: 'Community created successfully', community: newCommunity });
  } catch (error) {
    // Handle errors
    console.error('Error creating community:', error);
    res.status(500).json({ message: 'Failed to create community', error: error.message });
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

const addMemberToCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId } = req.body;

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    community.members.push(memberId);
    community.numberOfPeople += 1;
    await community.save();

    res.json({ message: 'Member added successfully', community });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCommunityOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerId } = req.body;

    const community = await Community.findByIdAndUpdate(id, { owner: ownerId }, { new: true });
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    res.json({ message: 'Community owner updated successfully', community });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunityById,
  deleteCommunityById,
  addMemberToCommunity,
  updateCommunityOwner,
};

