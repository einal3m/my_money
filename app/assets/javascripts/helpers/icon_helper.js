var iconHTML = function(text, iconClass) {
	return new Handlebars.SafeString(
		'<i class="fa ' + iconClass + '">' + text + '</i>'
	);
};

// var stackedIconHTML = function(iconBottomClass, iconTopClass) {

// 	return new Handlebars.SafeString(
// 		"<span class='fa-stack'>" +
//   		"<i class='fa " + iconBottomClass + " fa-stack'></i>" +
//   		"<i class='fa " + iconTopClass + " fa-stack'></i>" +
// 		"</span>"
// 	);
// };

Handlebars.registerHelper('editIcon', function(options) {
	iconText = options.hash['text'] || '';
	return iconHTML(iconText, "fa-edit");
});

Handlebars.registerHelper('showIcon', function(options) {
	iconText = options.hash['text'] || '';
	return iconHTML(iconText, "fa-hand-o-right fa-lg");
});
