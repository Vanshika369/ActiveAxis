const communityRoutes = require('../routes/communityRoutes')
const userRoutes = require('../routes/userRoutes');

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Welcome to Health App backend');
});

router.use('/community', communityRoutes)
router.use('/users', userRoutes);

module.exports = router