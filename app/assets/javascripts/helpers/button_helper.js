
var buttonHTML = function(text, id, moreClasses) {
	return new Handlebars.SafeString(
		'<button type="button" id="' + id + '" class="btn ' + moreClasses + '">' + text + '</button>'
	);
};

Handlebars.registerHelper('deleteButton', function(options) {
	buttonText = options.hash['text'] || 'Delete';
	return buttonHTML(buttonText, "delete", "btn-sm btn-danger");
});

Handlebars.registerHelper('saveButton', function(options) {
	buttonText = options.hash['text'] || 'Save';
	return buttonHTML(buttonText, "save", "btn-primary");
});

Handlebars.registerHelper('cancelButton', function(options) {
	buttonText = options.hash['text'] || 'Cancel';
	return buttonHTML(buttonText, "cancel", "btn-default");
});

Handlebars.registerHelper('newButton', function(options) {
	buttonText = options.hash['text'] || 'New';
	return buttonHTML(buttonText, "new", "btn-default");
});