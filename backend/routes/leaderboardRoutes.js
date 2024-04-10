const express = require('express');
const router = express.Router();
const leaderboardController = require('../controller/leaderboardController');

// Route for getting the leaderboard
router.get('/', leaderboardController.getLeaderboard);

// Route for updating user's score
router.put('/update', leaderboardController.updateScore);

module.exports = router;
