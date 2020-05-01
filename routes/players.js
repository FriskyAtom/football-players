const path = require('path');

const express = require('express');

const playerController = require('../controllers/players');

const router = express.Router();

router.get('/',playerController.getIndex);

router.get('/add', playerController.getAddPlayer);

router.post('/add', playerController.postAddPlayer);

router.get('/edit/:playerId', playerController.getEditPlayer);

router.post('/edit', playerController.postEditPlayer);


router.post('/delete', playerController.postDeletePlayer);

module.exports = router;