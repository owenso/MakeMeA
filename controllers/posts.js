var Post = require('../models/post.js').Post;
var User = require('../models/user.js').User;
var File = require('../models/File.js').File;
var db = require('../db.js');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');

module.exports.controller = function(app) {

//
	app.post('/makeRequest', function(req, res){
		var requested = req.body;
		requested.users_id = req.session.userid;
		User.subCount(req.session.userid, function(incrementer){
		});
		Post.newRequest(requested, function (newpost){
			res.redirect('/request/'+ newpost.id);
		});
	});

	//
	app.get('/request/:id', function(req, res){
		File.getFiles(req.params.id, function(files){
		Post.getRequest(req.params.id, function(data){
			res.render('request', {
				list:files,
				info:data[0],
				helpers: {
					loggedin : function() {
						  if (req.session.userid){
						  	var name = req.session.firstname;
						  	var good = '<a href="/profile/"><h2>Hi, ' + name + '</h2><a href="/logout"><h2>Sign-Out</h2></a>';
						  	return  good;
						  }
						  else{
						  	var bad = '<a href="/newUser"><h2>Sign-Up</h2></a><a href="/login"><h2>Sign-In</h2></a>';
						  	return  bad;
						  }
					},
					filekind: function(filetype, url){
						if (filetype.search('audio')!== -1){
									return new Handlebars.SafeString('<audio controls><source src="'+ url +'" type="'+ filetype +'">Your browser does not support the audio element.</audio><br>');
						}
						else if (filetype.search('video')!== -1){
									return new Handlebars.SafeString('<video controls><source src="'+ url +'" type="'+ filetype +'">Your browser does not support the audio element.</video><br>');
						}
						else if (filetype.search('image')!== -1){
								return new Handlebars.SafeString('<img src="'+ url +'" type="'+ filetype +'"></img>');
						}
					},
					delete:function(id){
						if(id == req.session.userid){
							return new Handlebars.SafeString('<form action="/deleteRequest/' + req.params.id + '" method="POST"><input type="hidden" name="_method" value="Delete"><input type="submit" value="DELETE"></form>');
						}
					},
					deleteFile:function(userid, fileid){
						if(userid == req.session.userid){
							return new Handlebars.SafeString('<form action="/deleteFile/' + req.params.id  + '/' + fileid + '" method="POST"><input type="hidden" name="_method" value="Delete"><input type="submit" value="DELETE"></form>');
						}
					},
				},
			});
		});
		});
	});

	// Get all active requests
	app.get('/requests', function(req, res){
		Post.getRequests(req.body, function (data){
		res.render('requests', {
		info:data,
		helpers: {
			loggedin : function() {
				  if (req.session.userid){
				  	var name = req.session.firstname;
				  	var good = '<a href="/profile/"><h2>Hi, ' + name + '</h2><a href="/logout"><h2>Sign-Out</h2></a>';
				  	return  good;
				  }
				  else{
				  	var bad = '<a href="/newUser"><h2>Sign-Up</h2></a><a href="/login"><h2>Sign-In</h2></a>';
				  	return  bad;
				  }
			},
		},
});
		});
	});

	app.get('/newRequest', function (req, res){
	res.render('makeRequest', {
		helpers: {
			loggedin : function() {
				  if (req.session.userid){
				  	var name = req.session.firstname;
				  	var good = '<a href="/profile/"><h2>Hi, ' + name + '</h2><a href="/logout"><h2>Sign-Out</h2></a>';
				  	return  good;
				  }
				  else{
				  	var bad = '<a href="/newUser"><h2>Sign-Up</h2></a><a href="/login"><h2>Sign-In</h2></a>';
				  	return  bad;
				  }
			},
		},
});
});
		app.delete('/deleteRequest/:id', function(req, res){
			Post.deleteRequest(req.params.id, function(callback){
			});
			res.redirect('/');
	});
	app.get('/upvotereq/:make/', function(req, res){
		Post.upVote(req.params.make, function(upvoted){
			console.log('upvoted');
			res.redirect('/requests/');
		});
	});
	app.get('/downvotereq/:make', function(req, res){
		Post.downVote(req.params.make, function(downvoted){
			console.log('downvoted');
			res.redirect('/requests/');
		});
	});
};