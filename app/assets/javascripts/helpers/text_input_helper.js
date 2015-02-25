Handlebars.registerHelper('textInput', function(value, id) {
	var valueText = "";
	if (value) {
		valueText = ' value="' + value + '"';
	}
	html = '<input class="form-control" id="' + id  + '"' + valueText + '">';
	return new Handlebars.SafeString(html);
});