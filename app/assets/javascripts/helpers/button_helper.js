
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
	buttonText = '<i class="fa fa-floppy-o"></i> ' + buttonText; 
	return buttonHTML(buttonText, "save", "btn-primary");
});

Handlebars.registerHelper('editButton', function(options) {
	buttonText = options.hash['text'] || 'Edit';
	buttonText = '<i class="fa fa-edit"></i> ' + buttonText; 
	return buttonHTML(buttonText, "edit", "btn-default");
});

Handlebars.registerHelper('cancelButton', function(options) {
	buttonText = options.hash['text'] || 'Cancel';
	return buttonHTML(buttonText, "cancel", "btn-default");
});

Handlebars.registerHelper('newButton', function(options) {
	buttonText = options.hash['text'] || 'New';
	buttonText = '<i class="fa fa-plus"></i> ' + buttonText;
	return buttonHTML(buttonText, "new", "btn-default");
});

Handlebars.registerHelper('showButton', function(options) {
	return buttonHTML('...', "show", "btn-xs btn-default");
});

Handlebars.registerHelper('goBackButton', function(options) {
	buttonText = options.hash['text'] || 'Go Back';
	buttonText = '<i class="fa fa-angle-double-left fa-lg"></i> ' + buttonText; 
	return buttonHTML(buttonText, "go_back", "btn-default");
});

Handlebars.registerHelper('actionButton', function(options) {
	buttonText = options.hash['text'] || 'Action';
	buttonId = options.hash['id'] || 'action'
	if (options.hash['icon']) {
		buttonText = '<i class="fa ' + options.hash['icon'] + '"></i> ' + buttonText; 
	}
	return buttonHTML(buttonText, buttonId, "btn-default");
});

