'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var _ = require('lodash');

// Find requested user by id and store as req.requested user
router.param('id', function (req, res, next, id) {
  User.findById(id)
  .then(function (user) {
    console.log(id)
    if (!user) throw new Error(404);
    req.requestedUser = user;
    next();
  })
  .then(null, next);
});


/*
* TODO: 
* NEED ROUTES TO DELETE USERS
*
*/


router.get('/me', function(req, res) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(403);
  }
})

router.get('/:id', function(req, res, next) {
  // res.json(req.requestedUser);
  let followersPromise = req.requestedUser.getFollowers()
  let followingPromise = req.requestedUser.getFollowing()
  let populatedUser = req.requestedUser.populate('posts.menuItem')
  Promise.join(populatedUser, followersPromise, followingPromise, 
    function(user, followers, following) {
      user = user.toObject();
      user.followers = followers,
      user.following = following,
      res.json(user)
    }).then(null, next);

})

// Get a user's following
router.get('/:id/following', function(req, res, next) {
  req.requestedUser.getFollowing()
    .then( following => {
      res.json(following);
    })
})



// Get people the follow the user
router.get('/:id/followers', function(req, res, next) {
  req.requestedUser.getFollowers()
    .then( followers => {
      res.json(followers);
    })
    .then(null, next);
})

// get user feed
router.get('/:id/feed', function(req, res, next) {
  req.requestedUser.getFeed()
    .then( feed => { 
      res.json(feed);
    })
    .then(null, next);
})


// Add a follower
router.put('/:id/follow/:followedUser', function(req, res, next) {
  req.requestedUser.follow(req.params.followedUser)
    .then( user => {
      res.json(user)
    }).then(null, err => {
      if (err.statusCode && err.statusCode === 409) {
        res.sendStatus(err.statusCode)
      }
    }).then(null, next)

})

// Remove a follower
router.put('/:id/unfollow/:followedUser', function(req, res, next) {
  req.requestedUser.unfollow(req.params.followedUser)
    .then( user => {
      res.json(user)
    }).then(null, err => {
      if (err.statusCode && err.statusCode === 404) {
        res.sendStatus(err.statusCode)
      }
    }).then(null, next)
})

// Edit user
router.put('/:id', function(req, res, next) {
  delete req.body.password
  _.extend(req.requestedUser, req.body);
  return req.requestedUser.save() 
    .then(function(user) {
      res.status(204).json(user)
    }).then(null, next)
})






module.exports = router;