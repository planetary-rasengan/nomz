'use strict';
var router = require('express').Router();
var _ = require('lodash');
var fsHelper = require('./foursquare-helper.js')

module.exports = router;


var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/near', ensureAuthenticated, function (req, res) {
  var ll = req.query.lat+","+req.query.long;
  var params = {
    'll': ll,
    'categoryId': '4d4b7105d754a06374d81259',
    'radius': 1000
   };
   fsHelper.venues(params)
   .then(function(venues) {
     res.json(venues.map(function(v) {
       return _.pick(v, 'id', 'name', 'location', 'categories', 'attributes', 'stats', 'details');
     }))
   })
   .catch(function(err) { res.sendStatus(404); })
});

router.get('/:id', ensureAuthenticated, function(req, res) {
  fsHelper.venue({ venue_id: req.params.id })
  .then(function(venue) {
    res.json(_.pick(venue.response.venue,
      'id', 'name', 'contact', 'location', 'categories', 'url', 'ratings', 'hours', 'attributes', 'bestPhoto'));
  })
  .catch(function(err) { res.sendStatus(404); })
})

router.get('/full/:id', ensureAuthenticated, function(req, res) {
  fsHelper.venue({ venue_id: req.params.id })
  .then(function(venue) {
      res.json(venue.response)
    })
    .catch(function(err) { res.sendStatus(404); })
})
