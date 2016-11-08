var express = require('express');

var app = express();

var handlebars = require('express-handlebars')
				.create({ defaultLayout: 'main' });
	app.engine('handlebars', handlebars.engine);
	app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// Static content
app.use(express.static(__dirname + '/public'));

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

// Demonstration of dynamic content
app.get('/about', function(req, res) {
	var randomFortune = 
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {fortune: randomFortune});
});

// Dynamic test features
var fortunes = [
	"Победи свои страхи, или они победят тебя.",
	"Рекам нужны истоки.",
	"Не бойся неведомого.",
	"Тебя ждет приятный сюрприз.",
	"Будь проще везде, где только можно.",
];

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
	console.log('Express runing on http://localhost:' 
		+ app.get('port') + '; press Ctrl+C for quit...')
});
