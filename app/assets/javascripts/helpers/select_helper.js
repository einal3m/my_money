Handlebars.registerHelper('selectInput', function(collection, model) {

console.log('selectInputHelper');
console.log(collection);
console.log(model);

	html = '<select id="account_id" name="account_id">';

	for (i = 0; i < collection.length; i++) { 
		html += '<option value="' + collection[i].id + '"';
		if (collection[i].id == model.id) {
			html += ' selected="selected"';
		}
		html += '>';
		html += collection[i].name;
		html += '</option>'
	}

	html += '</select>';
	return new Handlebars.SafeString(html);
});
