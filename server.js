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
	response.send('Cookbook API is running');
});

// Connect to database
mongoose.connect('mongodb://localhost/cookbook_database');

// Schemas
var Keywords = new mongoose.Schema({
	keyword: String
});

var Recipe = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date,
	keywords: [Keywords]
});

// Models
var RecipeModel = mongoose.model('Recipe', Recipe);

// Get a list of all recipies
app.get('/api/recipies', function(request, response) {
	return RecipeModel.find(function(err,recipies) {
		if(!err) {
			return response.send(recipies);
		} else {
			return console.log(err);
		}
	});
});

// Insert a new recipe
app.post('/api/recipies', function(request, response) {
	var recipe = new RecipeModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate,
		keywords: request.body.keywords
	});

	recipe.save(function(err) {
		if(!err) {
			return console.log('recipe created');
		} else {
			return console.log(err);
		}
	});

	return response.send(recipe);
});

// Get a single recipe by id
app.get( '/api/recipies/:id', function( request, response ) {
	return RecipeModel.findById( request.params.id, function( err, recipe ) {
		if( !err ) {
			return response.send( recipe );
		} else {
			return console.log( err );
		}
	});
});

// Update a recipe
app.put('/api/recipies/:id', function(request, response) {
	console.log('Updating recipe ' + request.body.title);
	return RecipeModel.findById(request.params.id, function(err, recipe) {
		recipe.title = request.body.title;
		recipe.author = request.body.author;
		recipe.releaseDate = request.body.releaseDate;
		recipe.keywords = request.body.keywords;

		return recipe.save(function(err) {
			if(!err) {
				console.log('recipe updated');
			} else {
				console.log(err);
			}

			return response.send(recipe);
		});
	});
});

// Delete a recipe
app.delete('/api/recipies/:id', function(request, response) {
	console.log('Deleting recipe with id: ' + request.params.id);
	return RecipeModel.findById(request.params.id, function(err, recipe) {
		return recipe.remove(function(err) {
			if(!err) {
				console.log('Recipe removed');
				return response.send('');
			} else {
				console.log(err);
			}
		});
	});
});