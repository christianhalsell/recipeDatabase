var app = app || {};

$(function() {
	$('#submittedOn').datepicker();
	new app.CookbookView();
});