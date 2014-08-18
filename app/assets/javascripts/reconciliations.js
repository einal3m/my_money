// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).ready(function() {

  // when user clicks on the reconcile checkbox, update the balance field
	 $(".reconcile").change(function() {

	 	// are we adding or removing the amount
	 	var factor = $(this).prop('checked') ? 1 : -1;

	 	// find the transaction amount and strip $ sign
	    var amount = $(this).closest('tr').children('.money').text();
	    amount = amount.replace('$', '').replace(',', '');

	    // find current balance calculate new amount
	    var balance = $( "#balance" ).text().replace('$', '').replace(',', '');
	    balance = parseFloat(balance) + factor * parseFloat(amount)
	    balance = '$' + balance.toFixed(2)
	    $('#balance').text(balance.replace('$-', '-$'));
  });

  // when user selects an account, update previous reconciliation details
  	$("#reconciliation_account_id").change(function() {

  		$.post('/accounts/' + $(this).val() + '/last_reconciliation', null, "script");

  	});
  
});
