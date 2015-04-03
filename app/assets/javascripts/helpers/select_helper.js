var selectInput = function(array, model_id, id, hasUnassigned) {
	html = '<select class="form-control" id="' + id + '" name="' + id + '">';
	html += selectContent(array, model_id, hasUnassigned);

	html += '</select>';
	return new Handlebars.SafeString(html);
};

var addUnassignedOrPleaseSelect = function(model_id, hasUnassigned) {
	html = "";
	if (hasUnassigned) {
		html += '<option value=""';
		if ((model_id == null) || (model_id == "")) {
			html += ' selected';
		}
		html += '>Un-assigned</option>';

	} else if ((model_id == null) || (model_id == "")) {
		html += '<option value="" disabled selected>Please select...</option>';
	}
	return html;
};

var selectContent = function(array, model_id, hasUnassigned) {
	var html = addUnassignedOrPleaseSelect(model_id, hasUnassigned);

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
};

var selectGroupedContent = function(group, group_by, collection, model_id, id, hasUnassigned) {
	html = '<select class="form-control" id="' + id + '" name="' + id + '">';
	html += addUnassignedOrPleaseSelect(model_id, hasUnassigned);
	// if (!model_id) {
	// 	html += '<option value="" disabled selected>Please select...</option>';
	// }

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
};

Handlebars.registerHelper('selectInput', function(array, model_id, id) {
	return selectInput(array, model_id, id, false);
});
Handlebars.registerHelper('selectInputWithUnassigned', function(array, model_id, id) {
	return selectInput(array, model_id, id, true);
});

Handlebars.registerHelper('selectGroupedInputWithUnassigned', function(group, group_by, collection, model_id, id) {
	return selectGroupedContent(group, group_by, collection, model_id, id, true);
});

Handlebars.registerHelper('selectGroupedInput', function(group, group_by, collection, model_id, id) {
	return selectGroupedContent(group, group_by, collection, model_id, id, false);
});
