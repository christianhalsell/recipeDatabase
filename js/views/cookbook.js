var app = app || {};

app.CookbookView = Backbone.View.extend({
	el: '#recipies',

	initialize: function() {
		this.collection = new app.Cookbook();
		this.collection.fetch({reset: true});
		this.render();

		this.listenTo(this.collection, 'add', this.renderRecipe);
		this.listenTo(this.collection, 'reset', this.render);
	},

	// render cookbook by rendering each recipe in its collection
	render: function() {
		this.collection.each(function(item) {
			this.renderRecipe(item);
		}, this);
	},

	// render a recipe by creating a RecipeView and appending the element it renders to the cookbook's element
	renderRecipe: function(item) {
		var recipeView = new app.RecipeView({
			model: item
		});
		
		$('#content').append(recipeView.render().el);
	},

	events: {
		'click #add' : 'addRecipe'
	},

	addRecipe: function(e) {
		e.preventDefault();

		var formData = {};

		$('#addRecipe div').children('input').each(function(i, el) {
			if($(el).val() != '') {
				if(el.id === 'keywords') {
 					formData[el.id] = [];
					_.each($(el).val().split(' '), function (keyword) {
						formData[el.id].push({'keyword': keyword});
					});
				} else if (el.id === 'submittedOn') {
					formData[el.id] = $('#submittedOn').datepicker('getDate').getTime();
				} else {
					formData[el.id] = $(el).val();
				}
			}

			// Clear input field value
			$(el).val('');
		});

		this.collection.create(formData);
	}
});

