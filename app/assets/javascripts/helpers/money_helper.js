accounting.settings.currency.format = {
	pos : "%s%v",   // for positive values, eg. "$ 1.00" (required)
	neg : "%s(%v)", // for negative values, eg. "$ (1.00)" [optional]
	zero: "%s -- "  // for zero values, eg. "$  --" [optional]
};


var accountingFormat = function(value) {
	return accounting.formatMoney(value);
};

var moneyNumberFormat = function(value) {
	return accounting.formatNumber(value, 2, ',');
};

var centsToDollars = function(value) {
	return value/100.00;
};

var dollarsToCents = function(value) {
	if (!value) { return null; }
	return Math.round(accounting.unformat(value)*100);
};

Handlebars.registerHelper('accountingFormat', function(amount) {
	return accountingFormat(centsToDollars(amount))
});

Handlebars.registerHelper('moneyInput', function(amount, id) {
	value = moneyNumberFormat(centsToDollars(amount));

	html = '<div class="input-group-addon">$</div><input type="text" class="form-control" name="' + id +
				 '" id="' + id +
				 '" value="' + value +
				 '">';

	return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('moneyIn', function(amount) {
	if (amount >= 0) {
		return moneyNumberFormat(centsToDollars(amount));
	} else {
		return "";
	}
});

Handlebars.registerHelper('moneyOut', function(amount) {
	if (amount < 0) {
		return moneyNumberFormat(centsToDollars(-amount));
	} else {
		return "";
	}
});
