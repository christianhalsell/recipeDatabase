var app = app || {};

app.Recipe = Backbone.Model.extend({
	defaults: {
		coverImage: 'img/placeholder.png',
		title: 'No title',
		author: 'Unknown',
		submittedOn: 'Unknown',
		keywords: 'None'
	},

	parse: function(response) {
		response.id = response._id;
		return response;
	}
});