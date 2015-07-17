var User = require('../models/user.js').Media;
var db = require('../db.js');

module.exports.controller = function(app) {

app.post('/makeUser', function(req, res){
	res.send('route working' + req.body);
});

};