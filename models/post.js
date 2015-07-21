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
	deleteRequest: function(id, callback){
		db.delete('requests', id, function(deleted){
			callback(deleted);
		});
	},
	upVote:function(id, callback){
		db.updateOne('files', 'votes', ('votes + 1'), id, function(upvoted){
			callback(upvoted);
		});
	},
	downVote:function(id, callback){
		db.updateOne('files', 'votes', ('votes - 1'), id, function(downvoted){
			callback(downvoted);
		});
	},




};