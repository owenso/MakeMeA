var User = require('../models/user.js').Media;
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
	var userinfo=req.body;
	if(req.files){
		userinfo.avatar_url = req.files.file;
	}
	// User.newUser(userinfo);
	console.log(userinfo);
	res.redirect('/');
});

};