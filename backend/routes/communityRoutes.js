const express = require('express');
const router = express.Router();
const communityController = require('../controller/communityController');

router.post('/', communityController.createCommunity);
router.get('/', communityController.getAllCommunities);
router.get('/:id', communityController.getCommunityById);
router.put('/:id', communityController.updateCommunityById);
router.delete('/:id', communityController.deleteCommunityById);

module.exports = router;