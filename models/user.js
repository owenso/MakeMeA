// var db = require('../db.js');
var db = require(process.env.DATABASE_URL);

var bcrypt = require('bcrypt');
var pg = require('pg');
var dbUrl = "pg://localhost/makemea_db";

module.exports.User = {
    newUser: function(body, callback) {
        var user = body;
        bcrypt.hash(user.password, 10, function(err, hash) {
            user.password = hash;
            db.create('users', user, function(newuser) {
                db.find('users', 'id', newuser.id, function(newguy) {
                    callback(newguy[0]);

                });
            });
        });
    },
    userLogin: function(body, callback) {
        db.find('users', 'username', body.username, function(user) {
            if (user[0]) {
                var passWorked;
                bcrypt.compare(body.password, user[0].password, function(err, res) {
                    if (res) {
                        console.log("Password Correct");
                        callback(user[0]);

                    } else {
                        console.log("Password Incorrect");
                    }
                });
            } else {
                console.log("User not found");
            }
        });
    },
    userProfile: function(id, callback) {
        db.find('users', 'id', id, function(user) {
            callback(user);
        });
    },
    subCount: function(id, callback) {
        db.find('users', 'id', id, function(user) {
            db.updateOne('users', 'submissions', (user[0].submissions + 1), user[0].id, function(updated) {
                callback(updated);
            });
        });
    },
    getUsersById: function(cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT *  FROM users INNER JOIN requests ON users.id=requests.users_id;', function(err, result) {
                done();
                cb(result.rows);
            });
        });
        // this.end();
    },


};
