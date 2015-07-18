var User = require('../models/user.js').Media;
var db = require('../db.js');

module.exports.controller = function(app) {

app.get('/newUser', function(req, res){
	res.render('usercreate');
});

app.post('/createUser', function(req, res){
	console.log(req);
	res.redirect('/');
});

};