var iconHTML = function(text, iconClass) {
	return new Handlebars.SafeString(
		'<i class="fa ' + iconClass + '">' + text + '</i>'
	);
};

Handlebars.registerHelper('editIcon', function(options) {
	iconText = options.hash['text'] || '';
	return iconHTML(iconText, "fa-edit");
});

Handlebars.registerHelper('showIcon', function(options) {
	iconText = options.hash['text'] || '';
	return iconHTML(iconText, "fa-hand-o-right fa-lg");
});

Handlebars.registerHelper('tickOrCross', function(value) {
	var icon = "fa-check";
	if (!value) { icon = "fa-times"; }
	return iconHTML('', icon);
});
