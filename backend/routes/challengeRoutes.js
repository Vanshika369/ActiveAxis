const express = require('express');
const router = express.Router();
const challengeController = require('../controller/challengeController');

// Create a new challenge
router.post('/', challengeController.createChallenge);

// Get all challenges
router.get('/', challengeController.getAllChallenges);

// Update challenge status for a participant
router.patch('/:id/participants/:userId', challengeController.updateChallengeStatus);

module.exports = router;
