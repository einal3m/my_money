$.fn.datepicker.defaults.format = "dd-M-yyyy";
$.fn.datepicker.defaults.autoclose = true;


var formatDate = function(dateString) {

	if (!dateString) { return ''; }

	var m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	var d = new Date(dateString);
	var curr_date = d.getDate();
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	
	return (curr_date + "-" + m_names[curr_month] + "-" + curr_year);
};

var zeroPad = function(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
};

var backEndDateFormat = function(dateString) {
	var d = new Date(dateString);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();

	return (year + '-' + zeroPad(month) + '-' + zeroPad(day));
};

Handlebars.registerHelper('datePickerInput', function(dateString, id) {
	value = formatDate(dateString);

	html = '<input type="text" class="form-control" name="' + id +
				 '" id="' + id +
				 '" value="' + value +
				 '" data-provide="datepicker">';

	return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('dateFormatter', function(dateString) {
	return new Handlebars.SafeString(formatDate(dateString));
});