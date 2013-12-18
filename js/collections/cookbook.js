var app = app || {};

app.Cookbook = Backbone.Collection.extend({
	model: app.Recipe,
	url: '/api/recipies'
});