var Media = require('../models/media.js').Media;
var db = require('../db.js');

module.exports.controller = function(app) {

app.post('/makeRequest', function(req, res){
	res.send('route working');
});

};