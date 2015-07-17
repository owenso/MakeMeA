var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var db = require('./db.js');
var path = require('path');
var fs = require('fs');

app.listen(3000);

app.engine('handlebars', exphbs({defaultLayout: 'main', extname: 'handlebars'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use(logger('dev'));

app.use(methodOverride(function(req,res){
	if(req.body && typeof req.body === 'object' && '_method' in req.body){
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

fs.readdirSync('./controllers').forEach(function (file) {
 if(file.substr(-3) == '.js') {
     route = require('./controllers/' + file);
     route.controller(app);
 }
});


//Routes
app.get('/', function (req, res){
	res.render('home');
});