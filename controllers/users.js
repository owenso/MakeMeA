var User = require('../models/user.js').User;
var db = require('../db.js');
var fs = require('fs');

module.exports.controller = function(app) {

app.get('/newUser', function(req, res){
	var avatarimgs = [];
	fs.readdirSync('./public/avatars').forEach(function (file) {
	 if((file.substr(-4) == '.jpg') || (file.substr(-4) == '.png') ){
	    avatarimgs.push("avatars/" + file);
	 }
	});
	data = {
		avatars:avatarimgs
	};
	res.render('usercreate', data);
});

app.post('/createUser', function(req, res){
	var userinfo = req.body;
	if(req.files.avatar){
		userinfo.avatar_url = req.files.avatar.file;
	}
	User.newUser(userinfo, function(user){
		req.session.userid = user.id;
		req.session.firstname = user.firstname;
		res.redirect('/');
	});
});

app.get('/login', function(req,res){
	res.render('userlogin');
});

app.post('/login', function(req,res){
	User.userLogin(req.body, function(user){
		//Adding information to cookie here
		req.session.userid= user.id;
		req.session.firstname= user.firstname;
		res.redirect('/');
	});
});

app.get('/logout', function(req, res){
		req.session.destroy(function(err) {
			console.log("User Logged Out");
		});
		res.redirect('/');
});

app.get('/profile/', function(req,res){
	User.userProfile(req.session.userid, function (user){
		res.render('profile', user[0]);
	});
});


};