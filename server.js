// Module dependencies

var application_root = __dirname,
	express = require('express'), // Web framework
	path = require('path'), // Utilities for dealing with file paths
	mongoose = require('mongoose'); // MongoDB

// Create server
var app = express();

// Configure server
app.configure(function() {
	// Parses request body and populates request.body
	app.use(express.bodyParser());

	// Checks request.body for HTTP method overrides
	app.use(express.methodOverride());

	// Perform route lookup based on url and HTTP method
	app.use(app.router);

	// Where to serve static content
	app.use(express.static(path.join(application_root, '')));

	// Show all errors in development
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));

});

// Start server
var port = 4000;
app.listen(port, function() {
	console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

// Routes
app.get('/api', function(request, response) {
	response.send('Library API is running');
});

// Connect to database
mongoose.connect('mongodb://localhost/library_database');

// Schemas
var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date
});

// Models
var BookModel = mongoose.model('Book', Book);

// Get a list of all books
app.get('/api/books', function(request, response) {
	return BookModel.find(function(err,books) {
		if(!err) {
			return response.send(books);
		} else {
			return console.log(err);
		}
	});
});

// Insert a new book
app.post('/api/books', function(request, response) {
	var book = new BookModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate
	});

	book.save(function(err) {
		if(!err) {
			return console.log('created');
		} else {
			return console.log(err);
		}
	});

	return response.send(book);
});

// Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
	return BookModel.findById( request.params.id, function( err, book ) {
		if( !err ) {
			return response.send( book );
		} else {
			return console.log( err );
		}
	});
});

// Update a book
app.put('/api/books/:id', function(request, response) {
	console.log('Updating book ' + request.body.title);
	return BookModel.findById(request.params.id, function(err, book) {
		book.title = request.body.title;
		book.author = request.body.author;
		book.releaseDate = request.body.releaseDate;

		return book.save(function(err) {
			if(!err) {
				console.log('book updated');
			} else {
				console.log(err);
			}

			return response.send(book);
		});
	});
});