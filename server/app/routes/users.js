'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
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
*  NEED ROUTES TO CREATE AND DELETE USERS
*
*/


// Get user profile w/ followers
// Use this to get their posts as well
router.get('/:id', function(req, res) {
  res.json(req.requestedUser);
})

// Get user followers
router.get('/:id/followers', function(req, res) {
  User.find({ follows: req.requestedUser._id })
    .then(function(users) {
      res.json(users)
    })
})

// get user feed
router.get('/:id/feed', function(req, res) {
  User.findById(req.params.id)
    .populate('follows')
    .then(function(user) {
      var friendPosts = _.pluck(user.follows, 'posts')
      friendPosts = _.chain(friendPosts)
                      .flatten()
                      .sortBy('date')
                      .reverse();
      res.json(friendPosts);
    })
})

/*
 * NEED ROUTES TO CREATE AND DELETE POSTS
 *
*/

// Add a follower
router.put('/:id/follow/:followedUser', function(req, res) {
  var followIdx = req.requestedUser.follows.indexOf(req.params.followedUser)
  if (followIdx > -1) {
    return res.sendStatus(409)
  }
  req.requestedUser.follows.push(req.params.followedUser);
  return req.requestedUser.save()
    .then(function(user) {
      res.json(user);
    })
})

// Remove a follower
router.put('/:id/unfollow/:followedUser', function(req, res) {
  var followerIdx = req.requestedUser.follows.indexOf(req.params.followedUser)
  console.log(req.requestedUser.follows)
  console.log('follwed user:', req.params.followedUser);
  console.log(followerIdx)
  if (followerIdx === -1) {
    return res.json(404)
  } else {
    req.requestedUser.follows.splice(followerIdx, 1)
    return req.requestedUser.save()
      .then(function(user) {
        res.sendStatus(204)
      })
  }
})

// Edit user
router.put('/:id', function(req, res) {
  delete req.body.password
  _.extend(req.requestedUser, req.body);
  return req.requestedUser.save() 
    .then(function(user) {
      res.status(204).json(user)
    })
})






module.exports = router;