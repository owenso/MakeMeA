var db = require('../db.js');

module.exports.User = {
	newUser: function(body, callback){
		db.create('users', body, function(user){
		});
	}
};