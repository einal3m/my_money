var selectInput = function(array, model_id, id) {
	html = '<select class="form-control" id="' + id + '" name="' + id + '">';
	html += selectContent(array, model_id);

	html += '</select>';
	return new Handlebars.SafeString(html);
};

var selectContent = function(array, model_id) {
	var html = "";
	if ((model_id == null) || (model_id == "")) {
		html += '<option value="" disabled selected>Please select...</option>';
	}
	if (array) {
		for (i = 0; i < array.length; i++) { 
			var model = array[i];
			html += '<option value="' + model.get('id') + '"';
			if (model_id && (model.get('id') == model_id)) {
				html += ' selected="selected"';
			}
			html += '>';
			html += model.get('name');
			html += '</option>'
		}
	}
	return html;
}

Handlebars.registerHelper('selectInput', function(array, model_id, id) {
	return selectInput(array, model_id, id);
});

Handlebars.registerHelper('selectGroupedInput', function(group, group_by, collection, model_id, id) {

	html = '<select class="form-control" id="' + id + '" name="' + id + '">';
	if (!model_id) {
		html += '<option value="" disabled selected>Please select...</option>';
	}

	var group_result = _.groupBy(collection.models, function(model){ return model.get(group_by); });
	for (j = 0; j < group.models.length; j++) {
		html += '<optgroup label="' + group.models[j].get('name') + '">';
			var group_id = group.models[j].id
			var group_models = group_result[group_id];

			for (i = 0; i < group_models.length; i++) { 
				var model = group_models[i];
				html += '<option value="' + model.get('id') + '"';
				if (model_id && (model.get('id') == model_id)) {
					html += ' selected="selected"';
				}
				html += '>';
				html += model.get('name');
				html += '</option>'
			}
		html += '</optgroup>';
	}

	html += '</select>';
	return new Handlebars.SafeString(html);
});
