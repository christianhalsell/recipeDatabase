var app = app || {};

app.RecipeView = Backbone.View.extend({
	tagName: 'div',
	className: 'recipeContainer',
	template: _.template($('#recipeTemplate').html()),

	render: function() {
		//this.el is what we defined in tagName, use $el to get access to jQuery html() function
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	},

	events: {
		'click .delete' : 'deleteRecipe'
	},

	deleteRecipe: function() {
		// Delete model
		this.model.destroy();

		// Delete view
		this.remove();
	}
});