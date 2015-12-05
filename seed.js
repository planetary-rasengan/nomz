/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/
require('dotenv').load();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));

var seedUsers = function () {

    var users = [
        {
            _id: '1',
            email: 'ian@ian.com',
            password: 'ian',
            follows: [],
            posts: [

                {
                    imageUrl:  'https://www.hamptoncreek.com/img/p-just-cookies/panel-cookie-choc-cookie.png',
                    date: new Date(2014, 1, 2),
                    caption: 'here is a caption for ians post', 
                    menuItem: '119285'
                },

                {
                    imageUrl:  'http://s3-media1.fl.yelpcdn.com/bphoto/6veXte2d1fI2QxFOpwLN8Q/168s.jpg',
                    date: new Date(2012, 2, 3),
                    caption: 'here is a caption for ians second post', 
                    menuItem: '119290'
                }


            ],

        },

        {
            _id: '2',
            email: 'andy@andy.com',
            password: 'andy',
            follows: [],
            posts: [
                {
                    imageUrl:  'http://si.wsj.net/public/resources/images/NY-BY632_LUNCHB_P_20121016170840.jpg',
                    date: new Date(2013, 1, 2),
                    caption: 'here is a caption for andys post', 
                    menuItem: '119281'
                },

                {
                    imageUrl:  'http://si.wsj.net/public/resources/images/NY-BY632_LUNCHB_P_20121016170840.jpg',
                    date: new Date(2014, 4, 2),
                    caption: 'here is a caption for andys second post', 
                    menuItem: '24968814'
                },
            ],

        },

        {
            _id: '3',
            email: 'peter@peter.com',
            password: 'peter',
            follows: [],
            posts: [
                {
                    imageUrl:  'http://s3-media4.fl.yelpcdn.com/bphoto/ptpOBDdI95DxnbAcgig2WA/348s.jpg',
                    date: new Date(2012, 1, 6),
                    caption: 'here is a caption for peters post', 
                    menuItem: '12290605'
                },

                {
                    imageUrl:  'http://s3-media2.fl.yelpcdn.com/bphoto/7oJFEUlICAy3Vur-aCF94Q/348s.jpg',
                    date: new Date(2015, 7, 2),
                    caption: 'here is a caption for peters second post', 
                    menuItem: '24968808'
                }

            ],

        },


    ]

    return User.createAsync(users);

};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
