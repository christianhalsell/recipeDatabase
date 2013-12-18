var app = app || {};

$(function() {
	$('#releaseDate').datepicker();
	new app.CookbookView();
});