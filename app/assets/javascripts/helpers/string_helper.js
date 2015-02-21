Handlebars.registerHelper('descriptionFormatter', function(memo, notes) {
	var html = "";

	if (memo && notes) {
		html = memo + "/" + notes;
	}

	if (!memo) {
		html = notes;
	}

	if (!notes) {
		html = memo;
	}

	if (html != "") {
		return new Handlebars.SafeString(html + "<br>");
	}
});

Handlebars.registerHelper('categoryFormatter', function(category_id, subcategory_id) {
	var categoryString = category_id;
	if (subcategory_id) {
		categoryString += "/" + subcategory_id;
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
