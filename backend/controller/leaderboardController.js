const Leaderboard = require('../models/leaderboardModel');

// Get leaderboard entries
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().populate('user');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user's current score in the leaderboard
const updateScore = async (req, res) => {
  const { userId, score } = req.body;
  try {
    let leaderboardEntry = await Leaderboard.findOne({ user: userId });
    if (!leaderboardEntry) {
      leaderboardEntry = new Leaderboard({ user: userId });
    }
    leaderboardEntry.currentScore = score;
    await leaderboardEntry.save();
    res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeaderboard, updateScore };
