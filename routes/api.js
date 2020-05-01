const path = require('path');

const express = require('express');

const apiController = require('../controllers/api');

const router = express.Router();

router.get('/', apiController.apiIndex);

router.get('/players', apiController.getPlayers);



module.exports = router;
