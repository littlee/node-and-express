var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.engine('handlebars', handlebars({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// serve pulic static resource
app.use(express.static(__dirname + '/public'));

// https://localhost:3000?test=1
app.use(function(req, res, next) {
	res.locals.showTest = app.get('env') !== 'production' && req.query.test = '1';
	next();
});

app.get('/', function(req, res) {
	res.render('home');
});

var fortunes = [
	'Conquer your fears or they will conquer you.',
	'Rivers need springs.',
	'Do not fear what you don\'t know.',
	'You will have a pleasant surprise.',
	'Whenever possible, keep it simple'
];
app.get('/about', function(req, res) {
	var vf = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {
		fortune: vf
	});
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