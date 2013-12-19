var app = app || {};

app.Recipe = Backbone.Model.extend({
	defaults: {
		//coverImage: 'img/placeholder.png',
		title: 'No title',		
		keywords: 'None',
		cookingTime: '',
		author: 'Unknown',
		submittedOn: 'Unknown'
	},

	parse: function(response) {
		response.id = response._id;
		return response;
	}
});