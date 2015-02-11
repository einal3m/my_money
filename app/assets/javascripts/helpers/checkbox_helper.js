Handlebars.registerHelper('checkBox', function(id, checked) {
	html = '<input type="checkbox" id="' + id  + '"';
	if (checked) {
		html += ' checked';
	}
	html += '>';
	return new Handlebars.SafeString(html);
});