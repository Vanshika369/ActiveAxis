const express = require('express');
const router = express.Router();
const communityRoutes = require('../routes/communityRoutes');
const userRoutes = require('../routes/userRoutes');
const challengeRoutes = require('../routes/challengeRoutes'); // Add this line to import challenge routes
const leaderboardRoutes=require('../routes/leaderboardRoutes');

router.get('/', (req, res) => {
    res.status(200).send('Welcome to Health App backend');
});

router.use('/community', communityRoutes);
router.use('/users', userRoutes);
router.use('/challenges', challengeRoutes); // Use the challenge routes for /challenges endpoint
router.use('/leaderboard',leaderboardRoutes);

module.exports = router;
