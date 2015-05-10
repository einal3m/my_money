def visit_report(report_name)
  visit '#reports'
  click_on report_name
  wait_for_ajax
end
