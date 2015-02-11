Handlebars.registerHelper('descriptionFormatter', function(memo, notes) {
	if (memo && notes) {
		return memo + "/" + notes;
	}

	if (!memo) {
		return notes;
	}

	if (!notes) {
		return memo;
	}

	return "";
});