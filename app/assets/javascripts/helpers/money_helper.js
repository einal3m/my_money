
var accountingFormat = function(value) {
	var amount = parseFloat(value);
	var negative = (amount < 0);
	amount = Math.abs(amount);

	var moneyString = '$' + amount.toFixed(2);
	if (negative) { 
		moneyString = "(" + moneyString + ")";
	}

	return moneyString
}

Handlebars.registerHelper('accountingFormat', accountingFormat);

