var express = require('express');
var handlebars = require('express-handlebars');	

var app = express();

app.engine('handlebars', handlebars({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	res.render('about')
});

app.use(function(req, res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 NOT FOUND');
});

app.use(function(err, req, res, next) {
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 SERVER ERROR');
});

app.listen(app.get('port'), function() {
	console.log('Server running');
});