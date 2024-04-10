const Challenge = require('../models/challengeModel');

// Create a new challenge
const createChallenge = async (req, res) => {
  try {
    const newChallenge = new Challenge({
      challengeName: req.body.challengeName,
      description: req.body.description,
      duration: req.body.duration,
      difficulty: req.body.difficulty,
      rules: req.body.rules,
      rewards: req.body.rewards,
      createdBy: req.user._id, // Assuming you have user authentication middleware
      challengeBanner: req.body.challengeBanner,
      endDate: req.body.endDate,
    });
    await newChallenge.save();
    res.status(201).json({ message: 'Challenge created successfully', challenge: newChallenge });
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ message: 'Failed to create challenge', error: error.message });
  }
};

// Get all challenges
const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().populate('createdBy', 'username'); // Populate createdBy with username
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update challenge status for a participant
const updateChallengeStatus = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Update status for the participant
    const participant = challenge.participants.find(participant => participant.user.toString() === req.user._id.toString());
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    participant.accepted = req.body.accepted || participant.accepted;
    participant.completed = req.body.completed || participant.completed;

    await challenge.save();
    res.json({ message: 'Challenge status updated successfully', challenge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChallenge,
  getAllChallenges,
  updateChallengeStatus,
};
