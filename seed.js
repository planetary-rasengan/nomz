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
            username: 'ian',
            following: [2, 3],
            userImage: 'https://media.licdn.com/media/AAEAAQAAAAAAAAI3AAAAJDYxODhlZTM3LTYxMWQtNDNlOS05MzUxLTg2Y2JiYTQxYWYyZA.jpg',
            posts: [

                {
                    imageUrl:  'http://www.nutritionistinthekitch.com/wp-content/uploads/2012/11/IMGP5330.jpg',
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
            username: 'andy',
            following: [1],
            userImage: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAANPAAAAJDk4NzI1NDAzLWQ0N2MtNDA4YS1hMGEwLWMwOThhMWY2NTNjZA.jpg',
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
            username: 'peter',
            userImage: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAASTAAAAJDk1NTAwNGQ3LTQ2YzYtNGJjMy1hNzA0LTVlNzhhZTFlMzIyOQ.jpg',
            following: [1],
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
