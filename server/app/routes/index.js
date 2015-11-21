'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./members'));
router.use('/game', require('./game.js'));
router.use('/venue', require('./venue.js'));
router.use('/feed', require('./feed.js'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
