const communityRoutes = require('../routes/communityRoutes')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Welcome to Health App backend');
});

router.use('/community', communityRoutes)

module.exports = router