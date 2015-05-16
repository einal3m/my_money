Handlebars.registerHelper('descriptionFormatter', function(memo, notes) {
	var html = "";

	if (memo && notes) {
		html = memo + "/" + notes;
	}

	if (!memo && notes) {
		html = notes;
	}

	if (memo && !notes) {
		html = memo;
	}

	if (html !== "") {
		return new Handlebars.SafeString(html + "<br>");
	}
});

Handlebars.registerHelper('categoryFormatter', function(category, subcategory) {
	
	var categoryString;
	
	if (category) {
		categoryString = category.get('name');
	}

	if (subcategory) {
		categoryString += "/" + subcategory.get('name');
	}

	if (categoryString) {
		return new Handlebars.SafeString("<em>" + categoryString + "</em>");
	}
});

Handlebars.registerHelper('reconciledFormatter', function(reconcilation_id) {
	if (reconcilation_id) {
		return 'R';
	}
});
