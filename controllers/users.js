var User = require('../models/user.js').User;
var Post = require('../models/post.js').Post;
var db = require('../db.js');
var fs = require('fs');
var pg = require('pg');
var dbUrl = "pg://localhost/makemea_db";

module.exports.controller = function(app) {

    app.get('/newUser', function(req, res) {
        var avatarimgs = [];
        fs.readdirSync('./public/avatars').forEach(function(file) {
            if ((file.substr(-4) == '.jpg') || (file.substr(-4) == '.png')) {
                avatarimgs.push("avatars/" + file);
            }
        });
        data = {
            avatars: avatarimgs,
            helpers: {
                loggedin: function() {
                    if (req.session.userid) {
                        var name = req.session.firstname;
                        var id = req.session.userid;
                        var good = '<a href="/profile/' + id + '"><h2>Hi, ' + name + '!</h2><a href="/logout"><h2>Sign-Out</h2></a>';
                        return good;
                    } else {
                        var bad = '<a href="/newUser"><h2>Sign-Up</h2></a><a href="/login"><h2>Sign-In</h2></a>';
                        return bad;
                    }
                },
            },
        };
        res.render('usercreate', data);
    });

    app.post('/createUser', function(req, res) {
        var userinfo = req.body;
        if (req.files.avatar) {
            userinfo.avatar_url = req.files.avatar.file;
        }
        User.newUser(userinfo, function(user) {
            req.session.userid = user.id;
            req.session.firstname = user.firstname;
            res.redirect('/');
        });
    });

    app.get('/login', function(req, res) {

        var data = {
            helpers: {
                loggedin: function() {
                    if (req.session.userid) {
                        var name = req.session.firstname;
                        var id = req.session.userid;
                        var good = '<a href="/profile/' + id + '"><h2>Hi, ' + name + '!</h2><a href="/logout"><h2>Sign-Out</h2></a>';
                        return good;
                    } else {
                        var bad = '<a href="/newUser"><h2>Sign-Up</h2></a><a href="/login"><h2>Sign-In</h2></a>';
                        return bad;
                    }
                },
            },
        };
        res.render('userlogin', data);
    });

    app.post('/login', function(req, res) {
        User.userLogin(req.body, function(user) {
            //Adding information to cookie here
            req.session.userid = user.id;
            req.session.firstname = user.firstname;
            res.redirect('/');
        });
    });

    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            console.log("User Logged Out");
        });
        res.redirect('/');
    });

    app.get('/profile/:id', function(req, res) {
        Post.getUsersRequests(req.params.id, function(submitted) {
            User.userProfile(req.params.id, function(user) {
                var data = {
                    thisuser: user[0],
                    subs: submitted,
                    helpers: {
                        loggedin: function() {
                            if (req.session.userid) {
                                var name = req.session.firstname;
                                var id = req.session.userid;
                                var good = '<a href="/profile/' + id + '"><h2>Hi, ' + name + '!</h2><a href="/logout"><h2>Sign-Out</h2></a>';
                                return good;
                            } else {
                                var bad = '<a href="/newUser"><h2>Sign-Up</h2></a><a href="/login"><h2>Sign-In</h2></a>';
                                return bad;
                            }
                        },
                    },
                };
                res.render('profile', data);
            });
        });
    });


};
