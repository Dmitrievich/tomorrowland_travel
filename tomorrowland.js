// Import express
var express = require('express');

// Import module
var fortune = require('./lib/fortune.js');

var app = express();

// Import handlebars
var handlebars = require('express-handlebars').create({ 
	defaultLayout: 'main' 
});
app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// Static content
app.use(express.static(__dirname + '/public'));

// set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test === '1';
		next();
});

// Routes
// Home page
app.get('/', function (req, res) {
	// res.type('text/plain');
	// res.send('Meadowlark Travel');
	res.render('home');
});

// About page
/*
app.get('/about', function (req, res) {
	// res.type('text/plain');
	// res.send('About Meadowlark Travel');
	res.render('about');
});
*/

// Demonstration of dynamic content and node module
app.get('/about', function(req, res) {
	res.render('about', {
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/test-about.js'
	});
});

// app.get('/about/contact', function (req, res) {
// 	res.type('text/plain');
// 	res.send('About Contact');
// });

// app.get('/about/direction', function (req, res) {
// 	res.type('text/plain');
// 	res.send('About Direction');
// });


// 400 page
app.use(function(req, res) {
	// res.type('text/plain');
	res.status(404);
	// res.send('404 - Page did not find.');
	res.render('404');
});

// 500 page
app.use(function(err, req, res, next) {
	console.error(err, stack);
	// res.type('text/plain');
	res.status(500);
	// res.send('500 - Server error.');
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express is running on "http://localhost:' 
		+ app.get('port') + '"; \nPress "Ctrl+C" for stop the server...')
});
