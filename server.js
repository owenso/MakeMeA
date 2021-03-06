var express = require('express');
var app = express();
var logger = require('morgan');
// var bodyParser  = require('body-parser'); - removed because cant handle files in forms
var bb = require('express-busboy');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var db = require('./db.js');
var path = require('path');
var fs = require('fs');
var session = require('express-session');


app.listen(3000);

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: 'handlebars'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// app.use(bodyParser.urlencoded()); - see above, body-parser removed

bb.extend(app, {
    upload: true,
    path: 'public/uploads/'
});
app.use(express.static('public'));
app.use(logger('dev'));


app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(session({
    secret: 'imnotreallysurewhatthisdoeswaitithinkifigureditout',
    saveUninitialized: false,
    resave: false
}));

fs.readdirSync('./controllers').forEach(function(file) {
    if (file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(app);
    }
});


//Routes
app.get('/', function(req, res) {
    res.render('home', {
        helpers: {
            loggedin: function() {
                if (req.session.userid) {
                    var name = req.session.firstname;
                    var id = req.session.userid;
                    var good = '<a href="/profile/' + id + '"><h2>Hi, ' + name + '!</h2><a href="/logout"><h2>Sign-Out</h2></a>';
                    return good;
                } else {
                    var bad = '<a href="/newUser"><h2>Sign-Up</h2></a><a href="/login"><h2>Sign-In</h2></a>';
                    return bad;
                }
            },
        },
    });
});
