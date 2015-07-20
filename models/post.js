var db = require('../db.js');

module.exports.Post = {
	newRequest: function(body,callback){
		db.create('requests', body, function (newpost){
			callback(newpost);
		});
	},
	getRequests: function(body, callback){
		db.all('requests', function(allofem){
			callback(allofem);
		});
	},
	getRequest: function(id, callback){
		db.find('requests', 'id', id, function (found){
			callback(found);
		});
	},




};