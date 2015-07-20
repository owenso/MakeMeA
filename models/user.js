var db = require('../db.js');
var bcrypt = require('bcrypt');

module.exports.User = {
	newUser: function(body, callback){
		var user=body;
		user.submissions = 0;
		user.chosen = 0;
		bcrypt.hash(user.password, 10, function(err, hash) {
			user.password = hash;
			db.create('users', user, function(newuser){
				db.find('users', 'id', newuser.id, function(newguy){
				callback(newguy[0]);
					
				});
			});
		});
	},
	userLogin: function(body, callback){
		db.find('users', 'username', body.username, function(user) {
			if (user[0]){
				var passWorked;
					bcrypt.compare(body.password, user[0].password, function(err, res) {
			  	if (res){
			  		console.log("Password Correct");
						callback(user[0]);

			  	}
			  	else{
			  		console.log("Password Incorrect");
			  	}
				});
		  	}
			else{
				console.log("User not found");
			}
		});
	},
	userProfile: function(id, callback){
		console.log(id);
		db.find('users', 'id', id, function(user){
			callback(user);
		});
	}



};