var File = require('../models/File.js').File;
var db = require('../db.js');

module.exports.controller = function(app) {
	app.post('/reply/:id', function(req, res){
		if(req.session.users_id){
			req.body.users_id = req.session.users_id;
		}
		req.body.requests_id = req.params.id;
		req.body.url = req.files.url.file.replace("public", "");
		req.body.filetype = req.files.url.mimetype;
		File.newReply(req.body, req.params.id, function(newpost){
		});
	res.redirect('/request/' + req.params.id);
	});
	app.get('/upvote/:make/:id', function(req, res){
		File.upVote(req.params.id, function(upvoted){
			console.log('upvoted');
			res.redirect('/request/' + req.params.make);
		});
	});
	app.get('/downvote/:make/:id', function(req, res){
		File.downVote(req.params.id, function(downvoted){
			console.log('downvoted');
			res.redirect('/request/' + req.params.make);
		});
	});
	app.delete('/deleteFile/:make/:id', function(req, res){
		File.deleteFile(req.params.id, function(callback){
		});
		res.redirect('/request/' + req.params.make);
	});
};