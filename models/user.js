var db = require('../db.js');
var bcrypt = require('bcrypt');

module.exports.User = {
	newUser: function(body, callback){
		var user=body;
		bcrypt.hash(user.password, 10, function(err, hash) {
			user.password = hash;
			console.log(hash);
			db.create('users', user, function(newuser){
				console.log(newuser);
				callback(newuser);
			});
		});
	},
	userLogin: function(body, callback){
		db.find('users', 'username', body.username, function(user) {
			if (user[0]){
				var passWorked;
					bcrypt.compare(body.password, user[0].password, function(err, res) {
			    // res == true 
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
	}



};