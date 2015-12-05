'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var shortId = require('shortid');

var schema = new mongoose.Schema({
    _id: { // Foursquare Token
        type: String,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    salt: {
        type: String,
        select: false
    },
    follows: {
        type: [Number],
        ref: 'User'
    },
    posts: [{
        _id: {
            type: String,
            default: shortId.generate
        },
        imageUrl: {
          type: String
        },
        // author: { // Only if we're making this a separate collection...
        //   type: ObjectId,
        //   ref: 'User'
        // },
        date: {
          type: Date,
          default: Date.now
        },
        caption: {
          type: String
        },
        likes: {
          type: Number
        },
        menuItem: {
          type: String,
          ref: 'MenuItem'
        }
    }]
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

schema.methods.getFollows = function(id) {
    return this.model.find({ follows: id })
}


mongoose.model('User', schema);