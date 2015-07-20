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
		req.session.cookie.id = user.id;
		console.log(req.session.cookie.id);
	});
	res.redirect('/');
});

app.get('/login', function(req,res){
	res.render('userlogin');
});

app.post('/login', function(req,res){
	User.userLogin(req.body, function(user){
		req.session.cookie.id = user.id;
		console.log(req.session.cookie);
	});
	res.redirect('/');
});

app.delete('/logout', function(req, res){
	req.session.cookie.id = null;
});
};