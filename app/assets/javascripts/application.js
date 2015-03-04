// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.turbolinks
//= require bootstrap
//= require d3
//= require underscore
//= require accountingjs
//= require bootstrap-datepicker
//= require handlebars.runtime
//= require backbone
//= require backbone_rails_sync
//= require backbone_datalink
//= require backbone-validation
//= require Cocktail
//= require my_money
//= require_tree ./templates
//= require_tree .

/* check if jQuery is loaded */
/*if (jQuery) {
alert('Jquery is loaded')
} else {
alert ('Jquery is not loaded')
}*/

function toggle(source) {
  checkboxes = document.getElementsByName("import_transactions[][import]");

  for (var i = 0; i < checkboxes.length; ++i) {
    checkboxes[i].checked = source.checked;
  }
}

// jQuery event handlers
$(document).ready(function() {

  // subcategory select needs to be updated when category is changed
  $("#transaction_category_id, #pattern_category_id, #report_category_id").change(function() {
  	$.post('/categories/subcategories_by_category', {category_id: $(this).val()}, null, "script");
  });
  
    // subcategory select needs to be updated when category is changed
  $(".category_select").change(function() {
  
    // set the class of the parent row to 'category_change'
    $(this).closest('tr').toggleClass('category_change');
  	$.post('/categories/subcategories_by_category', {category_id: $(this).val()}, null, "script");
  });
  
  // date range selection
  // when custom dates is selected, from and to date fields should be visible
  $("#date_range_option_id").change(function() {
    if ($("#date_range_option_id option:selected").text()=="Custom Dates")
      $("#custom_dates").show();
    else
      $("#custom_dates").hide();
  });

});

