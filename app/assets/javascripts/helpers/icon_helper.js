var iconHTML = function(text, iconClass, idText) {
	var html = '<i class="fa ' + iconClass + '"';
	if (idText) {
		html += ' id="' + idText + '"';
	}
	html += '>' + text + '</i>';
	return new Handlebars.SafeString(html);
};

Handlebars.registerHelper('editIcon', function(options) {
	iconText = options.hash.text || '';
	idText = options.hash.id || 'edit';
	return iconHTML(iconText, "fa-pencil-square-o", idText);
});

Handlebars.registerHelper('newIcon', function(options) {
	iconText = options.hash.text || '';
	idText = options.hash.id || 'new';
	return iconHTML(iconText, "fa-plus", idText);
});

Handlebars.registerHelper('deleteIcon', function(options) {
	iconText = options.hash.text || '';
	idText = options.hash.id || 'delete';
	return iconHTML(iconText, "fa-times", idText);
});

Handlebars.registerHelper('showIcon', function(options) {
	iconText = options.hash.text || '';
	return iconHTML(iconText, "fa-hand-o-right fa-lg");
});

Handlebars.registerHelper('tickOrCross', function(value) {
	var icon = "fa-check";
	if (!value) { icon = "fa-times"; }
	return iconHTML('', icon);
});
