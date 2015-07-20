var Post = require('../models/post.js').Post;
var db = require('../db.js');

module.exports.controller = function(app) {

//
	app.post('/makeRequest', function(req, res){
		var requested = req.body;
		requested.users_id = req.session.userid;
		Post.newRequest(requested, function (newpost){
			res.redirect('/request/:'+ newpost.id);
		});
	});

	//
	app.get('/request/:id', function(req, res){
		Post.getRequest(req.params.id, function(data){
		res.render('request', data[0]);
		});
	});

	// Get all active requests
	app.get('/requests', function(req, res){
		Post.getRequests(req.body, function (data){
		res.render('requests', data);
		});
	});
};